import { MainTabs } from "~/components/main-tabs";
import { TypographyH1 } from "~/components/ui/typography";

export default async function HomePage() {
  return (
    <>
      <section className="py-12">
        <div className="container">
          <TypographyH1 className="mb-6 text-center">Todo List</TypographyH1>
          <MainTabs />
        </div>
      </section>
    </>
  );
}
