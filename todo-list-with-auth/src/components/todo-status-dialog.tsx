"use client";
import { type Todo } from "@prisma/client";
import { ReactNode, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { TodoStatusForm } from "./todo-status-form";

interface TodoStatusDialogProps {
  triggerLabel: ReactNode;
  id: Todo["id"];
  currentStatus?: string;
}

export default function TodoStatusDialog({
  triggerLabel,
  id,
  currentStatus,
}: TodoStatusDialogProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const closeDialog = () => setIsOpen(false);
  return (
    <Dialog
      onOpenChange={(val) => {
        setIsOpen(val);
        console.log({ val });
      }}
      open={isOpen}
      modal
    >
      <DialogTrigger onClick={() => setIsOpen(true)}>
        {triggerLabel}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-6">Change status</DialogTitle>
        </DialogHeader>
        <TodoStatusForm
          postSubmit={closeDialog}
          todoId={id}
          triggerProps={{
            placeholder: currentStatus,
          }}
        />
        {/* <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button">Close</Button>
          </DialogClose>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}
