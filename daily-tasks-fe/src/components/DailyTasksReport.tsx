import { useState } from "react";
import { Loader } from "lucide-react";
import useEmployees from "@/hooks/useEmployees";
import useTasks from "@/hooks/useTasks";
import useDailySummary from "@/hooks/useDailySummary";
import DailySummaryCard from "./DailySummaryCard";
import EmployeesSection from "./EmployeesSection";
import TasksSection from "./TasksSection";

export default function DailyTasksReport() {
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<string | undefined>(
    undefined
  );

  const { data: employees, isLoading: isLoadingEmployees } = useEmployees();
  const { data: tasks, isLoading: isLoadingTasks } = useTasks(selectedEmployee);
  const { data: dailySummary, isLoading: isLoadingDailySummary } =
    useDailySummary(selectedEmployee);

  if (isLoadingEmployees) {
    return (
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-8">Daily Tasks Report</h1>
        <div className="flex justify-center items-center">
          <Loader size={150} />
        </div>
      </div>
    );
  }

  if (!employees) {
    return <p>No employees found.</p>;
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Daily Tasks Report</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <EmployeesSection
          employees={employees}
          selectedEmployee={selectedEmployee}
          setSelectedEmployee={setSelectedEmployee}
        />

        <DailySummaryCard
          dailySummary={dailySummary}
          isLoading={isLoadingDailySummary}
        />
      </div>
      <TasksSection
        selectedEmployee={selectedEmployee}
        isLoadingTasks={isLoadingTasks}
        setShowTaskForm={setShowTaskForm}
        showTaskForm={showTaskForm}
        tasks={tasks}
      />
    </div>
  );
}
