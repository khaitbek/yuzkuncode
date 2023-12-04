"use client";
import { type ComponentProps } from "react";

export default function ClientComponent({ children }: ComponentProps<"div">) {
  return (
    <div className="grid gap-3">
      Client component importing server component
      {children}
    </div>
  );
}
