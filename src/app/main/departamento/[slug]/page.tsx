import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { BookIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "Desiganações",
  description: "Registar Designações",
};



const Departments = [
  {
    name: "Seja Feliz Para sempre",
    stock: 14,
    received:"70",
    sked:22,
    servo: "Abel Gonga",
  },
  {
    name: "Bíblia",
    stock: 17,
    received:"70",
    sked:22,
    servo: "Abel Gonga",
  },
  {
    name: "Examina a escritura diariamente",
    stock: 19,
    servo: "Gradel Sanda",
    received:"70",
    sked:22,
  },
  {
    name: "Escuta a Deus e Viva para sempre",
    stock: 40,
    servo: "Abel Gonga",
    received:"70",
    sked:22,
  },
  {
    name: "Dispertai - O que aconteceu ao rspeito",
    stock: 30,
    servo: "Victoriano Mateus",
    received:"70",
    sked:22,
  }
];

export function changeColorservo(index: number): string {
  const color = ["border-red-500", "border-yellow-500", "border-green-500", "border-blue-500", "border-pink-500"];
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
      <h1 className="text-lg text-white/80 flex items-center gap-1 bg-green-400/10 p-1 rounded-lg">
        <BookIcon/>Stock de Publicações
      </h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Departments.map((data, index) => (
          <Link
            href={`/main/departamento/${data.name}`}
            key={data.name} className="hover:"
          >
            <Card className="h-full">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  entrada: {data.received}
                </CardTitle>
                <span className={`rounded-full p-[0.9px] size-7  text-center border-2 ${changeColorservo(index)}`} >
                  {data.stock}
                </span>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data.name}</div>
                <p className="text-xs text-muted-foreground">petições {data.sked}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
