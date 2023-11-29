"use client";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { getTodos } from "~/actions/todo";
import { todoColumns } from "~/columns/todos";
import { Tabs, TabsContent } from "~/components/ui/tabs";
import { DataTable } from "./data-table";

export function MainTabs() {
  const session = useSession();
  const { data: todos, isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => await getTodos(session.data!.user.id),
  });
  return (
    <Tabs defaultValue="tasks">
      <TabsContent value="tasks">
        <DataTable data={todos ?? []} columns={todoColumns} />
      </TabsContent>
    </Tabs>
  );
}
