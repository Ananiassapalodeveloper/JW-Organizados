import { CalendarRange } from "lucide-react"

import { MidWeekDesignationCard } from "@/components/meeting-cards/mid-week-card"
import { WeekendDesignationCard } from "@/components/meeting-cards/weekend-card"
import Header from "@/components/header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"

export default function DesignacoesPage() {
  // You could fetch the current week range dynamically
  const currentWeekRange = "10 A 16 DE FEVEREIRO"

  return (
    <>
      <Header />
      <main className="container py-10 space-y-8 mt-[84px]">
        {/* Page Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Designações</h1>
          <p className="text-muted-foreground">Visualize as designações das reuniões da semana</p>
        </div>

        {/* Current Week Banner */}
        <Card className="bg-muted/50">
          <CardContent className="flex items-center gap-3 py-3">
            <CalendarRange className="h-5 w-5 text-primary" />
            <span className="font-medium">Semana atual: {currentWeekRange}</span>
          </CardContent>
        </Card>

        {/* Meetings Tabs */}
        <Tabs defaultValue="mid-week" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="mid-week">Meio de Semana</TabsTrigger>
            <TabsTrigger value="weekend">Fim de Semana</TabsTrigger>
          </TabsList>

          <TabsContent value="mid-week" className="mt-0">
            <MidWeekDesignationCard weekRange={currentWeekRange} />
          </TabsContent>

          <TabsContent value="weekend" className="mt-0">
            <WeekendDesignationCard weekRange={currentWeekRange} />
          </TabsContent>
        </Tabs>
      </main>
    </>
  )
}

