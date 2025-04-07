// import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Circle, CircleCheckIcon, LampDeskIcon } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// export const metadata: Metadata = {
//   title: "Assistência Visão geral",
//   description: "Visão geral da congregação praça Nova 3",
// };

export function changeColorStatus(status: string): string {
  if (status === "não inicializado") return "stroke-red-500";
  else if (status === "entregue") return "stroke-green-500";
  else return "stroke-yellow-500";
}

const registes = [
  {
    month: "Janeiro",
    value: "jan",
    icon: CircleCheckIcon,
    status: "entregue",
    tempo: "00h:00min",
    studyings: 12,
  },
  {
    month: "Fevereiro",
    value: "fer",
    icon: CircleCheckIcon,
    status: "entregue",
    tempo: "00h:00min",
    studyings: 13,
  },
  {
    month: "Marco",
    value: "mar",
    status: "decorrendo",
    icon: Circle,
    tempo: "00h:00min",
    studyings: 10,
  },
  {
    month: "Abril",
    value: "abr",
    status: "não inicializado",
    tempo: "00h:00min",
    studyings: 0,
    icon: Circle,
  },
  {
    month: "Maio",
    value: "mai",
    status: "não inicializado",
    tempo: "00h:00min",
    studyings: 0,
    icon: Circle,
  },
  {
    month: "Junho",
    value: "jun",
    status: "não inicializado",
    tempo: "00h:00min",
    studyings: 0,
    icon: Circle,
  },
  {
    month: "Julho",
    value: "jul",
    status: "não inicializado",
    tempo: "00h:00min",
    studyings: 0,
    icon: Circle,
  },
  {
    month: "Agosto",
    value: "ago",
    status: "não inicializado",
    tempo: "00h:00min",
    studyings: 0,
    icon: Circle,
  },
  {
    month: "Setembro",
    value: "set",
    status: "não inicializado",
    tempo: "00h:00min",
    studyings: 0,
    icon: Circle,
  },
  {
    month: "Outubro",
    value: "out",
    status: "não inicializado",
    tempo: "00h:00min",
    studyings: 0,
    icon: Circle,
  },
  {
    month: "Novembro",
    value: "nov",
    status: "não inicializado",
    tempo: "00h:00min",
    studyings: 0,
    icon: Circle,
  },
  {
    month: "Dezembro",
    value: "dez",
    status: "não inicializado",
    tempo: "00h:00min",
    studyings: 0,
    icon: Circle,
  },
];
export default function AssistenciaPage() {
  return (
    <main className="mt-[112px]">
      <div className="space-y-4 mt-10">
        <div className="text-lg text-white/80 bg-green-400/10 p-1 rounded-lg">
          <LampDeskIcon /> Eis os seus relatórios mensais - 2025
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {registes.map((data) => (
            <Dialog key={data.value}>
              <DialogTrigger className="bg-green-500">
                <Card key={data.value}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {data.studyings} dirigido(s)
                    </CardTitle>
                    <data.icon className={changeColorStatus(data.status)} />
                  </CardHeader>
                  <CardContent className="space-y-1">
                    <div className="text-2xl font-bold">{data.month}</div>
                    <p className="text-xs text-muted-foreground">
                      {data.status}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {data.studyings}h
                    </p>
                  </CardContent>
                </Card>
              </DialogTrigger>
              <DialogContent className="space-y-4">
                <DialogHeader>
                  <DialogTitle>Relatório</DialogTitle>
                </DialogHeader>
                <form action="" className="space-y-2">
                  <div className="grid gap-4">
                    <Label htmlFor="assistence">Define o número de hora</Label>
                    <Input
                      type="number"
                      name=""
                      id="assistence"
                      placeholder="Define de hora..."
                    />
                  </div>
                  <div className="grid gap-4">
                    <Label htmlFor="assistence">Define o número de estudo dirigido</Label>
                    <Input
                      type="number"
                      name=""
                      id="assistence"
                      placeholder="Define o número de estudo dirigido..."
                    />
                  </div>
                </form>
                <DialogFooter>
                  <Button>Registar</Button>
                  <DialogClose asChild>
                    <Button variant={"outline"}>Cancelar</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </main>
  );
}
