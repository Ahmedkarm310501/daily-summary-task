import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";
import { ApiResponse } from "../shared/api/api.response";

export function validate(schema: z.ZodObject<any, any> | z.ZodEffects<any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      const httpResponse = new ApiResponse();
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue: any) => ({
          path: issue.path.join("."),
          message: `${issue.path.join(".")} is ${issue.message}`,
        }));
        httpResponse.ValidationError(res, errorMessages);
      } else {
        httpResponse.ValidationError(res, "Invalid data provided");
      }
    }
  };
}
