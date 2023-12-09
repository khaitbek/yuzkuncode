import { getChartInfo } from "~/utils/api";
import { Chart } from "../ui/chart";
import { TypographyH2 } from "../ui/typography";
import CardInfoGrid from "./card-info-grid";
import { DatePickerWithRange } from "./date-picker";

export function Dashboard() {
  return (
    <section className="h-[60vh] rounded-lg border pb-12">
      <div className="container h-full">
        <header className="flex items-center justify-between gap-6 py-6">
          <TypographyH2>Dashboard</TypographyH2>
          <DatePickerWithRange />
        </header>
        <CardInfoGrid />
        <DashboardChart />
      </div>
    </section>
  );
}
async function DashboardChart() {
  const chartInfo = await getChartInfo();
  const data = chartInfo.map((d) => ({ ...d, date: new Date(d.createdAt) }));
  return (
    <section className="h-full max-h-60 pt-6">
      <Chart data={data} />
    </section>
  );
}
