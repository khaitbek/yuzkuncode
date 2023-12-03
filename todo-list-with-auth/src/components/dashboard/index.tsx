import { TypographyH2 } from "../ui/typography";
import CardInfoGrid from "./card-info-grid";
import { DatePickerWithRange } from "./date-picker";

export function Dashboard() {
  return (
    <section className="rounded-lg border pb-12">
      <div className="container">
        <header className="flex items-center justify-between gap-6 py-6">
          <TypographyH2>Dashboard</TypographyH2>
          <DatePickerWithRange />
        </header>
        <CardInfoGrid />
      </div>
    </section>
  );
}
