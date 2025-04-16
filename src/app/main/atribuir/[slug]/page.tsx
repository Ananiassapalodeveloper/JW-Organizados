/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Link from "next/link";
import { format } from "date-fns";
import { notFound } from "next/navigation";
import {
  CircleCheck,
  LampDeskIcon,
  Loader,
  CalendarRange,
  Calendar,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

import { CardRegisterReunioesPartes } from "./components/CardRegisterReunioes";
import { parseSlug } from "@/lib/slugUtils";
import { useFetch } from "@/hooks/useFetch";
import { formatDateRangeLong } from "@/lib/formatDateRange";

import { cn } from "@/lib/utils";
import { MeetingDataRegisterDesignation } from "@/components/MeetingDataRegisterDesignation";

type DateTime = {
  id: string;
  from: string;
  to: string;
  mesId: string;
}[];

export default function DashboardPage({
  params,
}: {
  params: { slug: string };
}) {
  const {
    data: datesReunioes,
    error,
    isLoading,
  } = useFetch<DateTime>(`reunioes_date/${parseSlug(params.slug)?.id}`);

  // Format dates before returning
  const formattedReuniaoDates = datesReunioes?.map((reuniao) => ({
    ...reuniao,
    from: format(new Date(reuniao.from), "dd/MM/yyyy"),
    to: format(new Date(reuniao.to), "dd/MM/yyyy"),
  }));

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <div className="flex flex-col items-center gap-2">
          <Loader className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Carregando designações...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-destructive">Erro</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Houve um erro ao carregar as designações. Tente novamente.</p>
            <Button className="mt-4" variant="outline" asChild>
              <Link href="/main">Voltar ao início</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const parsed = parseSlug(params.slug);
  if (!parsed) return notFound();

  const { ano, mes } = parsed;

  return (
    <div className="container mx-auto py-8 max-w-7xl">
      <header className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Designações</h1>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="outline" className="text-sm font-medium">
                {mes}
              </Badge>
              <Badge variant="outline" className="text-sm font-medium">
                {ano}
              </Badge>
            </div>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <CalendarRange className="h-4 w-4" />
                Adicionar período
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <CardRegisterReunioesPartes params={params} />
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex items-center gap-2 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
          <LampDeskIcon className="h-5 w-5 text-emerald-500" />
          <p className="text-sm font-medium">
            Designações disponíveis para {mes}, {ano}
          </p>
        </div>
      </header>

      {formattedReuniaoDates && formattedReuniaoDates.length > 0 ? (
        <Tabs defaultValue={formattedReuniaoDates[0]?.id} className="space-y-6">
          <div className="bg-card rounded-lg border shadow-sm p-1">
            <TabsList className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 p-1 h-auto">
              {formattedReuniaoDates.map((data, index) => (
                <TabsTrigger
                  key={data.id}
                  value={data.id}
                  className={cn(
                    "flex items-center justify-between py-3 px-4 h-auto",
                    index === 0 && "bg-primary/10"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {/* {data.from}-{data.to} */}
                      {formatDateRangeLong(data.from, data.to, {
                        showMonthAsText: true,
                      })}
                    </span>
                  </div>
                  <CircleCheck
                    className={cn(
                      "h-4 w-4 ml-2",
                      index === 0 ? "text-primary" : "text-muted-foreground"
                    )}
                    fill={index === 0 ? "currentColor" : "none"}
                  />
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {formattedReuniaoDates.map((data) => (
            <TabsContent key={data.id} value={data.id} className="space-y-6">
              <MeetingDataRegisterDesignation
                params={{
                  id: `${formatDateRangeLong(data.from, data.to, {
                    showMonthAsText: true,
                  })}`,
                }}
                id={data.id}
              />
            </TabsContent>
          ))}
        </Tabs>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium mb-2">
              Nenhum período encontrado
            </h3>
            <p className="text-muted-foreground text-center mb-6">
              Não há períodos de reunião registrados para este mês. Adicione um
              novo período para começar.
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button>Adicionar período</Button>
              </DialogTrigger>
              <DialogContent>
                <CardRegisterReunioesPartes params={params} />
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      )}
    </div>
  );
}


