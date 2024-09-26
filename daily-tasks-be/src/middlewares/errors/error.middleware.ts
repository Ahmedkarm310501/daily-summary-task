import { ErrorRequestHandler, Response } from "express";
import { QueryFailedError } from "typeorm";

const globalError: ErrorRequestHandler = (err, _req, res, _next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (process.env.NODE_ENV === "development") {
    sendErrorForDev(err, res);
  } else {
    sendErrorForProd(err, res);
  }
};

const sendErrorForDev = (err: any, res: Response) => {
  if (err instanceof QueryFailedError) {
    return res.status(500).json({
      status: "error",
      message: "Query failed error",
    });
  }
  return res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorForProd = (err: any, res: Response) => {
  if (err instanceof QueryFailedError) {
    return res.status(500).json({
      status: "error",
      message: "Something went wrong. Try again later.",
    });
  }
  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

export default globalError;
