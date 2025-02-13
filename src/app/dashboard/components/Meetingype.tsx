import { Diferences } from "@/components/charts/diferences";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { CircleCheck, CircleXIcon, ListCheck } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PresidentEndPraying } from "./CardsDesignations/LifeMinistry/PresidentEndPraying";
import { Speeching } from "./CardsDesignations/LifeMinistry/Speeching";
import { SpirutalDiamond } from "./CardsDesignations/LifeMinistry/SpiritualDiamond";
import { ReadingBible } from "./CardsDesignations/LifeMinistry/ReadingBible";
import { StartingTalking1 } from "./CardsDesignations/LifeMinistry/StartingTalking1";
import { StartingTalking2 } from "./CardsDesignations/LifeMinistry/StartingTalking2";
import { StudentSpeeching } from "./CardsDesignations/LifeMinistry/StudentSpeeching";
import { FirstPart } from "./CardsDesignations/LifeMinistry/FirstPart";
import { StudingBibleBook } from "./CardsDesignations/LifeMinistry/StudingBibleBook";
import { FinalPart } from "./CardsDesignations/LifeMinistry/FinalPraying";
import { President } from "./CardsDesignations/WatchTowerSpeeching/President";
import { InicialPrayer } from "./CardsDesignations/WatchTowerSpeeching/InicialPrayer";
import { Orador } from "./CardsDesignations/WatchTowerSpeeching/Orador";
import { WatchTowerLead } from "./CardsDesignations/WatchTowerSpeeching/WatchTowerLead";
import { ReaderWatchTower } from "./CardsDesignations/WatchTowerSpeeching/ReaderWatchTower";
import { FinalPrayer } from "./CardsDesignations/WatchTowerSpeeching/FinalPrayer";

const Designations = [
  {
    name: "Partes Inicias",
    designation: ["Presidente & oração inicial"],
  },
  {
    name: "TESOUROS DA PALAVRA DE DEUS",
    designation: ["Discursos", "Pérolas espirituais", "Leitura da bíblia"],
  },
  {
    name: "EMPENHE-SE NO MINISTÉRIO",
    designation: ["Iniciar conversas", "Iniciar conversas", "Discurso"],
  },
  {
    name: "VIVER COMO CRISTÃOS",
    designation: [
      "1º parte - Relatório anual de serviço",
      "Estudo bíblico de congregação",
    ],
  },
  {
    name: "Partes finais",
    designation: ["Oração"],
  },
] as const;

const Designations1 = [
  {
    name: "Reunião Pública",
    designation: ["Presidente", "Oração Inicial", "Orador"],
  },
  {
    name: "Estudo de A Sentinela",
    designation: ["Dirigente", "Leitor", "Oração Final"],
  }
] as const;

export function setThemeColor(index: number) {
  if (index === 1) return "bg-[#61c7ca]/10 text-[#61c7ca]";
  else if (index === 2) return "bg-[#e7d52d]/10 text-[#e7d52d]";
  else if (index === 3) return "bg-[#f15151]/10 text-[#f15151]";
  else return " bg-[#22c55e]/10 text-[#22c55e]";
}

