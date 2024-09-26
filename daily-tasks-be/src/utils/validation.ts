import { z } from "zod";

export const CreateTaskSchema = z.object({
  employeeId: z.number(),
  description: z.string().min(1),
  from: z.string().refine((time) => /^([0-1]\d|2[0-3]):([0-5]\d)$/.test(time), {
    message: "Invalid time format",
  }),
  to: z.string().refine((time) => /^([0-1]\d|2[0-3]):([0-5]\d)$/.test(time), {
    message: "Invalid time format",
  }),
});

export type CreateTaskRequest = z.infer<typeof CreateTaskSchema>;

export const UpdateTaskSchemaBody = z.object({
  description: z.string().optional(),
  from: z.string().optional(),
  to: z.string().optional(),
});

export type UpdateTaskRequest = z.infer<typeof UpdateTaskSchemaBody>;

export const EmployeeSchema = z.object({
  name: z.string().min(1),
});
