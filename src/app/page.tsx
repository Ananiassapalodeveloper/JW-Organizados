import { CardViewDesigantionsMidWeek } from "@/components/CardView/CardViewMidWeek";
import { CardViewDesigantionsWeekend } from "@/components/CardView/CardViewWeekend";
import Header from "@/components/header";

// import ComoComecar from "./ComoComecar"
export default function Page() {
  return (
    <>
      <Header />
      <main className="container space-y-10 mt-[84px]">
        {/* Reuniões */}
        <section className="space-y-3 mt-10">
          <h1>Reuniões da semana</h1>
          <h2>Reunião do meio de semana</h2>
          <CardViewDesigantionsMidWeek />
        </section>
        <section className="space-y-3">
          <h2>Reunião do fim de semana</h2>
          <CardViewDesigantionsWeekend />
        </section>

        <section></section>
      </main>
    </>
  );
}
