import { type ComponentProps } from "react";
import { cn } from "~/utils";
import { Paragraph, TypographyH3 } from "../ui/typography";

export default async function CardInfoGrid({
  className,
  ...props
}: ComponentProps<"ul">) {
  return (
    <ul
      className={cn(
        "flex flex-wrap gap-6 [&>*]:flex-1 [&>*]:basis-28",
        className,
      )}
    >
      <CardInfoItem label="Tasks" value="100" />
      <CardInfoItem label="Completed" value="40%" />
      <CardInfoItem label="In progress" value="60%" />
    </ul>
  );
}

interface CardInfoItemProps {
  label: string;
  value: string;
  description?: string;
}

function CardInfoItem({ label, value, description }: CardInfoItemProps) {
  return (
    <li className="rounded-lg border p-4">
      <div className="grid">
        <Paragraph className="text-card-foreground">{label}</Paragraph>
        <TypographyH3>{value}</TypographyH3>
        {!!description && (
          <Paragraph className="text-muted">{description}</Paragraph>
        )}
      </div>
    </li>
  );
}
