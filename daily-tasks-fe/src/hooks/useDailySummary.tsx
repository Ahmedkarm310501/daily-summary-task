import { axiosInstance } from "@/config/axios";
import { useQuery } from "@tanstack/react-query";

export type DailySummaryResponse = {
  status: number;
  statusMessage: string;
  data: {
    date: string;
    totalHours: number;
    remainingHours: number;
  };
};

const useDailySummary = (employeeId?: string) =>
  useQuery({
    queryKey: ["dailySummary", employeeId],
    queryFn: async () => {
      const response = await axiosInstance.get<DailySummaryResponse>(
        `/employees/${employeeId}/tasks/summary`
      );
      return response.data.data;
    },
    enabled: !!employeeId,
  });

export default useDailySummary;
