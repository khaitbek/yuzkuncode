import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { type CompleteTodo } from "prisma/zod";
import { getTodos } from "~/actions/todo";
import { todoColumns } from "~/columns/todos";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { authOptions } from "~/server/auth";
import getQueryClient from "~/utils/get-rq-client";
import { BoardView } from "./board-view";
import { Dashboard } from "./dashboard";
import { DataTable } from "./data-table";

export async function MainTabs() {
  const session = await getServerSession(authOptions);
  if (!session) notFound();
  const queryClient = getQueryClient();
  const todos = await queryClient.ensureQueryData({
    queryKey: ["todos"],
    queryFn: async () => await getTodos(session.user.id),
  });
  return (
    <Tabs className="p-0" defaultValue="tasks">
      <TabsList className="flex h-max max-w-max bg-transparent p-0">
        <TabsTrigger value="tasks">Tasks</TabsTrigger>
        <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
        <TabsTrigger value="board">Kanban board</TabsTrigger>
      </TabsList>
      <TabsContent value="tasks">
        <DataTable
          data={(todos as unknown as CompleteTodo[]) ?? []}
          columns={todoColumns}
        />
      </TabsContent>
      <TabsContent className="py-6" value="board">
        <BoardView />
      </TabsContent>
      <TabsContent className="py-6" value="dashboard">
        <Dashboard />
      </TabsContent>
    </Tabs>
  );
}
