import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Circle, CircleCheckIcon, LampDeskIcon } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Desiganações",
  description: "Registar Designações",
};

const AllDesignations = [
  {
    month: "Janeiro",
    value: "jan",
    icon: CircleCheckIcon,
    status: "concluido",
    completed: "preenchida",
  },
  {
    month: "Fevereiro",
    value: "fer",
    icon: CircleCheckIcon,
    status: "concluido",
    completed: "preenchida",
  },
  {
    month: "Marco",
    value: "mar",
    status: "decorrendo",
    icon: Circle,
    completed: "preenchida",
  },
  {
    month: "Abril",
    value: "abr",
    status: "naoInicializado",
    completed: "preenchida",
    icon: Circle,
  },
  {
    month: "Maio",
    value: "mai",
    status: "naoInicializado",
    completed: "preenchida",
    icon: Circle,
  },
  {
    month: "Junho",
    value: "jun",
    status: "naoInicializado",
    completed: "preenchida",
    icon: Circle,
  },
  {
    month: "Julho",
    value: "jul",
    status: "naoInicializado",
    completed: "preenchida",
    icon: Circle,
  },
  {
    month: "Agosto",
    value: "ago",
    status: "naoInicializado",
    completed: "preenchida",
    icon: Circle,
  },
  {
    month: "Setembro",
    value: "set",
    status: "naoInicializado",
    completed: "preenchida",
    icon: Circle,
  },
  {
    month: "Outubro",
    value: "out",
    status: "naoInicializado",
    completed: "preenchida",
    icon: Circle,
  },
  {
    month: "Novembro",
    value: "nov",
    status: "naoInicializado",
    completed: "preenchida",
    icon: Circle,
  },
  {
    month: "Dezembro",
    value: "dez",
    status: "naoInicializado",
    completed: "preenchida",
    icon: Circle,
  },
];

// const months = [
//   {
//     month: "Janeiro",
//     value: "jan",
//   },
//   {
//     month: "Fevereiro",
//     value: "fer",
//   },
//   {
//     month: "Março",
//     value: "mar",
//   },
//   {
//     month: "Abril",
//     value: "abr",
//   },
//   {
//     month: "Maio",
//     value: "mai",
//   },
//   {
//     month: "Junho",
//     value: "jun",
//   },
//   {
//     month: "Julho",
//     value: "jul",
//   },
//   {
//     month: "Agosto",
//     value: "ago",
//   },
//   {
//     month: "Setembro",
//     value: "set",
//   },
//   {
//     month: "Outubro",
//     value: "out",
//   },
//   {
//     month: "Novembro",
//     value: "nov",
//   },
//   {
//     month: "Dezembro",
//     value: "dez",
//   },
// ];

export function changeColorStatus(status: string): string {
  if (status === "naoInicializado") return "stroke-red-500";
  else if (status === "concluido") return "stroke-green-500";
  else return "stroke-yellow-500";
}

export default function DashboardPage() {
  return (
      <div className="space-y-4 mt-10">
        <div className="text-lg text-white/80 bg-green-400/10 p-1 rounded-lg">
          <LampDeskIcon /> Eis as Designações Anual - 2025
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {AllDesignations.map((data) => (
            <Link
              href={`/main/atribuir/${data.month}`}
              key={data.value}
              className="hover:"
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {data.completed}
                  </CardTitle>
                  <data.icon className={changeColorStatus(data.status)} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{data.month}</div>
                  <p className="text-xs text-muted-foreground">{data.status}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
  );
}
