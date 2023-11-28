"use client";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { getTodos } from "~/actions/todo";
import { todoColumns } from "~/columns/todos";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { DataTable } from "./data-table";

export function MainTabs() {
  const session = useSession();
  const { data: todos, isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => await getTodos(session.data!.user.id),
  });
  return (
    <Tabs defaultValue="account">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="tasks">Tasks</TabsTrigger>
        <TabsTrigger value="categories">Categories</TabsTrigger>
      </TabsList>
      <TabsContent value="tasks">
        <DataTable data={todos ?? []} columns={todoColumns} />
      </TabsContent>
      <TabsContent value="categories"></TabsContent>
    </Tabs>
  );
}
