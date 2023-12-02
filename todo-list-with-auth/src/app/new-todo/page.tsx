import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { TodoForm } from "~/components/todo-form";
import { TypographyH2 } from "~/components/ui/typography";
import { getFormInfo } from "~/utils/api";
import getQueryClient from "~/utils/get-rq-client";

export default async function NewTodoPage() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["form"],
    queryFn: getFormInfo,
  });
  const dehydratedState = dehydrate(queryClient);
  return (
    <section className="container py-12">
      <TypographyH2 className="mb-6">Add task</TypographyH2>
      <HydrationBoundary state={dehydratedState}>
        {/* <NewTodoForm /> */}
        <TodoForm mode="insert" />
      </HydrationBoundary>
    </section>
  );
}
