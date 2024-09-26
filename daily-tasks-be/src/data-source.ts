import { DataSource } from "typeorm";
import { Employee } from "./entities/employee.entity";
import { Task } from "./entities/task.entity";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [Employee, Task],
  synchronize: true,
  logging: true,
});
