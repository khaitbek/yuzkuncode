/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";
import { TaskStatus, type Todo } from "@prisma/client";
import { type ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Trash } from "lucide-react";
import { deleteTodo } from "~/actions/todo";
import TodoStatusDialog from "~/components/todo-status-dialog";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { useToast } from "~/components/ui/use-toast";

export const taskStatusEnum = {
  ...TaskStatus,
} as const;
export type Status = keyof typeof taskStatusEnum;
export const taskStatusKeys: {
  [s in Status]: string;
} = {
  CANCELLED: "Cancelled",
  COMPLETED: "Completed",
  IN_PROGRESS: "In progress",
  LATE: "Late",
  TO_DO: "To do",
} as const;

export const todoColumns: ColumnDef<Todo>[] = [
  {
    accessorKey: "id",
    // header({ column }) {
    //   <Button
    //     variant="ghost"
    //     onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    //   >
    //     ID
    //     <ArrowUpDown className="ml-2 h-4 w-4" />
    //   </Button>;
    // },
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell(props) {
      const neededKeyString =
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        taskStatusKeys[props.row.original.status];
      return (
        <TodoStatusDialog
          id={props.row.original.id}
          triggerLabel={neededKeyString}
          currentStatus={neededKeyString}
        />
      );
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
            {/* <DropdownMenuItem>
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
            </DropdownMenuItem> */}
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
