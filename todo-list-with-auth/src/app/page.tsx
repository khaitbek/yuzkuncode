import { todoColumns } from "~/columns/todos";
import { DataTable } from "~/components/data-table";
import { TypographyH1 } from "~/components/ui/typography";
import { db } from "~/server/db";

async function getTodos() {
  return await db.todo.findMany();
}

export default async function HomePage() {
  const todos = await getTodos();
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
