"use client";

import { type Todo } from "@prisma/client";
import { type ColumnDef } from "@tanstack/react-table";
import { EditIcon, Trash } from "lucide-react";
import Link from "next/link";
import { deleteTodo } from "~/actions/todo";
import { Button, buttonVariants } from "~/components/ui/button";
import { useToast } from "~/components/ui/use-toast";
import { cn } from "~/utils";

export const todoColumns: ColumnDef<Todo>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "",
    header: "Actions",
    cell(props) {
      const { toast } = useToast();
      return (
        <div className="flex items-center gap-6">
          <Link
            className={cn(
              buttonVariants({
                size: "icon",
              }),
            )}
            href={`/edit-todo/${props.row.original.id}`}
          >
            <EditIcon />
          </Link>
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
            size="icon"
          >
            <Trash />
          </Button>
        </div>
      );
    },
  },
];
