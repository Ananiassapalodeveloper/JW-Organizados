import { Metadata } from "next"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { RecentSales } from "@/app/dashboard/components/recent-sales"
import { BookOpen, Circle, CircleCheckIcon, User2 } from "lucide-react"
import { Component as Diferences } from "@/components/charts/Assistences"
// import { cn } from "@/lib/utils"
import { MeetingTypePage } from "./components/Meetingype"

export const metadata: Metadata = {
  title: "Visão geral",
  description: "Visão geral da congregação praça Nova 3",
}

const DataAnciao = [
  {
    designationName: "Presidente & oração inicial",
    icon: Circle,
    name: "Milton António",
    qtds: 10
  },
  {
    designationName: "Discurso de 10 min",
    icon: User2,
    name: "Abel Ngonga",
    qtds: 12
  },
  {
    designationName: "Estudo bíblico de congregação",
    icon: BookOpen,
    name: "André Vinho",
    qtds: 16
  },
  {
    designationName: "Pérolas espirituias",
    icon: CircleCheckIcon,
    name: "Ernesto Nhanga",
    qtds: 16
  },


  {
    designationName: "Viver como cristão 1º parte",
    icon: CircleCheckIcon,
    name: "Ernesto Nhanga",
    qtds: 16
  },
  {
    designationName: "Viver como cristão 2º parte",
    icon: Circle,
    name: "Milton António",
    qtds: 10
  },

  {
    designationName: "Discurso - Reunião Pública",
    icon: User2,
    name: "Abel Ngonga",
    qtds: 12
  },
  {
    designationName: "Estudo de A Sentinela",
    icon: BookOpen,
    name: "André Vinho",
    qtds: 16
  },

  {
    designationName: "Presidente - Reunião Pública",
    icon: User2,
    name: "Abel Ngonga",
    qtds: 12
  },
  {
    designationName: "Orador - Reunião Pública",
    icon: BookOpen,
    name: "André Vinho",
    qtds: 16
  },

]

// function DemoContainer({
//   className,
//   ...props
// }: React.HTMLAttributes<HTMLDivElement>) {
//   return (
//     <div
//       className={cn(
//         "flex items-center justify-center w-full ",
//         className
//       )}
//       {...props}
//     />
//   )
// }


export default function DashboardPage() {
  return (
    <Tabs defaultValue="overview" className="space-y-4" orientation="vertical">
      <TabsList >
        <TabsTrigger value="overview">Visão Geral</TabsTrigger>
        <TabsTrigger value="des1">
          Reunião da semana
        </TabsTrigger>
        <TabsTrigger value="des2">
          Histórico
        </TabsTrigger>

      </TabsList>
      <TabsContent value="overview" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {DataAnciao.map((data) => (
            <Card key={data.name}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {data.designationName}
                </CardTitle>
                <data.icon />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data.name}</div>
                <p className="text-xs text-muted-foreground">
                  {data.qtds} vezes desde primeiro mês
                </p>
              </CardContent>
            </Card>
          ))
          }
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Diferences />
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Designações</CardTitle>
              <CardDescription>
                Algumas Designações dos estudantes da semana
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RecentSales />
            </CardContent>
          </Card>
        </div>
      </TabsContent>
      <TabsContent value="des1" className="space-y-4">
        <MeetingTypePage />
      </TabsContent>
    </Tabs>
  )
}
