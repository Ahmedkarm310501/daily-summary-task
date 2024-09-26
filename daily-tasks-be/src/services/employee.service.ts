import { AppDataSource } from "../data-source";
import { Employee } from "../entities/employee.entity";
import dayjs from "dayjs";
import { Task } from "../entities/task.entity";
import { Between } from "typeorm";

interface DailySummaryResponse {
  date: string;
  totalHours: number;
  remainingHours: number;
  tasks: Task[];
}

const MAX_HOURS_PER_DAY = 8;

export class EmployeeService {
  private employeeRepository = AppDataSource.getRepository(Employee);
  private taskRepository = AppDataSource.getRepository(Task);

  private calculateDuration(from: Date, to: Date): number {
    return dayjs(to).diff(dayjs(from), "hour");
  }

  async getDailySummary(employeeId: number): Promise<DailySummaryResponse> {
    const selectedDate = dayjs();
    const startOfDay = selectedDate.startOf("day").toDate();
    const endOfDay = selectedDate.endOf("day").toDate();

    // Fetch tasks for the given day and employee
    const tasks = await this.taskRepository.find({
      where: {
        employee: { id: employeeId },
        createdAt: Between(startOfDay, endOfDay),
      },
    });

    // Calculate total hours worked
    const totalHours = tasks.reduce(
      (acc, task) => acc + this.calculateDuration(task.from, task.to),
      0
    );

    // Calculate remaining hours
    const remainingHours = Math.max(0, MAX_HOURS_PER_DAY - totalHours);

    return {
      date: selectedDate.format("YYYY-MM-DD"),
      totalHours,
      remainingHours,
      tasks,
    };
  }

  async createEmployee(name: string): Promise<Employee> {
    const employee = this.employeeRepository.create({ name });
    return await this.employeeRepository.save(employee);
  }

  async getAllEmployees(): Promise<Employee[]> {
    return await this.employeeRepository.find({ relations: ["tasks"] });
  }
}
