import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { axiosInstance } from "@/config/axios";
import { queryClient } from "@/main";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogClose } from "@radix-ui/react-dialog";
import { useMutation } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const EmployeeSchema = z.object({
  name: z.string().min(1, "Name is required"),
});

type EmployeeFormData = z.infer<typeof EmployeeSchema>;

export function AddEmployeeFrom() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EmployeeFormData>({
    resolver: zodResolver(EmployeeSchema),
    defaultValues: {
      name: "",
    },
  });

  const { isPending, mutate } = useMutation({
    mutationFn: async (data: EmployeeFormData) => {
      return await axiosInstance.post("/employees", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });

  const onSubmit = (data: EmployeeFormData) => {
    reset();
    mutate(data);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Employee
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add employee</DialogTitle>
        </DialogHeader>
        <form
          className="flex gap-4 flex-col items-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-4 w-full flex-1">
            <Label htmlFor="name">Name</Label>
            <Input id="name" type="text" {...register("name")} />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>
          <DialogClose asChild>
            <Button type="submit" className="ms-auto" disabled={isPending}>
              {isPending ? "Adding..." : "Add Employee"}
            </Button>
          </DialogClose>
        </form>
      </DialogContent>
    </Dialog>
  );
}
