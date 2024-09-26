import { axiosInstance } from "@/config/axios";
import { Task } from "@/types/task";
import { useQuery } from "@tanstack/react-query";

type TasksResponse = {
  status: number;
  statusMessage: string;
  data: Task[];
};

const useTasks = (employeeId?: string) =>
  useQuery({
    queryKey: ["tasks", employeeId],
    queryFn: async () => {
      const response = await axiosInstance.get<TasksResponse>("/tasks", {
        params: {
          employeeId,
        },
      });
      return response.data.data;
    },
    enabled: !!employeeId,
  });

export default useTasks;
