"use client";
import { AlertCircle, CalendarDays } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { CurrentWeekBanner } from "./CurrentDate";
import { CristaoView } from "./LifeMinistery/cristaoView";
import { MinisterioView } from "./LifeMinistery/MinisterioView";
import { TesourosView } from "./LifeMinistery/TesourosView";
import { SentinelaView } from "./watchTower/EstudoSentinela";
import { ReuniaoPublicaView } from "./watchTower/ReuniaoPublica";
import { DesignationType } from "@/types/TypeDesiganationView";
import { useFetch } from "@/hooks/useFetch";
import { IndicadoresView } from "./ReuniaoExtra/Indicadores";
import { ArrumacaoView } from "./ReuniaoExtra/ArrumacaoView";
import { AssistenciaView } from "./ReuniaoExtra/AssistenciaView";

export function ViewerActualDesigantion() {
  const {
    data: designations,
    error,
    isLoading,
  } = useFetch<DesignationType>(`reunioes_date`);

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Erro</AlertTitle>
        <AlertDescription>
          Não foi possível carregar os dados das designações. Por favor, tente
          novamente.
        </AlertDescription>
      </Alert>
    );
  }

  if (isLoading) {
    return <p>Carregando...</p>;
  }

  if (!designations) {
    return (
      <Card className={"col-span-3"}>
        <CardHeader>
          <CardTitle>Designação</CardTitle>
          <CardDescription>Nada Registado </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-10 text-muted-foreground">
          <div className="text-center">
            <CalendarDays className="mx-auto h-12 w-12 mb-4 opacity-50" />
            <h3 className="text-lg font-medium mb-2">
              Nenhuma designação disponível
            </h3>
            <p>Não há designações registradas para este período.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      {/* Current Week Banner */}
      <CurrentWeekBanner Date={designations} />
      {/* Meetings Tabs */}
      <Tabs defaultValue="mid-week" className="w-full hidden1">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="mid-week">Meio de Semana</TabsTrigger>
          <TabsTrigger value="weekend">Fim de Semana</TabsTrigger>
        </TabsList>

        {/* Reuniao de semana  */}
        <TabsContent value="mid-week" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Reunião da semana</CardTitle>
              <CardDescription>
                Encontre os irmãos que fará parte como presidente, oração,
                leitor e muito mais...
              </CardDescription>
            </CardHeader>

            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              <TesourosView Date={designations} />
              <MinisterioView Date={designations} />
              <CristaoView Date={designations} />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reunião de fim de semana  */}
        <TabsContent value="weekend" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Reunião do fim de semana</CardTitle>
              <CardDescription>
                Encontre os irmãos que servirão como dirigente, oradores,
                leitores muito mais...
              </CardDescription>
            </CardHeader>

            <CardContent className="grid grid-cols-1 md:grid-cols-2 ">
              <ReuniaoPublicaView Date={designations?.ReuniaoPublica} />
              <SentinelaView Date={designations?.Sentinela} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      {/* Outras designações - Assistência, Arrumação Indicadores  */}
      <Card>
        <CardHeader>
          <CardTitle>Outras Designações</CardTitle>
          <CardDescription>
            Encontre os irmãos que servirão como indicadores, que respectivo
            grupo estará na arrumação, e, por fim, a assistência da congregação
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <IndicadoresView Indicadores={designations.Indicadores} />
          <ArrumacaoView Date={designations.Arrumacao} />
          <AssistenciaView Assistencia={designations.Assistencia} />
        </CardContent>
      </Card>
    </div>
  );
}
