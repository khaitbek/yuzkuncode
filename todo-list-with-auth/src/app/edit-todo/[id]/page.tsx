import { type Todo } from "@prisma/client";
import { notFound, redirect } from "next/navigation";
import { Checkbox } from "~/components/ui/checkbox";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { TypographyH2 } from "~/components/ui/typography";
import { db } from "~/server/db";
import { NewTodoSubmitButton } from "../submit-button";

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
    redirect("/");
  }
  if (!todo) return notFound();
  return (
    <form className="flex h-full items-center justify-center" action={editTodo}>
      <div className="container mx-auto grid max-w-[650px] gap-6 p-6">
        <TypographyH2>Edit todo with the id of {id}</TypographyH2>
        <Label htmlFor="name">Title</Label>
        <Input
          defaultValue={todo?.name}
          id="name"
          type="text"
          name="name"
          placeholder="Name of your todo..."
          required
        />
        <div className="flex items-center space-x-2">
          <Checkbox
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            defaultChecked={todo.completed}
            id="terms"
            name="completed"
          />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Completed
          </label>
        </div>
        <NewTodoSubmitButton />
      </div>
    </form>
  );
}
