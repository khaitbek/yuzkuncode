import { TaskStatus } from "@prisma/client";
import { taskStatusKeys } from "~/columns/todos";
import { KanbanBoard } from "./kanban-board";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

export function BoardView() {
  return (
    <ScrollArea>
      <ul className="flex justify-between gap-6 [&>*]:flex-1">
        {Object.values(TaskStatus)
          .filter((s) => s !== "LATE")
          .map((status) => (
            <KanbanBoard
              statusKey={status}
              status={taskStatusKeys[status]}
              key={status}
            />
          ))}
      </ul>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
