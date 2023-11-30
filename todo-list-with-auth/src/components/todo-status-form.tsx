"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { TaskStatus, Todo } from "@prisma/client";
import { type SelectTriggerProps } from "@radix-ui/react-select";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { changeTodoStatus } from "~/actions/todo";
import { taskStatusKeys } from "~/columns/todos";
import { Button } from "./ui/button";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface TodoStatusFormProps {
  todoId: Todo["id"];
  triggerProps: SelectTriggerProps;
  // eslint-disable-next-line @typescript-eslint/ban-types
  postSubmit: Function;
}

const formSchema = z.object({
  status: z.string(),
});
type FormFields = z.infer<typeof formSchema>;
export function TodoStatusForm({
  triggerProps,
  todoId,
  postSubmit,
}: TodoStatusFormProps) {
  const { isPending, mutateAsync } = useMutation({
    mutationKey: ["update", "todo", "status", todoId],
    mutationFn: async (values: FormFields) =>
      changeTodoStatus({
        id: String(todoId),
        status: values.status,
      }),
    onSuccess(data, variables, context) {
      postSubmit();
    },
  });
  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
  });

  // 2. Define a submit handler.
  async function onSubmit(values: FormFields) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    await mutateAsync(values);
    console.log(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder={triggerProps.placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {/* eslint-disable-next-line @typescript-eslint/no-unsafe-argument */}
                  {Object.values(TaskStatus).map((status) => (
                    <SelectItem value={status}>
                      {taskStatusKeys[status]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending}>
          Submit
        </Button>
      </form>
    </Form>
  );
}
