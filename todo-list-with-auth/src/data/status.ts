import {
  CheckCircle,
  Circle,
  MinusCircle,
  Timer,
  XCircle,
  type LucideIcon,
} from "lucide-react";
import { type Status } from "~/columns/todos";

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
