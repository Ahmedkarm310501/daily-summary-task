import { Router } from "express";
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from "../controllers/task.controller";
import { validate } from "../middlewares/validation.middleware";
import { CreateTaskSchema, UpdateTaskSchemaBody } from "../utils/validation";

const router = Router();

router.post("/", validate(CreateTaskSchema), createTask);

router.get("/", getTasks);

router.patch("/:id", validate(UpdateTaskSchemaBody), updateTask);

router.delete("/:id", deleteTask);

export default router;
