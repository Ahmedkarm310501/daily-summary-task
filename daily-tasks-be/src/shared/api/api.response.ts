import { Response } from "express";
import { HttpStatus } from "./http-status.enum";

export class ApiResponse {
  public Ok(res: Response, data?: any): Response {
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      statusMessage: "Success",
      data,
    });
  }

  public Created(res: Response, data?: any): Response {
    return res.status(HttpStatus.CREATED).json({
      status: HttpStatus.CREATED,
      statusMessage: "Created",
      data,
    });
  }

  public NoContent(res: Response): Response {
    return res.status(HttpStatus.NO_CONTENT).json();
  }

  public ValidationError(res: Response, error?: any): Response {
    return res.status(HttpStatus.VALIDATION_ERROR).json({
      status: HttpStatus.VALIDATION_ERROR,
      statusMessage: "Validation Error",
      error,
    });
  }
}
