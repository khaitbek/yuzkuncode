/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";
import { type ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, EditIcon, MoreHorizontal, Trash } from "lucide-react";
import Link from "next/link";
import { type CompleteTodo } from "prisma/zod";
import { deleteTodo } from "~/actions/todo";
import TodoStatusDialog from "~/components/todo-status-dialog";
import { Badge, type BadgeProps } from "~/components/ui/badge";
import { Button, buttonVariants } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { useToast } from "~/components/ui/use-toast";
import { Status, taskStatusKeys } from "~/data/status";
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
          <Badge>{props.row.original.category.name}</Badge>
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
      const { toast } = useToast();
      const todo = props.row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(String(todo.name))}
            >
              Copy todo
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link
                className={cn(
                  buttonVariants({
                    className: "w-full",
                  }),
                )}
                href={`/edit-todo/${props.row.original.id}`}
              >
                Edit
                <EditIcon className="ml-2" size={16} />
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Button
                onClick={async () => {
                  const loading = toast({
                    title: "Deleting...",
                  });
                  await deleteTodo(props.row.original.id);
                  loading.dismiss();
                  toast({
                    title: "Successfully deleted!",
                  });
                }}
                variant="destructive"
              >
                Delete
                <Trash className="ml-3" size={16} />
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
