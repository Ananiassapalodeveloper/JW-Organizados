import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookIcon, CalculatorIcon, LampDeskIcon, MapPin, MicIcon,  Wrench } from "lucide-react";
import Link from "next/link";

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
  }
];

export function changeColorservo(index: number): string {
  const color = ["stroke-red-500", "stroke-yellow-500", "stroke-green-500", "stroke-blue-500", "stroke-pink-500"];
  if (index === 0)
    return color[0]
  if (index === 1)
    return color[1]
  if (index === 2)
    return color[2]
  if (index === 3)
    return color[3]
  if (index === 4)
    return color[4]
  else return color[5]
}

export default function DashboardPage() {
  return (

    <div className="space-y-4 mt-10">
      <div className="text-lg text-white/80 bg-green-400/10 p-1 rounded-lg">
        <LampDeskIcon /> Eis Todos os departamentos
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Publications.map((data, index) => (
          <Link
            href={`/main/departamento/${data.name}`}
            key={data.name} className="h-full"
          >
            <Card className="h-full">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {data.servo}
                </CardTitle>
                <data.icon className={changeColorservo(index)} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data.name}</div>
                {data.ajudantes.map((helper)=><p key={helper} className="text-xs text-muted-foreground">{helper}</p>)}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
