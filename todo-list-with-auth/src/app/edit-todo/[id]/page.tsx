import { type Todo } from "@prisma/client";
import { notFound, redirect } from "next/navigation";
import { PageSection } from "~/components/page-section";
import { TodoForm } from "~/components/todo-form";
import { TypographyH2 } from "~/components/ui/typography";
import { db } from "~/server/db";

interface PageProps {
  params: {
    id: Todo["id"];
  };
}

export default async function EditTodoPage({ params: { id } }: PageProps) {
  const todo = await db.todo.findFirst({ where: { id: +id } });
  async function editTodo(data: FormData) {
    "use server";
    const name = data.get("name") as string;
    const completed = data.get("completed");

    await db.todo.update({
      data: {
        name,
        completed: completed === "on",
      },
      where: {
        id: +id,
      },
    });
    // redirect to homepage
    redirect("/");
  }
  if (!todo) return notFound();
  return (
    <PageSection>
      <TypographyH2 className="mb-6 text-center">Edit todo</TypographyH2>
      <TodoForm mode="edit" data={todo} />
    </PageSection>
  );
}
