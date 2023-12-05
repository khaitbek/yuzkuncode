"use client";
import { type DialogProps } from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";
import { Dialog } from "./ui/dialog";

export function Modal({ children, ...props }: DialogProps) {
  const router = useRouter();
  return (
    <Dialog
      onOpenChange={(val) => {
        if (!val) router.back();
      }}
      defaultOpen
      {...props}
    >
      {children}
    </Dialog>
  );
}
