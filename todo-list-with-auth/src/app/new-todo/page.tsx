import { getFormInfo } from "~/actions/todo";
import { TodoForm } from "~/components/todo-form";
import { TypographyH2 } from "~/components/ui/typography";

export default async function NewTodoPage() {
  // const queryClient = getQueryClient();
  // await queryClient.prefetchQuery({
  //   queryKey: ["form"],
  //   queryFn: getFormInfo,
  // });
  // const dehydratedState = dehydrate(queryClient);
  const data = await getFormInfo();

  return (
    <section className="container py-12">
      <TypographyH2 className="mb-6">Add task</TypographyH2>
      <TodoForm formInfo={data} mode="insert" />
    </section>
  );
}
