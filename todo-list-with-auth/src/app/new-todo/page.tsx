import { addTodo } from "~/actions/todo";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { TypographyH2 } from "~/components/ui/typography";
import { NewTodoSubmitButton } from "./submit-button";

export default async function NewTodoPage() {
  return (
    <form className="flex h-full items-center justify-center" action={addTodo}>
      <div className="container mx-auto grid max-w-[650px] gap-6 p-6">
        <TypographyH2>Add new todo</TypographyH2>
        <Label htmlFor="name">Title</Label>
        <Input
          id="name"
          type="text"
          name="name"
          placeholder="Name of your todo..."
          required
        />
        <NewTodoSubmitButton />
      </div>
    </form>
  );
}
