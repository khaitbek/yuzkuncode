import { ComponentProps } from "react";
import { cn } from "~/utils";

export function PageSection({
  className,
  children,
  ...props
}: ComponentProps<"section">) {
  return (
    <section className={cn("py-12", className)}>
      <div className="container">{children}</div>
    </section>
  );
}
