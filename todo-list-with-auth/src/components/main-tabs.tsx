"use client";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { type CompleteTodo } from "prisma/zod";
import { getTodos } from "~/actions/todo";
import { todoColumns } from "~/columns/todos";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
// import { BoardView } from "./board-view";
// import { Dashboard } from "./dashboard";
import dynamic from "next/dynamic";
import { DataTable } from "./data-table";

const BoardView = dynamic(
  () => import("./board-view").then((module) => module.BoardView),
  {
    loading: () => <p>Loading...</p>,
  },
);

const Dashboard = dynamic(
  () => import("./dashboard").then((module) => module.Dashboard),
  {
    loading: () => <p>Loading...</p>,
  },
);

export function MainTabs() {
  const session = useSession();
  const { data: todos, isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => await getTodos(session.data!.user.id),
  });
  return (
    <Tabs className="p-0" defaultValue="dashboard">
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
