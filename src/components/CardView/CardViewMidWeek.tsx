import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  HoverCardContent,
  HoverCard,
  HoverCardTrigger,
} from "../ui/hover-card";
import {
  Designations,
  setThemeColor,
} from "@/app/main/(dashboard)/components/Meetingype";

export function CardViewDesigantionsMidWeek() {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Programa da Designações</CardTitle>
        <CardDescription>
          Programa da Designações da semana 10 A 16 DE FEVEREIRO
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {Designations.map((data, i) => (
          <ul key={data.name} className="list-disc">
            <li
              className={`inline-flex items-center rounded-full px-2 py-1 text-lg ${setThemeColor(
                i
              )}`}
            >
              {data.name}
            </li>

            <div className="space-y-3">
              {data.designation.map((e) => (
                <ul key={e.name} className="list-disc list-inside space-y-2">
                  <HoverCard>
                    <HoverCardTrigger>
                      <div className="font-semibold">{e.name}</div>
                    </HoverCardTrigger>
                    <HoverCardContent>
                      <div className="flex flex-col p-4 bg-background/50 backdrop-blur">
                        <h3 className="text-sm text-muted-foreground">
                          {e.name}
                        </h3>
                        {e.brother.map((bro) => (
                          <p key={"name" in bro ? bro.name : bro.morador}>
                            O dono da designação é o irmão {" "}
                            {"name" in bro
                              ? ` ${bro.name}`
                              : `${bro.morador} | ${bro.publicador}`}
                          </p>
                        ))}
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                  {e.brother.map((bro, index) => (
                    <li key={index} className="text-xs">
                      {"name" in bro
                        ? `${bro.role}: ${bro.name}`
                        : `${bro.morador} | ${bro.publicador}`}
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </ul>
        ))}
      </CardContent>
    </Card>
  );
}
