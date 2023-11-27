"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { type z } from "zod";
import { addTodo } from "~/actions/todo";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { TypographyH2 } from "~/components/ui/typography";
import { useToast } from "~/components/ui/use-toast";
import { addTodoSchema } from "~/schemas/todo";
type NewTodoFields = z.infer<typeof addTodoSchema>;

export function NewTodoForm() {
  const { toast } = useToast();
  // const {} = useAction();
  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<NewTodoFields>({
    mode: "all",
    resolver: zodResolver(addTodoSchema),
  });
  const handleNewTodo: SubmitHandler<NewTodoFields> = async (values) => {
    const mutation = await addTodo({ name: values.name });
    reset({
      name: "",
    });
    toast({
      title: (mutation.validationError?._root ??
        mutation.serverError ??
        mutation.data?.message) as string,
    });
  };
  return (
    <form
      className="flex h-full items-center justify-center"
      onSubmit={handleSubmit(handleNewTodo)}
    >
      <div className="container mx-auto grid max-w-[650px] gap-6 p-6">
        <TypographyH2>Add new todo</TypographyH2>
        <Label htmlFor="name">Title</Label>
        <Input
          id="name"
          type="text"
          placeholder="Name of your todo..."
          {...register("name")}
        />
        <p className="text-red-500">{errors.name?.message}</p>
        <Button
          aria-disabled={isSubmitting}
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </form>
  );
}
