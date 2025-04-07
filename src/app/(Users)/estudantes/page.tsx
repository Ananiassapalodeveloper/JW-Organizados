/* eslint-disable @typescript-eslint/no-unused-vars */
import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LampDeskIcon } from "lucide-react";
import {
  SheetFooter,
  SheetClose,
  SheetTrigger,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StudentsInscritionsForm } from "./components/itudentsInscrition";

export const metadata: Metadata = {
  title: "Desiganações",
  description: "Registar Designações",
};

const students = [
  {
    name: "Paulo André",
    dateToStudy: {
      qtd: 2,
      dias: ["Segunda-Feira", "Terça-Feira"],
      diasAlternativo: ["Sexta", "Sábado"],
    },
    book: {
      name: "Seja Feliz para sempre",
      lesson: {
        point: 3,
        number: 4,
      },
    },
    tarefa: [
      {
        date: new Date(),
        tarefa: "Perguntar na congregação o nome de Deus",
        estado: true,
        correctionDate: "12/04/2025 12h:13min",
      },
    ],
  },
  {
    name: "Paula José",
    dateToStudy: {
      qtd: 3,
      dias: ["Segunda-Feira", "Terça-Feira"],
      diasAlternativo: ["Sexta", "Sábado"],
    },
    book: {
      name: "Seja Feliz para sempre",
      lesson: {
        point: 3,
        number: 4,
      },
    },
    tarefa: [
      {
        date: new Date(),
        tarefa: "Perguntar na congregação o nome de Deus",
        estado: true,
        correctionDate: "12/04/2025 12h:13min",
      },
    ],
  },
  {
    name: "Ana Silva",
    dateToStudy: {
      qtd: 3,
      dias: ["Segunda-Feira", "Terça-Feira"],
      diasAlternativo: ["Sexta", "Sábado"],
    },
    tarefa: [
      {
        date: new Date(),
        tarefa: "Perguntar na congregação o nome de Deus",
        estado: true,
        correctionDate: "12/04/2025 12h:13min",
      },
    ],
    book: {
      name: "Seja Feliz para sempre",
      lesson: {
        point: 3,
        number: 4,
      },
    },
  },
  {
    name: "Francisco António",
    dateToStudy: {
      qtd: 3,
      dias: ["Segunda-Feira", "Terça-Feira"],
      diasAlternativo: ["Sexta", "Sábado"],
    },
    tarefa: [
      {
        date: new Date(),
        tarefa: "Perguntar na congregação o nome de Deus",
        estado: true,
        correctionDate: "12/04/2025 12h:13min",
      },
      {
        date: new Date(),
        tarefa: "Perguntar na congregação o nome de Deus",
        estado: true,
        correctionDate: "12/04/2025 12h:13min",
      },
    ],
    book: {
      name: "Seja Feliz para sempre",
      lesson: {
        point: 3,
        number: 4,
      },
    },
  },
  {
    name: "Pedro Gonçalves",
    dateToStudy: {
      qtd: 3,
      dias: ["Segunda-Feira", "Terça-Feira"],
      diasAlternativo: ["Sexta", "Sábado"],
    },
    tarefa: [
      {
        date: new Date(),
        tarefa: "Perguntar na congregação o nome de Deus",
        estado: true,
        correctionDate: "12/04/2025 12h:13min",
      },
    ],
    book: {
      name: "Seja Feliz para sempre",
      lesson: {
        point: 3,
        number: 4,
      },
    },
  },
];

 function changeColorservo(index: number): string {
  const color = [
    "stroke-red-500",
    "stroke-yellow-500",
    "stroke-green-500",
    "stroke-blue-500",
    "stroke-pink-500",
  ];

  return color[color.length % index];
}

export default function DashboardPage() {
  return (
    <div className="space-y-4 mt-[104px]">
      <div className="text-lg text-white/80 bg-green-400/10 p-1 rounded-lg">
        <LampDeskIcon /> Eis Todos os seus estudantes
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 p-4">
        {students.map((data) => (
          <Sheet key={data.name}>
            <SheetTrigger asChild className="cursor-pointer">
              <Card className="h-full" key={data.name}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {data.book.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{data.name}</div>
                  <div className="text-xs text-muted-foreground">
                    ponto:{" "}
                    <span className="p-1 rounded-full size-4 font-semibold bg-emerald-500/10 text-emerald-500">
                      {data.book.lesson.point}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    total de tarefa:{" "}
                    <span className="p-1 rounded-full size-8 font-semibold bg-red-500/10 text-red-500">
                      {data.tarefa.length}
                    </span>
                  </div>
                  <div className="text-xs items-center text-muted-foreground flex flex-row space-x-1 w-full">
                    Programa de estudo:{" "}
                    {data.dateToStudy.dias.map((day) => (
                      <span
                        key={day}
                        className="py-1 px-2 text-[10px] text-center rounded-full  bg-blue-500/10 text-blue-500 h-full"
                      >
                        {day}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </SheetTrigger>
            <SheetContent className="space-y-8">
              <SheetHeader>
                <SheetTitle>{data.name}</SheetTitle>
                <SheetDescription className="flex flex-col space-y-2">
                  <p>Livro de estudo: </p>
                  <p className="text-white bg-white/10 p-1 rounded-2xl">
                    {data.book.name} ponto: {data.book.lesson.point}
                  </p>
                </SheetDescription>
              </SheetHeader>
              <div className="grid flex-1 auto-rows-min gap-6">
                <Tabs defaultValue="t1">
                  <TabsList>
                    <TabsTrigger value="t1">Não corrigidas</TabsTrigger>
                    <TabsTrigger value="t2">Corrigidas</TabsTrigger>
                  </TabsList>
                  <TabsContent value="t1">
                    <div className="grid gap-3">
                      <p className="text-xs">
                        A tarefas deixadas e não corrigidas são:
                      </p>
                      <ul className="list-disc list-inside space-y-2">
                        {data.tarefa.map((helper, index) => (
                          <li
                            className="p-2 rounded-md text-xs bg-green-500/10 text-green-500 rounded-2xl"
                            key={index}
                          >
                            {helper.tarefa}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </TabsContent>
                  <TabsContent value="t2">
                    <div className="grid gap-3">
                      <p className="text-xs">
                        A tarefas deixadas e corrigidas são:
                      </p>
                      <ul className="list-disc list-inside space-y-2">
                        {data.tarefa.map((helper, index) => (
                          <li
                            className="p-2 rounded-md text-xs bg-blue-500/10 text-blue-500 rounded-2xl"
                            key={index}
                          >
                            {helper.tarefa}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
              <div className="space-y-4">
                <p>Dias de estudo</p>
                <ul className="list-inside list-disc flex flex-col space-y-2">
                  {data.dateToStudy.dias.map((day) => (
                    <li key={day} className="text-xs">
                      {day}
                    </li>
                  ))}
                </ul>
                <p>Dias Alternativos</p>
                <ul className="list-inside list-disc flex flex-col space-y-2">
                  {data.dateToStudy.diasAlternativo.map((day) => (
                    <li key={day} className="text-xs">
                      {day}
                    </li>
                  ))}
                </ul>
              </div>
              <SheetFooter>
                <SheetClose asChild>
                  <Button variant="outline">Fechar</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        ))}
      </div>
      {/* Formulário */}
      <div>
        <StudentsInscritionsForm />
      </div>
    </div>
  );
}