export function MeetingTypePage() {
  return (
    <Tabs
      defaultValue="meetingWeekday"
      className="space-y-4"
      orientation="vertical"
    >
      <TabsList>
        <TabsTrigger value="meetingWeekday">
          Reunião do meio de semana
        </TabsTrigger>
        <TabsTrigger value="meetingWeekend">
          Reunião do final de semana
        </TabsTrigger>
      </TabsList>

      <TabsContent value="meetingWeekday" className="space-y-10">
        <div className="rounded-full">
          <h1 className="text-xl my-10 flex gap-2 items-center bg-green-500/10 text-white p-2">
            <ListCheck /> Programa da Designações da semana 10 A 16 DE FEVEREIRO
          </h1>
        </div>
        <div>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-0">
              <AccordionTrigger>
                <span
                  className={`text-base p-2 rounded-lg ${setThemeColor(0)}`}
                >
                  PARTES INICIAS
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="items-start  gap-6 rounded-lg p-8 md:grid lg:grid-cols-2 xl:grid-cols-3 w-full">
                  <PresidentEndPraying />
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-1">
              <AccordionTrigger>
                <span
                  className={`text-base p-2 rounded-lg ${setThemeColor(1)}`}
                >
                  TESOUROS DA PALAVRA DE DEUS
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="items-start  gap-6 rounded-lg p-8 md:grid lg:grid-cols-2 xl:grid-cols-3 w-full">
                  <Speeching />
                  <SpirutalDiamond />
                  <ReadingBible />
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>
                <span
                  className={`text-base p-2 rounded-lg ${setThemeColor(2)}`}
                >
                  EMPENHE-SE NO MINISTÉRIO
                </span>
              </AccordionTrigger>
              <AccordionContent className="">
                <div className="items-start  gap-6 rounded-lg p-8 md:grid lg:grid-cols-2 xl:grid-cols-3 w-full">
                  <StartingTalking1 />
                  <StartingTalking2 />
                  <StudentSpeeching />
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>
                <span
                  className={`text-base p-2 rounded-lg ${setThemeColor(3)}`}
                >
                  VIVER COMO CRISTÃOS
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <AccordionContent>
                  <div className="items-start  gap-6 rounded-lg p-8 md:grid lg:grid-cols-2 xl:grid-cols-3 w-full">
                    <FirstPart />
                    <StudingBibleBook />
                  </div>
                </AccordionContent>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>
                <span className={`p-2 rounded-lg text-sm ${setThemeColor(0)}`}>
                  PARTES FINAIS
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <AccordionContent>
                  <div className="items-start  gap-6 rounded-lg p-8 md:grid lg:grid-cols-2 xl:grid-cols-3 w-full">
                    <FinalPart />
                  </div>
                </AccordionContent>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Diferences />
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Programa da Designações</CardTitle>
              <CardDescription>
                Programa da Designações da semana 10 A 16 DE FEVEREIRO
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-6 ">
              {Designations.map((data, i) => (
                <ul key={data.name} className="list-disc">
                  <li
                    className={`inline-flex items-center rounded-full px-2 py-1 text-lg ${setThemeColor(
                      i
                    )}`}
                  >
                    {data.name}
                  </li>

                  {data.designation.map((e, i) => (
                    <ul key={e} className="list-disc list-inside">
                      <HoverCard>
                        <HoverCardTrigger>
                          <li>{e}</li>
                        </HoverCardTrigger>
                        <HoverCardContent>
                          <div className="flex flex-col p-4 bg-background/50 backdrop-blur">
                            <div className="flex items-start mb-4">
                              <h3 className="text-sm text-muted-foreground">
                                {e}
                              </h3>
                            </div>
                            <div className="flex flex-col">
                              <div>
                                <p className="text-lg font-bold">
                                  Lição 3 Ame As Pessoas
                                </p>
                                <div className="flex justify-between gap-1 mt-1">
                                  <span
                                    className={`p-2 rounded-lg text-sm ${i % 2 === 0
                                      ? "text-green-900"
                                      : "text-red-500"
                                      }`}
                                  >
                                    {i % 2 === 0 ? (
                                      <span className="ftext-base p-2 rounded-lg lex items-center justify-between gap-2">
                                        <CircleCheck fill="green" /> Preenchido{" "}
                                      </span>
                                    ) : (
                                      <span className="ftext-base p-2 rounded-lg lex items-center justify-between gap-2">
                                        <CircleXIcon fill="red" /> Não
                                        Preenchido{" "}
                                      </span>
                                    )}
                                  </span>
                                </div>
                              </div>
                              {i % 2 === 0 && "Irmão Ananias Tomás"}
                            </div>
                          </div>
                        </HoverCardContent>
                      </HoverCard>
                    </ul>
                  ))}
                </ul>
              ))}
            </CardContent>
          </Card>
        </div>
      </TabsContent>
      <TabsContent value="meetingWeekend" className="space-y-4">
        <div className="rounded-full">
          <h1 className="text-xl my-10 flex gap-2 items-center bg-green-500/10 text-white p-2">
            <ListCheck /> Programa da Designações da semana 10 A 16 DE FEVEREIRO
          </h1>
        </div>
        <div>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-0">
              <AccordionTrigger>
                <span
                  className={`text-base p-2 rounded-lg ${setThemeColor(0)}`}
                >
                  REUNIÃO PÚBLICA
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="items-start  gap-6 rounded-lg p-8 md:grid lg:grid-cols-2 xl:grid-cols-3 w-full">
                  <President />
                  <InicialPrayer />
                  <Orador />
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-1">
              <AccordionTrigger>
                <span
                  className={`text-base p-2 rounded-lg ${setThemeColor(1)}`}
                >
                  ESTUDO DE A SENTINELA
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="items-start  gap-6 rounded-lg p-8 md:grid lg:grid-cols-2 xl:grid-cols-3 w-full">
                  <WatchTowerLead />
                  <ReaderWatchTower />
                  <FinalPrayer />
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Programa da Designações</CardTitle>
              <CardDescription>
                Programa da Designações da semana 10 A 16 DE FEVEREIRO
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-6 ">
              {Designations1.map((data, i) => (
                <ul key={data.name} className="list-disc">
                  <li
                    className={`inline-flex items-center rounded-full px-2 py-1 text-lg ${setThemeColor(
                      i
                    )}`}
                  >
                    {data.name}
                  </li>

                  {data.designation.map((e, i) => (
                    <ul key={e} className="list-disc list-inside">
                      <HoverCard>
                        <HoverCardTrigger>
                          <li>{e}</li>
                        </HoverCardTrigger>
                        <HoverCardContent>
                          <div className="flex flex-col p-4 bg-background/50 backdrop-blur">
                            <div className="flex items-start mb-4">
                              <h3 className="text-sm text-muted-foreground">
                                {e}
                              </h3>
                            </div>
                            <div className="flex flex-col">
                              <div>
                                <p className="text-lg font-bold">
                                  Lição 3 Ame As Pessoas
                                </p>
                                <div className="flex justify-between gap-1 mt-1">
                                  <span
                                    className={`p-2 rounded-lg text-sm ${i % 2 === 0
                                      ? "text-green-900"
                                      : "text-red-500"
                                      }`}
                                  >
                                    {i % 2 === 0 ? (
                                      <span className="ftext-base p-2 rounded-lg lex items-center justify-between gap-2">
                                        <CircleCheck fill="green" /> Preenchido{" "}
                                      </span>
                                    ) : (
                                      <span className="ftext-base p-2 rounded-lg lex items-center justify-between gap-2">
                                        <CircleXIcon fill="red" /> Não
                                        Preenchido{" "}
                                      </span>
                                    )}
                                  </span>
                                </div>
                              </div>
                              {i % 2 === 0 && "Irmão Ananias Tomás"}
                            </div>
                          </div>
                        </HoverCardContent>
                      </HoverCard>
                    </ul>
                  ))}
                </ul>
              ))}
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  );
}
