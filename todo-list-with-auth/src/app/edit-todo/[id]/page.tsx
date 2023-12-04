import { type Todo } from "@prisma/client";
import { notFound } from "next/navigation";
import { PageSection } from "~/components/page-section";
import { TodoForm } from "~/components/todo-form";
import { TypographyH2 } from "~/components/ui/typography";
import { db } from "~/server/db";
import { getFormInfo } from "~/utils/api";

interface PageProps {
  params: {
    id: Todo["id"];
  };
}

export default async function EditTodoPage({ params: { id } }: PageProps) {
  const todo = await db.todo.findFirst({ where: { id: +id } });
  if (!todo) return notFound();
  // const { data } = useQuery({
  //   queryKey: ["form"],
  //   queryFn: async () => await getFormInfo(),
  // });
  const data = await getFormInfo();
  return (
    <PageSection>
      <TypographyH2 className="mb-6 text-center">Edit todo</TypographyH2>
      <TodoForm formInfo={data} mode="edit" data={todo} />
    </PageSection>
  );
}
