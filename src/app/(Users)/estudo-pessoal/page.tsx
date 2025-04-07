import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Circle,
  CircleCheckIcon,
  CirclePlus,
  LampDeskIcon,
  PlusCircle,
} from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { changeColorStatus } from "@/lib/color";

export const metadata: Metadata = {
  title: "Assistência Visão geral",
  description: "Visão geral da congregação praça Nova 3",
};



const registes = [
  {
    name: "Jesus é Deus?",
    value: "jan",
    icon: CircleCheckIcon,
    status: "feito",
    tempo: "00h:00min",
    studyings: 12,
  },
  {
    name: "Como ser mais humilde?",
    value: "fer",
    icon: CircleCheckIcon,
    status: "feito",
    tempo: "00h:00min",
    studyings: 13,
  },
  {
    name: "Privilégio, até que ponto eu amo?",
    value: "mar",
    status: "decorrendo",
    icon: Circle,
    tempo: "00h:00min",
    studyings: 10,
  },
  {
    name: "Jeová é real para mim?",
    value: "abr",
    status: "não inicializado",
    tempo: "00h:00min",
    icon: Circle,
  },
  {
    name: "Estar com alguém de idade avançada?",
    value: "mai",
    status: "não inicializado",
    tempo: "00h:00min",
    icon: Circle,
  },
];
export default function AssistenciaPage() {
  return (
    <main className="mt-[112px]">
      <div className="space-y-4 mt-10">
        <div className="text-lg text-white/80 bg-green-400/10 p-1 rounded-lg">
          <LampDeskIcon /> Eis os seus temas dos seus estudos pessoais - 2025
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {registes.map((data) => (
            <Sheet key={data.value}>
              <SheetTrigger className="bg-green-500">
                <Card key={data.value} className="h-full">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {data.studyings} dirigido(s)
                    </CardTitle>
                    <data.icon className={changeColorStatus(data.status)} />
                  </CardHeader>
                  <CardContent className="space-y-1">
                    <div className="text-2xl font-bold">{data.name}</div>
                    <p className="text-xs text-muted-foreground">
                      {data.status}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {data.studyings}h
                    </p>
                  </CardContent>
                </Card>
              </SheetTrigger>
              <SheetContent className="space-y-4">
                <SheetHeader>
                  <SheetTitle>{data.name}</SheetTitle>
                </SheetHeader>
                <form action="" className="space-y-2">
                  <div className="grid gap-4">
                    <Label htmlFor="assistence">
                      Define os principios encontrados
                    </Label>
                    <Input
                      type="number"
                      name=""
                      id="assistence"
                      placeholder="Define os principios..."
                    />
                  </div>
                  <div className="grid gap-4">
                    <Button size={"lg"} variant={"outline"} type="button">
                      <PlusCircle className="size-10" /> Adicionar
                    </Button>
                  </div>
                  <div className="grid gap-4">
                    <Label htmlFor="assistence">Concluído</Label>
                    <Switch />
                  </div>
                </form>
                <SheetFooter>
                  <Button>Registar</Button>
                  <SheetClose asChild>
                    <Button variant={"outline"}>Cancelar</Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          ))}
          <Dialog>
            <DialogTrigger>
              <Card className="h-full">
                <CardContent className="space-y-1 text-center flex items-center justify-center size-full">
                  <div className="text-2xl font-bold size-full flex items-center justify-center">
                    <CirclePlus size={74} />
                  </div>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className="space-y-4">
              <DialogHeader>
                <DialogTitle>Estudo pessoal </DialogTitle>
              </DialogHeader>
              <form action="" className="space-y-2">
                <div className="grid gap-4">
                  <Label htmlFor="assistence">Define o número de hora</Label>
                  <Input
                    type="number"
                    name=""
                    id="assistence"
                    placeholder="Define de hora..."
                  />
                </div>
                <div className="grid gap-4">
                  <Label htmlFor="assistence">
                    Define o número de estudo dirigido
                  </Label>
                  <Input
                    type="number"
                    name=""
                    id="assistence"
                    placeholder="Define o número de estudo dirigido..."
                  />
                </div>
              </form>
              <DialogFooter>
                <Button>Registar</Button>
                <DialogClose asChild>
                  <Button variant={"outline"}>Cancelar</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </main>
  );
}
