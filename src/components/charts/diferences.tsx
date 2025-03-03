/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import React from "react"
import { Sheet, SheetContent, SheetDescription, SheetTrigger } from "../ui/sheet"
import { Button } from "../ui/button"




const data = [
  { date: "Jan", value: 300 },
  { date: "Fev", value: 350 },
  { date: "Mar", value: 200 },
  { date: "Abr", value: 400 },
  { date: "Mai", value: 300 },
  { date: "Jun", value: 200 },
  { date: "Ago", value: 450 },
  { date: "Set", value: 500 },
  { date: "Out", value: 480 },
  { date: "Nov", value: 400 },
  { date: "Dez", value: 350 }
]

const chartConfig = {
  value: {
    label: "Assistência",
    color: "hsl(var(--chart-1))",
  }
} satisfies ChartConfig



export function Diferences() {

  const [timeRange, setTimeRange] = React.useState("90d");

  const filteredData = data.filter((item) => {
    return item
  });

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Assistência mensais da Reunião do meio de semana</CardTitle>
        <CardDescription>
          Mostra total de assistência semanal, mensal
          <div>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger
                className="w-[160px] rounded-lg sm:ml-auto"
                aria-label="Selecione"
              >
                <SelectValue placeholder="Last 3 months" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="90d" className="rounded-lg">
                  Semanais
                </SelectItem>
                <SelectItem value="30d" className="rounded-lg">
                  Mensais
                </SelectItem>
                <SelectItem value="7d" className="rounded-lg">
                  Últimos 3 meses
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardDescription>

      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig}
        className="aspect-auto h-[250px] w-full"
        >
          <AreaChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={true}
              axisLine={true}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={true} content={<ChartTooltipContent />} />
            <defs>
            <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="blue"
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor="aqua"
                stopOpacity={0.1}
              />
            </linearGradient>
            <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="var(--color-mobile)"
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor="var(--color-mobile)"
                stopOpacity={0.1}
              />
            </linearGradient>
            </defs>
            <Area
              dataKey="value"
              type="natural"
              fill="url(#fillDesktop)"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start justify-between gap-2 gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              A assistência subiu 5.2% este mês{" "}
              <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Janeiro - Junho 2025
            </div>
          </div>
          <div >
            <Sheet >
              <SheetTrigger><Button>Ver detalhes</Button></SheetTrigger>
              <SheetContent side={"bottom"}>
                <SheetDescription>Aqui há melhor detalhes</SheetDescription>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
