"use client";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

export default function ClearTasksButton() {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} variant="destructive">
      Clear tasks
    </Button>
  );
}
