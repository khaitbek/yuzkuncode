import { type Todo } from "@prisma/client";
import { notFound } from "next/navigation";
import { getFormInfo } from "~/actions/todo";
import { Modal } from "~/components/modal";
import { TodoForm } from "~/components/todo-form";
import { DialogContent } from "~/components/ui/dialog";
import { db } from "~/server/db";

interface PageProps {
  params: {
    id: Todo["id"];
  };
}

export default async function EditTodoPage({ params: { id } }: PageProps) {
  const todo = await db.todo.findFirst({ where: { id: +id } });
  if (!todo) return notFound();
  const data = await getFormInfo();
  return (
    <Modal defaultOpen>
      <DialogContent>
        <TodoForm mode="edit" formInfo={data} data={todo} />
      </DialogContent>
    </Modal>
  );
}
