"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

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

const chartData = [
  { date: "3-9.02.2025", desktop: 186},
  { date: "10-16.02.2025", desktop: 305 },
  { date: "17-23.02.2025", desktop: 237 },
  { date: "24.02 á 03.03.2025", desktop: 73 },
]


const chartConfig = {
  desktop: {
    label: "Assistência",
    color: "hsl(var(--chart-1))",
  },
  // mobile: {
  //   label: "Mobile",
  //   color: "hsl(var(--chart-2))",
  // },
} satisfies ChartConfig

export function Component() {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Gráfico de barra Semana de Janeiro</CardTitle>
        <CardDescription>Janeiro de 2024</CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <ChartContainer className="aspect-auto h-[250px] w-full" config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              // tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
            {/* <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} /> */}
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Subiu 5.2% neste mês em relação ao mês anterior <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Mostrar total de assistência do mês de Janeiro
        </div>
      </CardFooter>
    </Card>
  )
}
