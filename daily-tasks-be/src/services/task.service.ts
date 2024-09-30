import { Between, FindOptionsWhere } from "typeorm";
import { AppDataSource } from "../data-source";
import { Task } from "../entities/task.entity";
import { CreateTaskRequest, UpdateTaskRequest } from "../utils/validation";
import { ApiResponse } from "../shared/api/api.response";
import { LogicalError, NotFoundError } from "../shared/api/api.error";
import dayjs, { Dayjs } from "dayjs";

import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(isBetween);
export class TaskService {
  private taskRepository = AppDataSource.getRepository(Task);

  private getDateFromTime(time: string): Dayjs {
    const [hours, minutes] = time.split(":");
    return dayjs().set("hour", Number(hours)).set("minute", Number(minutes));
  }

  private async getTotalHoursPerDay(
    employeeId: number,
    date: Date
  ): Promise<number> {
    const startOfDay = dayjs(date).startOf("day").toDate();
    const endOfDay = dayjs(date).endOf("day").toDate();

    const tasks = await this.taskRepository.find({
      where: {
        employee: { id: employeeId },
        from: Between(startOfDay, endOfDay),
      },
    });

    // Calculate the total hours for all tasks in that day
    let totalHours = 0;
    tasks.forEach((task) => {
      const fromTime = dayjs(task.from, "HH:mm");
      const toTime = dayjs(task.to, "HH:mm");
      const taskHours = toTime.diff(fromTime, "hour", true);
      totalHours += taskHours;
    });

    return totalHours;
  }

  private async checkIfTaskOverlaps(
    employeeId: number,
    from: Dayjs,
    to: Dayjs
  ): Promise<void> {
    const availableTasks = await this.taskRepository.find({
      where: {
        employee: { id: employeeId },
      },
    });
    const isInSameSlot = availableTasks.some((task) => {
      const taskStart = dayjs(task.from);
      const taskEnd = dayjs(task.to);

      // split this into four vars
      const startWithin = dayjs(from).isBetween(taskStart, taskEnd, null, "[)");
      const endWithin = dayjs(to).isBetween(taskStart, taskEnd, null, "(]");
      const startOf = dayjs(taskStart).isBetween(from, to, null, "[)");
      const endOf = dayjs(taskEnd).isBetween(from, to, null, "(]");

      // Check if the new task overlaps with the existing task
      return startWithin || endWithin || startOf || endOf;
    });

    if (isInSameSlot) {
      throw new LogicalError("The task overlaps with an existing task.");
    }
  }

  async createTask(createTaskRequest: CreateTaskRequest): Promise<Task> {
    const fromDate = this.getDateFromTime(createTaskRequest.from);
    const toDate = this.getDateFromTime(createTaskRequest.to);

    // Check if the new task overlaps with any existing task
    await this.checkIfTaskOverlaps(
      createTaskRequest.employeeId,
      fromDate,
      toDate
    );
    // Calculate the hours of the new task
    const newTaskHours = toDate.diff(fromDate, "hour", true);

    // Check if the new task exceeds 8 hours
    if (newTaskHours > 8) {
      throw new LogicalError("The task cannot exceed 8 hours.");
    }

    const totalHours = await this.getTotalHoursPerDay(
      createTaskRequest.employeeId,
      new Date()
    );

    // Check if the total hours (including the new task) exceed 8 hours
    if (totalHours + newTaskHours > 8) {
      throw new LogicalError(
        "The employee cannot have more than 8 hours of tasks per day."
      );
    }

    // Proceed with task creation if the validation passes
    const task = this.taskRepository.create({
      employee: { id: createTaskRequest.employeeId },
      description: createTaskRequest.description,
      from: fromDate.toISOString(),
      to: toDate.toISOString(),
    });

    return await this.taskRepository.save(task);
  }

  async getTasksForEmployee(employeeId?: number): Promise<Task[]> {
    const startOfDay = dayjs().startOf("day").toDate();
    const endOfDay = dayjs().endOf("day").toDate();

    const whereClause: FindOptionsWhere<Task> = {
      createdAt: Between(startOfDay, endOfDay),
    };

    if (employeeId) {
      whereClause.employee = { id: employeeId };
    }

    return await this.taskRepository.find({
      where: whereClause,
    });
  }
  async modifyTask(
    taskId: string,
    updateTaskRequest: UpdateTaskRequest
  ): Promise<Task> {
    const task = await this.taskRepository.findOneBy({
      id: Number(taskId),
    });
    if (!task) {
      throw new NotFoundError("Task not found");
    }
    task.description = updateTaskRequest.description
      ? updateTaskRequest.description
      : task.description;

    task.from = updateTaskRequest.from
      ? this.getDateFromTime(updateTaskRequest.from).toDate()
      : task.from;

    task.to = updateTaskRequest.to
      ? this.getDateFromTime(updateTaskRequest.to).toDate()
      : task.to;

    return await this.taskRepository.save(task);
  }

  async deleteTask(taskId: string): Promise<void> {
    await this.taskRepository.delete({ id: Number(taskId) });
  }
}
