import { Metadata } from "next"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Diferences } from "@/components/charts/diferences";
import { Component } from "@/components/charts/Assistences"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { changeColorStatus } from "../atribuir/page";
import { Circle, CircleCheckIcon, LampDeskIcon } from "lucide-react";
import Link from "next/link";


export const metadata: Metadata = {
  title: "Assistência Visão geral",
  description: "Visão geral da congregação praça Nova 3",
}


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
export default function AssistenciaPage() {
  return (
    <Tabs defaultValue="overview" className="space-y-4" orientation="vertical">
      <TabsList >
        <TabsTrigger value="overview">Visão Geral</TabsTrigger>
        <TabsTrigger value="des1">
          Reunião do fim de semana
        </TabsTrigger>
        <TabsTrigger value="des2">
          Reunião do meio de semana
        </TabsTrigger>
        <TabsTrigger value="des3">
          Registar Assistência
        </TabsTrigger>


      </TabsList>
      <TabsContent value="overview" className="space-y-4">
        <Component />
      </TabsContent>
      <TabsContent value="des1" className="space-y-4">
        <Diferences />
      </TabsContent>
      <TabsContent value="des2" className="space-y-4">
        <Diferences />
      </TabsContent>
      <TabsContent value="des3" className="space-y-4">
      <div className="space-y-4 mt-10">
      <div className="text-lg text-white/80 bg-green-400/10 p-1 rounded-lg">
        <LampDeskIcon /> Eis as Reuniões Anuais - 2025
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {AllDesignations.map((data) => (
          <Link
            href={`/main/assistencia/${data.month}`}
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
      </TabsContent>
    </Tabs>
  )
}