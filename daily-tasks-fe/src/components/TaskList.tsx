import { useState } from "react";
import { Loader, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TaskForm } from "./TaskForm";
import { Task } from "@/types/task";
import { formatDateToTime } from "@/lib/formatTime";
import DeleteTaskModal from "./DeleteTaskModal";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/config/axios";
import { queryClient } from "@/main";

interface TaskListProps {
  tasks?: Task[];
  isLoading: boolean;
  employeeId: number;
}

export function TaskList({ tasks, isLoading, employeeId }: TaskListProps) {
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deletingTaskId, setDeletingTaskId] = useState<number | null>(null);

  const {  mutate } = useMutation({
    mutationFn: async (taskId: number) => {
      return await axiosInstance.delete(`/tasks/${taskId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["dailySummary"] });
      setDeletingTaskId(null);
    },
  });

  if (isLoading) {
    return <Loader className="mx-auto" />;
  }

  if (!tasks || tasks.length === 0) {
    return <p>No tasks found.</p>;
  }

  const handleEdit = (task: Task) => {
    setEditingTask(task);
  };

  const handleDelete = (taskId: number) => {
    setDeletingTaskId(taskId);
  };

  const confirmDelete = () => {
    if (deletingTaskId) {
      mutate(deletingTaskId);
    }
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Description</TableHead>
            <TableHead>Start Time</TableHead>
            <TableHead>End Time</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell>{task.description}</TableCell>
              <TableCell>{formatDateToTime(task.from)}</TableCell>
              <TableCell>{formatDateToTime(task.to)}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => handleEdit(task)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => handleDelete(task.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {editingTask && (
        <TaskForm
          task={editingTask}
          onClose={() => setEditingTask(null)}
          employeeId={employeeId}
        />
      )}

      <DeleteTaskModal
        deletingTaskId={deletingTaskId}
        setDeletingTaskId={setDeletingTaskId}
        confirmDelete={confirmDelete}
      />
    </>
  );
}
