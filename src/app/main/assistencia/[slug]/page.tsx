/* eslint-disable @typescript-eslint/no-unused-vars */
import { Metadata } from "next";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
    Circle,
    CircleCheckIcon,
    LampDeskIcon,
    ListCheck,
} from "lucide-react";

import { AssistenceRegisterCard } from "@/app/main/(dashboard)/components/CardsDesignations/LifeMinistry/AssistenceRegisterCard";

import { cn } from "@/lib/utils";
import { changeColorStatus } from "../../atribuir/page";
import { Accordion,AccordionContent,AccordionItem,AccordionTrigger } from "@/components/ui/accordion";
import { AssiatenceMonths } from "@/components/charts/AssiatenceMonths";
import {Component } from "@/components/charts/diferences2";

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
            <div className="mt-10">
                <div className="text-lg text-white/80 bg-green-400/10 p-1 rounded-lg mb-4">
                    <LampDeskIcon /> Eis as Reuniões de - {params.slug}, 2025
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
                                <data.icon className={cn(changeColorStatus(data.status), "size-5")} />{data.month}
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
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-0">
                        <AccordionTrigger>Ver Assistência do mês de {params.slug} </AccordionTrigger>
                        <AccordionContent >
                            <Component/>
                            {/* <AssiatenceMonths/> */}
                        </AccordionContent>
                    </AccordionItem>

                </Accordion>
            </div>
    );
}

export function Data({ data }: { data: { data: string } }) {
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

            <TabsContent value="meetingWeekday" >
                <div className="rounded-full">
                    <div className="my-6 flex gap-2 items-center bg-green-500/10 text-white p-2">
                        <ListCheck /> Reunião da semana {data.data}
                    </div>
                </div>
                <div>
                    <div className="items-start  gap-6 rounded-lg p-8 md:grid lg:grid-cols-2 xl:grid-cols-3 w-full">
                        <AssistenceRegisterCard />
                    </div>
                </div>
            </TabsContent>

            <TabsContent value="meetingWeekend" >
                <div className="rounded-full">
                    <div className="my-6 flex gap-2 items-center bg-green-500/10 text-white p-2">
                        <ListCheck /> Reunião da semana {data.data}
                    </div>
                </div>
                <div>
                    <div className="items-start  gap-6 rounded-lg p-8 md:grid lg:grid-cols-2 xl:grid-cols-3 w-full">
                        <AssistenceRegisterCard />
                    </div>
                </div>
            </TabsContent>
        </Tabs>
    );
}
