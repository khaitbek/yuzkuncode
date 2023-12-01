"use client";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { getTodos } from "~/actions/todo";
import { todoColumns } from "~/columns/todos";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { BoardView } from "./board-view";
import { DataTable } from "./data-table";

export function MainTabs() {
  const session = useSession();
  const { data: todos, isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => await getTodos(session.data!.user.id),
  });
  return (
    <Tabs defaultValue="table">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="table">Table view</TabsTrigger>
        <TabsTrigger value="board">Board view</TabsTrigger>
      </TabsList>
      <TabsContent value="table">
        <DataTable data={todos ?? []} columns={todoColumns} />
      </TabsContent>
      <TabsContent className="py-6" value="board">
        <BoardView />
      </TabsContent>
    </Tabs>
  );
}
