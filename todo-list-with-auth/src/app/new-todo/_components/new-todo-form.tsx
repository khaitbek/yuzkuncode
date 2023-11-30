/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type * as z from "zod";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { type ComponentProps } from "react";
import { addTodo } from "~/actions/todo";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { useToast } from "~/components/ui/use-toast";
import { NewTodoSchema } from "~/schemas/todo";
import { getFormInfo } from "~/utils/api";
import getQueryClient from "~/utils/get-rq-client";

type FormFields = z.infer<typeof NewTodoSchema>;

export function NewTodoForm() {
  const queryClient = getQueryClient();
  const router = useRouter();
  const form = useForm<FormFields>({
    resolver: zodResolver(NewTodoSchema),
  });
  const { data, error } = useQuery({
    queryKey: ["form"],
    queryFn: async () => await getFormInfo(),
  });
  const { toast } = useToast();
  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["tasks", "new"],
    mutationFn: async (data: FormFields) => addTodo(data),
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: ["todos"] });
      router.push("/");
    },
    onError() {
      toast({
        title: "Something went wrong!",
        variant: "destructive",
      });
    },
  });
  // 2. Define a submit handler.
  async function onSubmit(values: FormFields) {
    await mutateAsync(values);
  }
  if (!data) return null;
  const { categories, priorities } = data;
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormGroup>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Task</FormLabel>
                <FormControl>
                  <Input defaultValue="" placeholder="todo..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  {/* @ts-expect-error prisma misconfig */}
                  <Input placeholder="A meaningful description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </FormGroup>
        <FormGroup>
          <FormField
            control={form.control}
            name="priorityId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Priority</FormLabel>
                <Select
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a priority" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {priorities.map((priority) => (
                      <SelectItem value={String(priority.id)}>
                        {priority.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Priority</FormLabel>
                <Select
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a priority" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem value={String(category.id)}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </FormGroup>
        <Button disabled={isPending} type="submit">
          {isPending ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
function FormGroup({ children }: ComponentProps<"div">) {
  return (
    <div className="flex flex-col gap-6 md:flex-row [&>*]:flex-1">
      {children}
    </div>
  );
}
