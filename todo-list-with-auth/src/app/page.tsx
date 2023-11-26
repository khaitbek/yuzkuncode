import { Todo } from "@prisma/client";
import { getServerSession } from "next-auth";
import { todoColumns } from "~/columns/todos";
import { DataTable } from "~/components/data-table";
import { TypographyH1 } from "~/components/ui/typography";
import { authOptions } from "~/server/auth";
import { db } from "~/server/db";

async function getTodos(userId: Todo["createdById"]) {
  return await db.todo.findMany({ where: { createdById: userId } });
}

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  const todos = await getTodos(session!.user.id);
  return (
    <>
      <section className="py-12">
        <div className="container">
          <TypographyH1 className="mb-6 text-center">Todo List</TypographyH1>
          <DataTable data={todos} columns={todoColumns} />
        </div>
      </section>
    </>
  );
}
