import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { TaskForm } from "./TaskForm";
import { TaskList } from "./TaskList";
import { Task } from "@/types/task";

type TasksSectionProps = {
  selectedEmployee: string | undefined;
  setShowTaskForm: React.Dispatch<React.SetStateAction<boolean>>;
  showTaskForm: boolean;
  tasks?: Task[];
  isLoadingTasks: boolean;
};

const TasksSection = ({
  selectedEmployee,
  isLoadingTasks,
  setShowTaskForm,
  showTaskForm,
  tasks,
}: TasksSectionProps) => {
  return (
    <Card className="mt-6">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Tasks</CardTitle>
        <Button
          onClick={() => setShowTaskForm(true)}
          disabled={!selectedEmployee}
        >
          <Plus className="mr-2 h-4 w-4" /> Add Task
        </Button>
      </CardHeader>
      <CardContent>
        {showTaskForm && (
          <TaskForm
            employeeId={Number(selectedEmployee)}
            onClose={() => setShowTaskForm(false)}
          />
        )}

        {!selectedEmployee && <p>Select an employee to view tasks.</p>}

        {selectedEmployee && (
          <TaskList
            tasks={tasks}
            isLoading={isLoadingTasks}
            employeeId={Number(selectedEmployee)}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default TasksSection;
