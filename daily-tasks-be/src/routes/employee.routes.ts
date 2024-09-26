import { Router } from "express";
import {
  createEmployee,
  getAllEmployees,
  getDailySummary,
} from "../controllers/employee.controller";
import { validate } from "../middlewares/validation.middleware";
import { EmployeeSchema } from "../utils/validation";

const router = Router();

router.post("/", validate(EmployeeSchema), createEmployee);
router.get("/", getAllEmployees);

router.get("/:employeeId/tasks/summary", getDailySummary);

export default router;
