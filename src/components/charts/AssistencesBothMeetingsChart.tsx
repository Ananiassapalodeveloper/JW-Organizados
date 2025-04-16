/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import * as React from "react";
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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { AlertCircle, Loader, TrendingUp } from "lucide-react";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useFetch } from "@/hooks/useFetch";
import { DataAssistencia } from "./WeekDesignationsCharts";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Skeleton } from "../ui/skeleton";
import { format } from "date-fns";
import { Badge } from "../ui/badge";
import { formatDateRange, formatDateRangeLong, formatDateRangeSimple } from "@/lib/formatDateRange";

const chartConfig = {
  visitors: {
    label: "Assistência",
  },
  desktop: {
    label: "Reunião do meio de semana",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Reunião do fim de semana",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const YEAR = new Date().getFullYear();
const MONTH = new Date().getMonth() + 1;

export function AssistencesBothMeetingsChart() {
  const {
    data: designations,
    error,
    isLoading,
  } = useFetch<DataAssistencia>(`/mes/getByMonthYear/${MONTH}/${YEAR}`);

  //  Loading and error states

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
          <Skeleton className="w-96 h-80" />
        </CardContent>
      </Card>
    );
  }
  if (!designations?.ReunioesDates || designations.ReunioesDates.length === 0)
    <p>Sem dados</p>;

  // Transforma os dados para o formato que o gráfico entende

  const Data = designations?.ReunioesDates.map((item) => {
    const meioDeSemana = item.Assistencia.find((a) => a.name === "fimDeSemana");
    const fimDeSemana = item.Assistencia.find((a) => a.name === "meioDeSemana");

    const DateAssistenceMeioDeSemana = {
      ...meioDeSemana?.ReunioesDates,
      from: format(
        meioDeSemana?.ReunioesDates.from ?? new Date(),
        "dd/MM/yyyy"
      ),
      to: format(meioDeSemana?.ReunioesDates.to ?? new Date(), "dd/MM/yyyy"),
    };

    return {
      date: `${DateAssistenceMeioDeSemana.from}.${DateAssistenceMeioDeSemana.to}`,
      desktop: Number(meioDeSemana?.quantidade),
      mobile: Number(fimDeSemana?.quantidade),
    };
  });

  return (
    <Card className="col-span-4">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>
            Assistências mensais
          </CardTitle>
          <CardDescription>
            Mostrar total de assistência do mês de{" "}
            <Badge variant={"secondary"} className="rounded-full">
              {designations?.descricao}
            </Badge>
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={Data}>
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-desktop)"
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
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const Date = value.split(".");
                return formatDateRange(Date[0], Date[1]);
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    const Date = value.split(".");
                    return formatDateRangeLong(Date[0], Date[1], {
                      showMonthAsText: true,
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="mobile"
              type="natural"
              fill="url(#fillMobile)"
              stroke="var(--color-mobile)"
              stackId="a"
            />
            <Area
              dataKey="desktop"
              type="natural"
              fill="url(#fillDesktop)"
              stroke="var(--color-desktop)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
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
