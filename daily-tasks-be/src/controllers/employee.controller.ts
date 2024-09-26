import { Request, Response } from "express";
import { EmployeeService } from "../services/employee.service";
import { ApiResponse } from "../shared/api/api.response";
import asyncHandler from "../middlewares/async-handler.middleware";

const employeeService = new EmployeeService();
const apiResponse = new ApiResponse();

export const createEmployee = asyncHandler(
  async (req: Request, res: Response) => {
    const { name } = req.body;
    const employee = await employeeService.createEmployee(name);
    apiResponse.Created(res, employee);
  }
);

export const getAllEmployees = asyncHandler(
  async (_req: Request, res: Response) => {
    const employees = await employeeService.getAllEmployees();
    apiResponse.Ok(res, employees);
  }
);

export const getDailySummary = asyncHandler(
  async (req: Request, res: Response) => {
    const { employeeId } = req.params;
    const summary = await employeeService.getDailySummary(
      Number(employeeId),
    );
    apiResponse.Ok(res, summary);
  }
);
