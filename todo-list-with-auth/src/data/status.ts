import { TaskStatus } from "@prisma/client";
import {
  CheckCircle,
  Circle,
  MinusCircle,
  Timer,
  XCircle,
  type LucideIcon,
} from "lucide-react";

interface TableStatus {
  value: Status;
  label: string;
  icon: LucideIcon;
}

export const statuses: TableStatus[] = [
  {
    value: "TO_DO",
    label: "To do",
    icon: Circle,
  },
  {
    value: "COMPLETED",
    label: "Completed",
    icon: CheckCircle,
  },
  {
    value: "IN_PROGRESS",
    label: "In progress",
    icon: Timer,
  },
  {
    value: "LATE",
    label: "Late",
    icon: XCircle,
  },
  {
    value: "CANCELLED",
    label: "Cancelled",
    icon: MinusCircle,
  },
];

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
