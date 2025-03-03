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
import { ListCheck } from "lucide-react";
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

export const Designations = [
  {
    name: "Partes Inicias",
    designation: [
      {
        name: "Presidente & oração inicial",
        brother: [
          {
            role: "dono",
            name: "Milton António",
          },
          {
            role: "suplente",
            name: "André Vinho",
          },
        ],
      },
    ],
  },

  {
    name: "TESOUROS DA PALAVRA DE DEUS",
    designation: [
      {
        name: "Discursos",
        brother: [
          {
            role: "dono",
            name: "Milton António",
          },
          {
            role: "suplente",
            name: "André Vinho",
          },
        ],
      },
      {
        name: "Pérolas espirituais",
        brother: [
          {
            role: "dono",
            name: "André Vinho",
          },
          {
            role: "suplente",
            name: "Valentin Quiluluta",
          },
        ],
      },
      {
        name: "Leitura da bíblia",
        brother: [
          {
            role: "dono",
            name: "Manuel Tomás",
          },
          {
            role: "suplente",
            name: "Carlos Ernesto",
          },
        ],
      },
    ],
  },

  {
    name: "EMPENHE-SE NO MINISTÉRIO",
    designation: [
      {
        name: "Iniciar conversas",
        brother: [
          {
            morador: "Carlos Ernesto",
            publicador: "Milton António",
          },
        ],
      },
      {
        name: "Iniciar conversas",
        brother: [
          {
            morador: "Abel Gonga",
            publicador: "Teodoro upale",
          },
        ],
      },
      {
        name: "Discurso",
        brother: [
          {
            role: "dono",
            name: "Gradel Sanda",
          },
          {
            role: "suplente",
            name: "Fernando Joaquim",
          },
        ],
      },
    ],
  },

  {
    name: "VIVER COMO CRISTÃOS",
    designation: [
      {
        name: "1º parte - Relatório anual de serviço",
        brother: [
          {
            role: "dono",
            name: "Milton António",
          },
          {
            role: "suplente",
            name: "André Vinho",
          },
        ],
      },
      {
        name: "Estudo bíblico de congregação",
        brother: [
          {
            role: "dono",
            name: "Milton António",
          },
          {
            role: "suplente",
            name: "André Vinho",
          },
        ],
      },
    ],
  },

  {
    name: "Partes finais",
    designation: [
      {
        name: "Oração",
        brother: [
          {
            role: "dono",
            name: "Milton António",
          },
          {
            role: "suplente",
            name: "André Vinho",
          },
        ],
      },
    ],
  },
] as const;

export const Designations1 = [
  {
    name: "Reunião Pública",
    designation: [
      {
        name: "Presidente",
        brother: [
          {
            role: "dono",
            name: "Milton António",
          },
          {
            role: "suplente",
            name: "André Vinho",
          },
        ],
      },
      {
        name: "Oração Inicial",
        brother: [
          {
            role: "dono",
            name: "Ananias Tomás",
          },
          {
            role: "suplente",
            name: "Abel Gonga",
          },
        ],
      },
      {
        name: "Orador",
        brother: [
          {
            role: "dono",
            name: "Teodoro Upale",
          },
          {
            role: "suplente",
            name: "Carlos Ernesto",
          },
        ],
      },
    ],
  },
  {
    name: "Estudo de A Sentinela",
    designation: [
      {
        name: "dirigente",
        brother: [
          {
            role: "dono",
            name: "Ernesto Nhanga",
          },
          {
            role: "suplente",
            name: "Valentin Quiluluta",
          },
        ],
      },
      {
        name: "Leitor",
        brother: [
          {
            role: "dono",
            name: "Vitoriano Mateus",
          },
          {
            role: "suplente",
            name: "Ngunza Dala",
          },
        ],
      },
      {
        name: "Oração Final",
        brother: [
          {
            role: "dono",
            name: "Valter Macoxi",
          },
          {
            role: "suplente",
            name: "Eduardo Macoxi",
          },
        ],
      },
    ],
  },
] as const;

export function setThemeColor(index: number): string {
  const color = [
    "bg-[#22c55e]/10 text-[#22c55e] ",
    "bg-[#61c7ca]/10 text-[#61c7ca]",
    "bg-[#e7d52d]/10 text-[#e7d52d]",
    " bg-[#f15151]/10 text-[#f15151]",
  ];
  return color[index % color.length];
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
                    <ul key={e.name} className="list-disc list-inside">
                      <HoverCard>
                        <HoverCardTrigger>
                          <li>{e.name}</li>
                        </HoverCardTrigger>
                        <HoverCardContent>
                          <div className="flex flex-col p-4 bg-background/50 backdrop-blur">
                            <div className="flex items-start mb-4">
                              <h3 className="text-sm text-muted-foreground">
                                {e.name}
                              </h3>
                            </div>
                            <div className="flex flex-col">
                              <div>
                                <p className="text-lg font-bold">
                                  Lição 3 Ame As Pessoas
                                </p>
                                <div className="flex justify-between gap-1 mt-1"></div>
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

                  {data.designation.map((e) => (
                    <ul key={e.name} className="list-disc list-inside">
                      <HoverCard>
                        <HoverCardTrigger>
                          <li>{e.name}</li>
                        </HoverCardTrigger>
                        <HoverCardContent>
                          <div className="flex flex-col p-4 bg-background/50 backdrop-blur">
                            <div className="flex items-start mb-4">
                              <h3 className="text-sm text-muted-foreground">
                                {e.name}
                              </h3>
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
