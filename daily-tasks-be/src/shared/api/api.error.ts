import { HttpStatus } from "./http-status.enum";

export class ApiError extends Error {
  public statusCode: number;
  public status: string;
  public isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string) {
    super(message, HttpStatus.NOT_FOUND);
  }
}

export class BadRequestError extends ApiError {
  constructor(message: string) {
    super(message, HttpStatus.BAD_REQUEST);
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message: string) {
    super(message, HttpStatus.UNAUTHORIZED);
  }
}

export class ForbiddenError extends ApiError {
  constructor(message: string) {
    super(message, HttpStatus.FORBIDDEN);
  }
}

export class InternalServerError extends ApiError {
  constructor(message: string) {
    super(message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

export class ValidationError extends ApiError {
  constructor(message: string) {
    super(message, HttpStatus.VALIDATION_ERROR);
  }
}

export class LogicalError extends ApiError {
  constructor(message: string) {
    super(message, HttpStatus.BAD_REQUEST);
  }
}
