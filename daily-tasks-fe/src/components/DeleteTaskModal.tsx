import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";

type DeleteTaskModalProps = {
  deletingTaskId: number | null;
  setDeletingTaskId: (taskId: number | null) => void;
  confirmDelete: () => void;
};

const DeleteTaskModal = ({
  deletingTaskId,
  setDeletingTaskId,
  confirmDelete,
}: DeleteTaskModalProps) => {
  return (
    <AlertDialog
      open={deletingTaskId !== null}
      onOpenChange={() => setDeletingTaskId(null)}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this task?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the task.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={confirmDelete}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteTaskModal;
