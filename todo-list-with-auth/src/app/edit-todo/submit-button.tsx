"use client";

import { useFormStatus } from "react-dom";
import { Button } from "~/components/ui/button";

export function NewTodoSubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button aria-disabled={pending} disabled={pending} type="submit">
      {pending ? "Loading..." : "Submit"}
    </Button>
  );
}
