import { Employee } from "@/types/employee";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";
import { AddEmployeeFrom } from "./AddEmployeeFrom";

type EmployeesSectionProps = {
  employees: Employee[];
  selectedEmployee?: string;
  setSelectedEmployee: (employeeId: string) => void;
};

const EmployeesSection = ({
  employees,
  selectedEmployee,
  setSelectedEmployee,
}: EmployeesSectionProps) => {
  return (
    <Card>
        
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Employee Selection</CardTitle>
        <AddEmployeeFrom />
      </CardHeader >
      <CardContent>


        <Select onValueChange={setSelectedEmployee} value={selectedEmployee}>
          <SelectTrigger>
            <SelectValue placeholder="Select an employee" />
          </SelectTrigger>
          <SelectContent>
            {employees?.map((employee) => (
              <SelectItem key={employee.id} value={String(employee.id)}>
                {employee.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
};

export default EmployeesSection;
