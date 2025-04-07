import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BookIcon,
  CalculatorIcon,
  LampDeskIcon,
  MapPin,
  MicIcon,
  Wrench,
} from "lucide-react";
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
import { changeColorservo } from "@/lib/color";

export const metadata: Metadata = {
  title: "Desiganações",
  description: "Registar Designações",
};

const Publications = [
  {
    name: "Contas",
    ajudantes: ["Manuel Tomás", "Joaquim Fernandes"],
    icon: CalculatorIcon,
    servo: "Abel Gonga",
  },
  {
    name: "Literatura",
    ajudantes: ["Eduardo Macoxi", "Adão Canda"],
    icon: BookIcon,
    servo: "Abel Gonga",
  },
  {
    name: "Território",
    ajudantes: ["Teodoro Upale"],
    servo: "Gradel Sanda",
    icon: MapPin,
  },
  {
    name: "Som & Áudio",
    ajudantes: ["Gardel Sanda", "Joaquim Fernandes"],
    servo: "Abel Gonga",
    icon: MicIcon,
  },
  {
    name: "Manutenção",
    ajudantes: ["Ngunza Dala", "Leonildo Cabila"],
    servo: "Victoriano Mateus",
    icon: Wrench,
  },
];



export default function DashboardPage() {
  return (
    <div className="space-y-4 mt-[104px]">
      <div className="text-lg text-white/80 bg-green-400/10 p-1 rounded-lg">
        <LampDeskIcon /> Eis Todos os departamentos
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Publications.map((data, index) => (
          <Sheet key={data.name}>
            <SheetTrigger asChild className="cursor-pointer">
              <Card className="h-full" key={data.name}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {data.servo}
                  </CardTitle>
                  <data.icon className={changeColorservo(index)} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{data.name}</div>
                  {data.ajudantes.map((helper) => (
                    <p key={helper} className="text-xs text-muted-foreground">
                      {helper}
                    </p>
                  ))}
                </CardContent>
              </Card>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Departamento de serviço</SheetTitle>
                <SheetDescription>
                  Este departamento é responsável pelas {data.name}
                </SheetDescription>
              </SheetHeader>
              <div className="grid flex-1 auto-rows-min gap-6 p-4">
                <div className="grid gap-3">
                  O servo responsável por este departamento é:
                  <div className="bg-green-500/10 text-green-500 p-1 rounded-md">
                    {data.servo}
                  </div>
                </div>
                <div className="grid gap-3">
                  E os seus respectivos ajudantes são:
                  <ul className="list-disc list-inside space-y-2">
                    {data.ajudantes.map((helper) => (
                      <li
                        className="bg-orange-500/10 text-orange-500 p-1 rounded-md"
                        key={helper}
                      >
                        {helper}
                      </li>
                    ))}
                  </ul>
                </div>
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
    </div>
  );
}
