import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getServerSession } from "next-auth";
import { getTodos } from "~/actions/todo";
import { MainTabs } from "~/components/main-tabs";
import { TypographyH1 } from "~/components/ui/typography";
import { authOptions } from "~/server/auth";
import getQueryClient from "~/utils/get-rq-client";

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["todos"],
    queryFn: async () => await getTodos(session!.user.id),
  });
  const dehydratedState = dehydrate(queryClient);
  return (
    <>
      <section className="py-12">
        <div className="container">
          <TypographyH1 className="mb-6 text-center">Todo List</TypographyH1>

          <HydrationBoundary state={dehydratedState}>
            <MainTabs />
            {/* <DataTable data={todos ?? []} columns={todoColumns} /> */}
          </HydrationBoundary>
        </div>
      </section>
    </>
  );
}
