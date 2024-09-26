import express from "express";
import employeeRoutes from "./routes/employee.routes";
import taskRoutes from "./routes/task.routes";
import { AppDataSource } from "./data-source";
import notFoundError from "./middlewares/errors/notFound.middleware";
import globalError from "./middlewares/errors/error.middleware";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/v1/employees", employeeRoutes);
app.use("/api/v1/tasks", taskRoutes);

// Error handling
app.use("*", notFoundError);
app.use(globalError);

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

// Handle Uncaught Exceptions
process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
});

// Handle Unhandled Promise Rejections
process.on("unhandledRejection", (reason: any) => {
  console.error("Unhandled Rejection at:", reason);
});

export default app;
