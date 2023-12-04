import { TaskStatus } from "@prisma/client";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { getTodos } from "~/actions/todo";
import { taskStatusKeys } from "~/data/status";
import { authOptions } from "~/server/auth";
import getQueryClient from "~/utils/get-rq-client";
import { KanbanBoard } from "./kanban-board";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

export async function BoardView() {
  const session = await getServerSession(authOptions);
  if (!session) notFound();
  const queryClient = getQueryClient();
  const tasks = await queryClient.ensureQueryData({
    queryKey: ["todos"],
    queryFn: async () => getTodos(session.user.id),
  });
  return (
    <ScrollArea>
      <ul className="flex justify-between gap-6 [&>*]:flex-1">
        {Object.values(TaskStatus)
          .filter((s) => s !== "LATE")
          .map((status) => (
            <KanbanBoard
              tasks={tasks}
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
