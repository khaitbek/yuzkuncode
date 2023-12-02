import {
  Delete,
  Divide,
  Laptop,
  TimerReset,
  type LucideIcon,
} from "lucide-react";

interface TablePriority {
  value: string;
  label: string;
  icon: LucideIcon;
}
export const priorities: TablePriority[] = [
  {
    value: "Do",
    label: "Do",
    icon: Laptop,
  },
  {
    value: "Defer",
    label: "Defer",
    icon: TimerReset,
  },
  {
    value: "Delegate",
    label: "Delegate",
    icon: Divide,
  },
  {
    value: "Delete",
    label: "Delete",
    icon: Delete,
  },
];
