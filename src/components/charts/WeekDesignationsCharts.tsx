/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { AlertCircle, Loader, TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import React, { useMemo } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { useFetch } from "@/hooks/useFetch";
import { format } from "date-fns";
import { formatDateRange, formatDateRangeLong } from "@/lib/formatDateRange";
import { Badge } from "../ui/badge";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { PresidentEndPrayingSkeleton } from "../PresidentEndPrayingSkeleton";
import { Skeleton } from "../ui/skeleton";

const chartConfig = {
  value: {
    label: "Assistência",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

type params = {
  id?: string;
  name: "meioDeSemana" | "fimDeSemana";
};

export type DataAssistencia = {
  descricao: string;
  ano: {
    ano: number;
  };
  ReunioesDates: {
    Assistencia: {
      name: "meioDeSemana" | "fimDeSemana";
      quantidade: string;
      ReunioesDates: {
        from: string;
        to: string;
      };
    }[];
  }[];
};

export function WeekDesignationsCharts({
  params: { id, name },
}: {
  params: params;
}) {
  const {
    data: designations,
    error,
    isLoading,
  } = useFetch<DataAssistencia>(`mes/${id}`);

  // Loading and error states
  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Erro</AlertTitle>
        <AlertDescription>
          Não foi possível carregar os dados dos irmãos. Por favor, tente
          novamente.
        </AlertDescription>
      </Alert>
    );
  }

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Loader className="h-4 w-4 mr-2 animate-spin" />
            Carregando o gráfico
          </CardTitle>
          <CardDescription>
            Aguarde enquanto carregamos os dados...
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Skeleton className="w-10 h-6" />
        </CardContent>
      </Card>
    );
  }
  if (!designations?.ReunioesDates || designations.ReunioesDates.length === 0)
    <p>Sem dados</p>;

  // Transforma os dados para o formato que o gráfico entende
  const data = 
      designations?.ReunioesDates.map((item) => {
        const meioDeSemana = item.Assistencia.find((a) => a.name === name);
        const DateAssistence = {
          ...meioDeSemana?.ReunioesDates,
          from: format(
            meioDeSemana?.ReunioesDates.from ?? new Date(),
            "dd/MM/yyyy"
          ),
          to: format(
            meioDeSemana?.ReunioesDates.to ?? new Date(),
            "dd/MM/yyyy"
          ),
        };

        return {
          date: `${formatDateRangeLong(
            DateAssistence?.from ?? "04/03/2025",
            DateAssistence?.to ?? "04/03/2025"
          )}`,
          value: Number(meioDeSemana?.quantidade || 0),
        };
      })
      
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>
          Assistência mensais da Reunião do{" "}
          {name === "fimDeSemana" ? "Fim de semana" : "Meio de semana"}
        </CardTitle>
        <CardDescription>
          Assistência do mês de{" "}
          <Badge className="rounded-full" variant={"secondary"}>
            {designations?.descricao}
          </Badge>
        </CardDescription>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full "
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
              tickFormatter={(value) => value}
            />
            <ChartTooltip cursor={true} content={<ChartTooltipContent />} />
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="blue" stopOpacity={0.8} />
                <stop offset="95%" stopColor="aqua" stopOpacity={0.1} />
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
              {designations?.descricao} - {designations?.ano.ano}
            </div>
          </div>
          <div>
            <Sheet>
              <SheetTrigger>
                <Button>Ver detalhes</Button>
              </SheetTrigger>
              <SheetContent side={"bottom"}>
                <SheetDescription>Aqui há melhor detalhes</SheetDescription>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
