import { NextFunction, Request, Response } from "express";
import { ApiError } from "../../shared/api/api.error";
import { HttpStatus } from "../../shared/api/http-status.enum";

const notFoundError = (req: Request, _res: Response, next: NextFunction) => {
  next(
    new ApiError(
      `Can't find this route: ${req.originalUrl}`,
      HttpStatus.NOT_FOUND
    )
  );
};

export default notFoundError;
