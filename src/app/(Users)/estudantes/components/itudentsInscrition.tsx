"use client"
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon, PlusCircle } from "lucide-react";
import Image from "next/image";
import SejaFeliz from "@public/Assets/BrochurasSejaFeliz.png";
import EscutaDeus from "@public/Assets/escutarDeus.png";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import React from "react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

export function StudentsInscritionsForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Registar Estudante</CardTitle>
        <CardDescription className="text-blue-500 flex gap-3 items-center mt-3">
          <PlusCircle />
          Adiciona um novo estudante para sua lista de estudo
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <RadioGroup defaultValue="card" className="grid grid-cols-2 gap-4">
          <div>
            <RadioGroupItem value="card" id="card" className="peer sr-only" />
            <Label
              htmlFor="card"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              <Image
                src={SejaFeliz}
                className="mb-3 h-6 w-6"
                alt="Seja Feliz para sempre"
              />
              Seja Feliz para Sempre
            </Label>
          </div>
          <div>
            <RadioGroupItem
              value="paypal"
              id="paypal"
              className="peer sr-only"
            />
            <Label
              htmlFor="paypal"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              <Image
                src={EscutaDeus}
                className="mb-3 h-6 w-6"
                alt="Seja Feliz para sempre"
              />
              Escutar A Deus
            </Label>
          </div>
        </RadioGroup>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="nome">Nome</Label>
            <Input id="nome" placeholder="Nome Completo" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="sexo">Sexo</Label>

            <div className="flex flex-col gap-6">
              <RadioGroup defaultValue="masculino">
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="masculino" id="masculino" />
                  <Label htmlFor="masculino">Masculino</Label>
                </div>
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="femenino" id="femenino" />
                  <Label htmlFor="femenino">Femenino</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="number">Data de nascimento</Label>
            <DatePickerSimple />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="number">Data do início do estudo</Label>
            <DatePickerSimple />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="month">Dias Alternativos</Label>
            <Select>
              <SelectTrigger id="month">
                <SelectValue placeholder="Month" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">January</SelectItem>
                <SelectItem value="2">February</SelectItem>
                <SelectItem value="3">March</SelectItem>
                <SelectItem value="4">April</SelectItem>
                <SelectItem value="5">May</SelectItem>
                <SelectItem value="6">June</SelectItem>
                <SelectItem value="7">July</SelectItem>
                <SelectItem value="8">August</SelectItem>
                <SelectItem value="9">September</SelectItem>
                <SelectItem value="10">October</SelectItem>
                <SelectItem value="11">November</SelectItem>
                <SelectItem value="12">December</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="year">Year</Label>
            <Select>
              <SelectTrigger id="year">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 10 }, (_, i) => (
                  <SelectItem key={i} value={`${new Date().getFullYear() + i}`}>
                    {new Date().getFullYear() + i}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="cvc">CVC</Label>
            <Input id="cvc" placeholder="CVC" />
          </div>
        </div>
        
      </CardContent>
      <CardFooter>
        <Button className="w-full">Continue</Button>
      </CardFooter>
    </Card>
  );
}

function DatePickerSimple() {
  const [date, setDate] = React.useState<Date>();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "min-w-[200px] justify-start px-2 font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
