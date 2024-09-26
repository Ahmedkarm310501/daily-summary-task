import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { axiosInstance } from "@/config/axios";
import { Task } from "@/types/task";
import { queryClient } from "@/main";
import { formatDateToTime } from "@/lib/formatTime";
import ErrorModal from "./ErrorModal";
import { useState } from "react";
import { AxiosError } from "axios";

// Zod schema for validation
const taskSchema = z.object({
  employeeId: z.number().min(1, "Employee is required"),
  description: z.string().min(1, "Description is required"),
  from: z.string().min(1, "Start time is required"),
  to: z.string().min(1, "End time is required"),
});

interface TaskFormProps {
  onClose: () => void;
  task?: Task;
  employeeId: number;
}

type TaskFormData = z.infer<typeof taskSchema>;

export function TaskForm({ onClose, task, employeeId }: TaskFormProps) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const editMode = task ? true : false;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      employeeId: employeeId,
      description: task?.description || "",
      from: formatDateToTime(task?.from) || "",
      to: formatDateToTime(task?.to) || "",
    },
  });

  const { isPending, mutate } = useMutation({
    mutationFn: async (data: TaskFormData) => {
      const editPoint = editMode ? `/tasks/${task?.id}` : "/tasks";
      return await axiosInstance[editMode ? "patch" : "post"](editPoint, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["dailySummary"] });

      onClose();
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.response?.status === 400) {
          setErrorMessage(error.response.data.message);
          return;
        }
      }
      setErrorMessage(
        "An error occurred while saving the task. Please try again later."
      );
    },
  });

  const onSubmit = (data: TaskFormData) => {
    mutate(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-4">
        <div>
          <Label htmlFor="description">Task Description</Label>
          <Textarea id="description" {...register("description")} required />
          {errors.description && (
            <p className="text-red-500">{errors.description.message}</p>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="startTime">Start Time</Label>
            <Input id="startTime" type="time" {...register("from")} required />
            {errors.from && (
              <p className="text-red-500">{errors.from.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="endTime">End Time</Label>
            <Input id="endTime" type="time" {...register("to")} required />
            {errors.to && <p className="text-red-500">{errors.to.message}</p>}
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Saving..." : "Save Task"}
          </Button>
        </div>
      </form>
      {errorMessage && (
        <ErrorModal
          opened={!!errorMessage}
          errorMessage={errorMessage}
          onClose={() => setErrorMessage(null)}
        />
      )}
    </>
  );
}
