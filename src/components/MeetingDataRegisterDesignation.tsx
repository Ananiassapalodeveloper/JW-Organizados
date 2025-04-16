/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { lazy, useState } from "react";
import { ListChecksIcon as ListCheck, Calendar, Activity } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { PresidentEndPraying } from "@/components/CardsDesignations/LifeMinistry/PresidentEndPraying";
import { Tesouros } from "@/components/CardsDesignations/LifeMinistry/Tesouros";
import { MinisterioPage } from "@/components/CardsDesignations/LifeMinistry/Ministerios";
import { CristaoPage } from "@/components/CardsDesignations/LifeMinistry/Cristaos";
import { FinalParts } from "@/components/CardsDesignations/LifeMinistry/FinalPraying";
import { WatchTowerLead } from "@/components/CardsDesignations/WatchTowerSpeeching/WatchTowerLead";
import { ReuniaoPublica } from "@/components/CardsDesignations/WatchTowerSpeeching/ReuniaoPublica";
import { SetThemeColor } from "@/lib/color";

import { cn } from "@/lib/utils";
import { Indicadores } from "@/components/CardsDesignations/ExtraActivity/Indicadores";
import { AssistenciaPage } from "@/components/CardsDesignations/ExtraActivity/Assistencia";
import { ArrumacaoPage } from "@/components/CardsDesignations/ExtraActivity/Arrumacao";
import { WeekDesignationsCharts } from "./charts/WeekDesignationsCharts";


type MeetingDataRegisterDesignationType = {
  id?: string;
  params?: { id?: string };
  mesId?:string
};

export function MeetingDataRegisterDesignation({
  params,
  id,
  mesId
}: MeetingDataRegisterDesignationType) {
  const [activeTab, setActiveTab] = useState("meetingWeekday");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-2">
        <Button
          variant={activeTab === "meetingWeekday" ? "default" : "outline"}
          className="flex-1 justify-start gap-2"
          onClick={() => setActiveTab("meetingWeekday")}
        >
          <Calendar className="h-4 w-4" />
          Reunião do meio de semana
        </Button>
        <Button
          variant={activeTab === "meetingWeekend" ? "default" : "outline"}
          className="flex-1 justify-start gap-2"
          onClick={() => setActiveTab("meetingWeekend")}
        >
          <Calendar className="h-4 w-4" />
          Reunião do final de semana
        </Button>
        <Button
          variant={activeTab === "extraActivity" ? "default" : "outline"}
          className="flex-1 justify-start gap-2"
          onClick={() => setActiveTab("extraActivity")}
        >
          <Activity className="h-4 w-4" />
          Designações extras
        </Button>
      </div>

      <div className="rounded-lg border bg-card shadow-sm space-y-4">
        <div className="flex items-center gap-2 p-4 border-b">
          <ListCheck className="h-5 w-5 text-primary" />
          <h2 className="font-medium">Programa da semana {params?.id}</h2>
        </div>

        {activeTab === "meetingWeekday" && (
          <div className="p-4 space-y-4">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-0">
                <AccordionTrigger className="py-4">
                  <Badge
                    variant="outline"
                    className={cn("px-3 py-1", SetThemeColor(0))}
                  >
                    PARTES INICIAS
                  </Badge>
                </AccordionTrigger>
                <AccordionContent className="pt-2 pb-4">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <PresidentEndPraying params={{ id }} />
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-1">
                <AccordionTrigger className="py-4">
                  <Badge
                    variant="outline"
                    className={cn("px-3 py-1", SetThemeColor(1))}
                  >
                    TESOUROS DA PALAVRA DE DEUS
                  </Badge>
                </AccordionTrigger>
                <AccordionContent className="pt-2 pb-4">
                  <div className="grid gap-4">
                    <Tesouros params={{ id }} />
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="py-4">
                  <Badge
                    variant="outline"
                    className={cn("px-3 py-1", SetThemeColor(2))}
                  >
                    EMPENHE-SE NO MINISTÉRIO
                  </Badge>
                </AccordionTrigger>
                <AccordionContent className="pt-2 pb-4">
                  <div className="grid gap-4">
                    <MinisterioPage params={{ id }} />
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="py-4">
                  <Badge
                    variant="outline"
                    className={cn("px-3 py-1", SetThemeColor(3))}
                  >
                    VIVER COMO CRISTÃOS
                  </Badge>
                </AccordionTrigger>
                <AccordionContent className="pt-2 pb-4">
                  <div className="grid gap-4">
                    <CristaoPage params={{ id }} />
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger className="py-4">
                  <Badge
                    variant="outline"
                    className={cn("px-3 py-1", SetThemeColor(0))}
                  >
                    PARTES FINAIS
                  </Badge>
                </AccordionTrigger>
                <AccordionContent className="pt-2 pb-4">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <FinalParts params={{ id }} />
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger className="py-4">
                  <Badge
                    variant="outline"
                    className={cn("px-3 py-1 uppercase", SetThemeColor(0))}
                  >
                    Assistência do meio de semana
                  </Badge>
                </AccordionTrigger>
                <AccordionContent className="pt-2 pb-4">
                  <div className="grid gap-4">
                    <AssistenciaPage
                      params={{ id, MeettingName: "meioDeSemana" }}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            {mesId && (<WeekDesignationsCharts
              params={{ id: mesId, name: "meioDeSemana" }}
            />)}
          </div>
        )}

        {activeTab === "meetingWeekend" && (
          <div className="p-4 space-y-4">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-0">
                <AccordionTrigger className="py-4">
                  <Badge
                    variant="outline"
                    className={cn("px-3 py-1", SetThemeColor(0))}
                  >
                    REUNIÃO PÚBLICA
                  </Badge>
                </AccordionTrigger>
                <AccordionContent className="pt-2 pb-4">
                  <div className="grid gap-4">
                    <ReuniaoPublica params={{ id }} />
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-1">
                <AccordionTrigger className="py-4">
                  <Badge
                    variant="outline"
                    className={cn("px-3 py-1", SetThemeColor(1))}
                  >
                    ESTUDO DE A SENTINELA
                  </Badge>
                </AccordionTrigger>
                <AccordionContent className="pt-2 pb-4">
                  <div className="grid gap-4">
                    <WatchTowerLead params={{ id }} />
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="py-4">
                  <Badge
                    variant="outline"
                    className={cn("px-3 py-1 uppercase", SetThemeColor(0))}
                  >
                    Assistência de fim de semana
                  </Badge>
                </AccordionTrigger>
                <AccordionContent className="pt-2 pb-4">
                  <div className="grid gap-4">
                    <AssistenciaPage
                      params={{ id, MeettingName: "fimDeSemana" }}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
           {mesId && (<WeekDesignationsCharts
              params={{ id: mesId, name: "fimDeSemana" }}
            />)}
          </div>
        )}

        {activeTab === "extraActivity" && (
          <div className="p-4">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="py-4 space-x-2">
                  <Badge
                    variant="outline"
                    className={cn("px-3 py-1 uppercase", SetThemeColor(1))}
                  >
                    Arrumação
                  </Badge>
                </AccordionTrigger>
                <AccordionContent className="pt-2 pb-4">
                  <div className="grid gap-4">
                    <ArrumacaoPage params={{ id }} />
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="py-4">
                  <Badge
                    variant="outline"
                    className={cn("px-3 py-1 uppercase", SetThemeColor(2))}
                  >
                    Indicador
                  </Badge>
                </AccordionTrigger>
                <AccordionContent className="pt-2 pb-4">
                  <div className="grid gap-4">
                    <Indicadores params={{ id }} />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        )}
      </div>
    </div>
  );
}
