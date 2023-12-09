import { getFormInfo } from "~/actions/todo";
import { Modal } from "~/components/modal";
import { TodoForm } from "~/components/todo-form";
import { DialogContent } from "~/components/ui/dialog";
import { TypographyH2 } from "~/components/ui/typography";
export default async function NewTodoModal() {
  const data = await getFormInfo();

  return (
    <section className="container py-12">
      <Modal>
        <DialogContent className="sm:max-w-[425px]">
          <TypographyH2 className="mb-6">Add task</TypographyH2>
          <TodoForm formInfo={data} mode="insert" />
        </DialogContent>
      </Modal>
    </section>
  );
}
