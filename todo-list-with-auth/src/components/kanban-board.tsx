"use client";

import { type Todo } from "@prisma/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { changeTodoStatus } from "~/actions/todo";
import { useTaskStore } from "~/store/task-board";
import { getTasksByStatus } from "~/utils/api";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { TypographyH3 } from "./ui/typography";

interface KanbanBoardProps {
  status: string;
  statusKey: Todo["status"];
  tasks: Todo[];
}

export function KanbanBoard({ status, statusKey }: KanbanBoardProps) {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { draggedTask, dragTask, draggedStatus } = useTaskStore();
  const queryClient = useQueryClient();
  const { data: tasks, isLoading } = useQuery({
    queryKey: ["board", status],
    queryFn: async () => await getTasksByStatus(statusKey),
  });
  const handleDrop = async () => {
    if (!draggedTask) return;

    await changeTodoStatus({
      id: String(draggedTask),
      status: statusKey,
    });
    await queryClient.invalidateQueries({
      queryKey: ["board", draggedStatus],
    });
    await queryClient.invalidateQueries({
      queryKey: ["board", status],
    });
    dragTask(null, status);
  };
  return (
    <li
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className="cursor-pointer space-y-6 rounded-lg border border-white p-3"
    >
      <TypographyH3>{status}</TypographyH3>
      {!!tasks && (
        <ScrollArea className="max-h-80">
          <ul className="grid gap-3">
            {tasks
              .filter((t) => t.status === statusKey)
              .map((task) => (
                <li key={task.id}>
                  <KanbanBoardTask
                    statusKey={statusKey}
                    id={task.id}
                    name={task.name}
                    status={status}
                  />
                </li>
              ))}
          </ul>
        </ScrollArea>
      )}
    </li>
  );
}

function KanbanBoardTask({
  id,
  name,
  status,
}: {
  id: Todo["id"];
  name: Todo["name"];
  status: string;
  statusKey: Todo["status"];
}) {
  const { dragTask } = useTaskStore();
  return (
    <Button
      onDragStart={async () => {
        dragTask(id, status);
      }}
      draggable
      className="w-full"
    >
      {name}
    </Button>
  );
}
