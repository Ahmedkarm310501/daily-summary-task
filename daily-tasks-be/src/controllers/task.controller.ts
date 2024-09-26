import { Request, Response } from "express";
import { TaskService } from "../services/task.service";
import { UpdateTaskRequest } from "../utils/validation";
import asyncHandler from "../middlewares/async-handler.middleware";
import { ApiResponse } from "../shared/api/api.response";

const taskService = new TaskService();
const apiResponse = new ApiResponse();

export const createTask = asyncHandler(async (req: Request, res: Response) => {
  const task = await taskService.createTask(req.body);
  apiResponse.Created(res, task);
});

export const updateTask = asyncHandler(
  async (req: Request<any, UpdateTaskRequest>, res: Response) => {
    const { id } = req.params as { id: string };
    const task = await taskService.modifyTask(id, req.body);
    apiResponse.Ok(res, task);
  }
);

export const deleteTask = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  await taskService.deleteTask(id);
  apiResponse.NoContent(res);
});

export const getTasks = asyncHandler(async (req: Request, res: Response) => {
  const { employeeId } = req.query as { employeeId?: string };
  const tasks = await taskService.getTasksForEmployee(Number(employeeId));
  apiResponse.Ok(res, tasks);
});
