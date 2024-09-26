import { axiosInstance } from "@/config/axios"
import { Employee } from "@/types/employee";
import { useQuery } from "@tanstack/react-query"

type EmployeesResponse = {
  status: number;
  statusMessage: string;
  data: Employee[];
}

const useEmployees = () => useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
        const response = await axiosInstance.get<EmployeesResponse>("/employees")
        return response.data.data
    }
})

export default useEmployees