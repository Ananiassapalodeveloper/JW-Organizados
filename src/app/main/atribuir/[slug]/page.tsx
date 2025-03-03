import { Metadata } from "next";
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
import {
  Circle,
  CircleCheck,
  CircleCheckIcon,
  CircleXIcon,
  LampDeskIcon,
  ListCheck,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PresidentEndPraying } from "@/app/main/(dashboard)/components/CardsDesignations/LifeMinistry/PresidentEndPraying";
import { Speeching } from "@/app/main/(dashboard)/components/CardsDesignations/LifeMinistry/Speeching";
import { SpirutalDiamond } from "@/app/main/(dashboard)/components/CardsDesignations/LifeMinistry/SpiritualDiamond";
import { ReadingBible } from "@/app/main/(dashboard)/components/CardsDesignations/LifeMinistry/ReadingBible";
import { StartingTalking1 } from "@/app/main/(dashboard)/components/CardsDesignations/LifeMinistry/StartingTalking1";
import { StartingTalking2 } from "@/app/main/(dashboard)/components/CardsDesignations/LifeMinistry/StartingTalking2";
import { StudentSpeeching } from "@/app/main/(dashboard)/components/CardsDesignations/LifeMinistry/StudentSpeeching";
import { FirstPart } from "@/app/main/(dashboard)/components/CardsDesignations/LifeMinistry/FirstPart";
import { StudingBibleBook } from "@/app/main/(dashboard)/components/CardsDesignations/LifeMinistry/StudingBibleBook";
import { FinalPart } from "@/app/main/(dashboard)/components/CardsDesignations/LifeMinistry/FinalPraying";
import { President } from "@/app/main/(dashboard)/components/CardsDesignations/WatchTowerSpeeching/President";
import { InicialPrayer } from "@/app/main/(dashboard)/components/CardsDesignations/WatchTowerSpeeching/InicialPrayer";
import { Orador } from "@/app/main/(dashboard)/components/CardsDesignations/WatchTowerSpeeching/Orador";
import { WatchTowerLead } from "@/app/main/(dashboard)/components/CardsDesignations/WatchTowerSpeeching/WatchTowerLead";
import { ReaderWatchTower } from "@/app/main/(dashboard)/components/CardsDesignations/WatchTowerSpeeching/ReaderWatchTower";
import { FinalPrayer } from "@/app/main/(dashboard)/components/CardsDesignations/WatchTowerSpeeching/FinalPrayer";
import { setThemeColor } from "@/store/original-file";
import { Designations1 } from "../../(dashboard)/components/Meetingype";
import { changeColorStatus } from "../page";
import Link from "next/link";
// import { CalendarDateRangePicker } from "../../(dashboard)/components/date-range-picker";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Desiganações",
  description: "Registar Designações",
};

const AllDesignations = [
  {
    month: "3-9.02.2025",
    value: "jan",
    icon: CircleCheckIcon,
    status: "concluido",
    completed: "preenchida",
  },
  {
    month: "10-16.02.2025",
    value: "fer",
    icon: CircleCheckIcon,
    status: "concluido",
    completed: "preenchida",
  },
  {
    month: "17-23.02.2025",
    value: "mar",
    status: "decorrendo",
    icon: Circle,
    completed: "preenchida",
  },
  {
    month: "24.02 á 03.03.2025",
    value: "abr",
    status: "naoInicializado",
    completed: "preenchida",
    icon: Circle,
  },
];

export default function DashboardPage({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <>
      <div className="space-y-16 mt-10">
        <div className="text-lg text-white/80 bg-green-400/10 p-1 rounded-lg">
          <LampDeskIcon /> Eis as Designações - {params.slug}, 2025
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 hidden">
          {AllDesignations.map((data) => (
            <Link
              href={`/main/registar/${data.month}`}
              key={data.value}
              className="h-full"
            >
              <Card className="h-full">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {data.completed}
                  </CardTitle>
                  <data.icon className={changeColorStatus(data.status)} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{data.month}</div>
                  <p className="text-xs text-muted-foreground">{data.status}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        <Tabs
          defaultValue="3-9.02.2025"
          className="space-y-4"
          orientation="vertical"
        >
          <TabsList className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {AllDesignations.map((data) => (
              <TabsTrigger
                value={data.month}
                key={data.value}
                className="gap-2 items-center"
              >
                <data.icon
                  className={cn(changeColorStatus(data.status), "size-5")}
                />
                {data.month}
              </TabsTrigger>
            ))}
          </TabsList>
          {AllDesignations.map((data) => (
            <TabsContent
              key={data.month}
              value={data.month}
              className="space-y-4"
            >
              <Data data={{ data: data.month }} />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </>
  );
}

export function Data({ data }: { data: { data: string } }) {
  return (
    <main >
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

        <TabsContent value="meetingWeekday" className="space-y-6">
          <div className="rounded-full">
            <div className="my-10 flex gap-2 items-center bg-green-500/10 text-white p-2">
              <ListCheck /> Programa da Designações da semana {data.data}
              {/* <CalendarDateRangePicker /> */}
            </div>
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
                  <span
                    className={`p-2 rounded-lg text-sm ${setThemeColor(0)}`}
                  >
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
        </TabsContent>
        <TabsContent value="meetingWeekend" className="space-y-4">
          <div className="rounded-full">
            <h1 className=" my-10 flex gap-2 items-center bg-green-500/10 text-white p-2">
              <ListCheck /> Programa da Designações da semana {data.data}
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
                      <ul key={e.name} className="list-disc list-inside">
                        <HoverCard>
                          {e.brother.map((data, index) => {
                            return (
                              <HoverCardTrigger key={index}>
                                <li>{"name" in data && data.name}</li>
                              </HoverCardTrigger>
                            );
                          })}
                          <HoverCardContent>
                            <div className="flex flex-col p-4 bg-background/50 backdrop-blur">
                              <div className="flex items-start mb-4">
                                <h3 className="text-sm text-muted-foreground">
                                {"name" in data && data.name}
                                </h3>
                              </div>
                              <div className="flex flex-col">
                                <div>
                                  <p className="text-lg font-bold">
                                    Lição 3 Ame As Pessoas
                                  </p>
                                  <div className="flex justify-between gap-1 mt-1">
                                    <span
                                      className={`p-2 rounded-lg text-sm ${
                                        i % 2 === 0
                                          ? "text-green-900"
                                          : "text-red-500"
                                      }`}
                                    >
                                      {i % 2 === 0 ? (
                                        <span className="ftext-base p-2 rounded-lg lex items-center justify-between gap-2">
                                          <CircleCheck fill="green" />{" "}
                                          Preenchido{" "}
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
    </main>
  );
}
