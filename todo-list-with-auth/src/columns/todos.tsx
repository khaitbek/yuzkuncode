/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";
import { type Todo } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, EditIcon, Trash } from "lucide-react";
import Link from "next/link";
import { type CompleteTodo } from "prisma/zod";
import { deleteTodo } from "~/actions/todo";
import TodoStatusDialog from "~/components/todo-status-dialog";
import { Badge, type BadgeProps } from "~/components/ui/badge";
import { Button, buttonVariants } from "~/components/ui/button";
import { useToast } from "~/components/ui/use-toast";
import { taskStatusKeys, type Status } from "~/data/status";
import { cn } from "~/utils";

export const todoColumns: ColumnDef<CompleteTodo>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell(props) {
      return (
        <div className="flex items-center gap-6">
          <Badge>{props.row.original.category?.name}</Badge>
          <span>{props.row.original.name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell(props) {
      const variant: {
        [x in Status]: BadgeProps["variant"];
      } = {
        TO_DO: "default",
        IN_PROGRESS: "info",
        COMPLETED: "outline",
        CANCELLED: "secondary",
        LATE: "destructive",
      };
      // const variant = badgeVariants({
      //   variant:""
      // })
      const neededKeyString =
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        taskStatusKeys[props.row.original.status];
      return (
        <TodoStatusDialog
          id={props.row.original.id}
          triggerLabel={
            <div className="flex items-center gap-3">
              <Badge variant={variant[props.row.original.status]}>
                {neededKeyString}
              </Badge>
            </div>
          }
          currentStatus={neededKeyString}
        />
      );
    },
    filterFn: (row, id, value) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "priorityId",
    header: "Priority",
    cell(props) {
      return (
        <Badge variant="outline">{props.row.original.priority.name}</Badge>
      );
    },
    filterFn: (row, id, value) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      console.log({
        value,
        rowGetValue: row.getValue(String(row.original.priority.name)),
      });
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      return value.includes(row.original.priority.name);
    },
  },
  {
    accessorKey: "",
    header: "Actions",
    cell(props) {
      const queryClient = useQueryClient();
      const { toast } = useToast();
      const { mutate: deleteMutation } = useMutation({
        mutationFn: async () => {
          toast({
            title: "Deleting...",
          });

          await deleteTodo(props.row.original.id);
        },
        onMutate: async () => {
          await queryClient.cancelQueries({
            queryKey: ["todos"],
          });
          const previousTodos = queryClient.getQueryData(["todos"]);
          queryClient.setQueryData(["todos"], (old: Todo[]) =>
            old.filter((todo) => todo.id !== props.row.original.id),
          );
          return { previousTodos };
        },
      });
      return (
        <div className="flex max-w-max gap-6">
          <Link
            className={cn(
              buttonVariants({
                className: "w-full",
              }),
            )}
            href={`/edit-todo/${props.row.original.id}`}
          >
            <span className="sr-only">Edit</span>
            <EditIcon size={16} />
          </Link>
          <Button onClick={() => deleteMutation()} variant="destructive">
            <span className="sr-only">Delete</span>
            <Trash size={16} />
          </Button>
        </div>
      );
    },
  },
];
