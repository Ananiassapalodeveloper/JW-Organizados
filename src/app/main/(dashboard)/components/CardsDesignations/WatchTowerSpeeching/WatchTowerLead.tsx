"use client"
import {  BookA, Check, ChevronsUpDown, MagnetIcon, User } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { setThemeColor } from "../../Meetingype"
import { useState } from "react"
import { cn } from "@/lib/utils"


export const Brothers = [
  {
    role: "Ancião",
    qtds: 8,
    name: "Ernesto Nhanga"
  },
  {
    role: "Ancião",
    qtds: 8,
    name: "André Vinho"
  },
  {
    role: "Publicador Baptizado",
    qtds: 8,
    name: "Leonildo Cabila"
  },
  {
    role: "Publicador Baptizado",
    qtds: 8,
    name: "Teodor Upale"
  },
  {
    role: "Publicador Baptizado",
    qtds: 8,
    name: "Domingos Crusso"
  },
  {
    role: "Publicador Baptizado",
    qtds: 8,
    name: "Victoriano Domingos"
  },
  {
    role: "Servo ministerial",
    qtds: 8,
    name: "Abel Gonga"
  },
  {
    role: "Publicador não Baptizado",
    qtds: 8,
    name: "Carlos Ernesto"
  },
  {
    role: "Publicador Baptizado",
    qtds: 8,
    name: "Fernandes Joaquim"
  },
  {
    role: "Publicador não Baptizado",
    qtds: 8,
    name: "Jeovane Ernesto"
  },
  {
    role: "Publicador Baptizado",
    qtds: 8,
    name: "Joaquim Maquengo"
  },
  {
    name: "Valentim Quiluluta",
    role: "Ancião",
    qtds: 9
  },
  {
    name: "Milton António",
    role: "Ancião",
    qtds: 9
  },
  {
    name: "Adão Canda",
    role: "Publicador Baptizado",
    qtds: 9
  },
  {
    name: "Ananias Sapalo",
    role: "Publicador Baptizado",
    qtds: 7
  },
  {
    name: "Eduardo Macoxi",
    role: "Publicador Baptizado",
    qtds: 7
  },
  {
    name: " Manuel Tomás",
    role: "Publicador não Baptizado",
    qtds: 7
  },
  {
    name: "Walter Macoxi",
    role: "Publicador Baptizado",
    qtds: 7
  }
]

export const Sisters = [
  {
    role: "Publicador Baptizado",
    qtds: 8,
    name: "Elisa Pessoa"
  },
  {
    name: "Emília Sampaio",
    role: "Publicador Baptizado",
    qtds: 7
  },
  {
    name: "Fátima Zangui",
    role: "Publicador Baptizado",
    qtds: 7
  },
  {
    name: "Joana Balanga",
    role: "Publicador Baptizado",
    qtds: 7
  },
  {
    name: "Leusia Fina",
    role: "Publicador Baptizado",
    qtds: 7
  },
  {
    name: "Madalena Manuel",
    role: "Publicador Baptizado",
    qtds: 7
  },
  {
    name: "Marcelina Quisssunda",
    role: "Publicador Baptizado",
    qtds: 7
  },
  {
    name: "Neusa António",
    role: "Publicador Baptizado",
    qtds: 7
  },
  {
    name: "Nguza Dala",
    role: "Publicador Baptizado",
    qtds: 7
  },
  {
    name: "Teresa Eduardo",
    role: "Publicador Baptizado",
    qtds: 7
  },
  {
    role: "Publicador Baptizado",
    qtds: 8,
    name: "Jucelma Fernandes"
  },
  {
    role: "Publicador Baptizado",
    qtds: 8,
    name: "Laurinda Fernandes"
  },
  {
    role: "Publicador não Baptizado",
    qtds: 8,
    name: "Maria de Fátima"
  },
  {
    role: "Publicador Baptizado",
    qtds: 8,
    name: "Maria Romão"
  },
  {
    role: "Publicador não Baptizado",
    qtds: 8,
    name: "Noémia José"
  },
  {
    role: "Publicador Baptizado",
    qtds: 8,
    name: "Rosa Crusso"
  },
  {
    role: "Publicador Baptizado",
    qtds: 8,
    name: "Suzeth Nhanga"
  },
  {
    role: "Publicador Baptizado",
    qtds: 8,
    name: "Teresa Osório"
  },
  {
    role: "Publicador não Baptizado",
    qtds: 8,
    name: "Vanda Osório"
  },
  {
    role: "Publicador Baptizado",
    qtds: 8,
    name: "Isabel Manuel"
  },
  {
    name: "Adelina Francisco",
    role: "Publicador Baptizado",
    qtds: 7
  },
  {
    name: "Armanda Álvaro",
    role: "Publicador não Baptizado",
    qtds: 7
  },
  {
    name: "Cátia Cabonda",
    role: "Publicador Baptizado",
    qtds: 7
  },
  {
    name: "Conceição Manuel",
    role: "Publicador Baptizado",
    qtds: 7
  },
  {
    name: "Ducelina Macana",
    role: "Publicador não Baptizado",
    qtds: 7
  },
  {
    name: "Josefina Catala",
    role: "Publicador Baptizado",
    qtds: 7
  },
  {
    name: "Julieta Manuel",
    role: "Publicador Baptizado",
    qtds: 7
  },
  {
    name: "Maria Fernandes",
    role: "Publicador Baptizado",
    qtds: 7
  },
  {
    name: "Mariete Vinho",
    role: "Publicador Baptizado",
    qtds: 7
  },
  {
    name: "Maura Cambongo",
    role: "Publicador não Baptizado",
    qtds: 7
  },
  {
    name: "Minesa Diamantino",
    role: "Publicador Baptizado",
    qtds: 7
  },
  {
    name: "Nelsa Macana",
    role: "Publicador Baptizado",
    qtds: 7
  },
  {
    name: "Rosa Cambambe",
    role: "Publicador Baptizado",
    qtds: 7
  },
  {
    name: "Teresa Calai",
    role: "Publicador Baptizado",
    qtds: 7
  },
  {
    name: "Celma Quiluluta",
    role: "Publicador Baptizado",
    qtds: 7
  },
  {
    name: "Delfina D'Sousa",
    role: "Publicador Baptizado",
    qtds: 7
  },
]

export const Family = [...Sisters, ...Brothers]



export function WatchTowerLead() {
  const [open, setOpen] = useState(false)
  const [FamilyName, setFamilyName] = useState("")
  const [openHelper, setOpenHelper] = useState(false)
  const [FamilyNameHelper, setFamilyNameHelper] = useState("")

  const Family1 = Family.filter((b) => (b.name !== FamilyNameHelper)).sort((a, b) => (a.name.localeCompare(b.name, "pt", { sensitivity: "accent" })))
  const Family2 = Family.filter((b) => (b.name !== FamilyName)).sort((a, b) => (a.name.localeCompare(b.name, "pt", { sensitivity: "accent" })))

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex flex-col">
          <span className="text-lg ">Estudo de A Sentinela - Dirigente</span>
          <span className="flex items-center gap-2 text-xs"><BookA size={14} /> Tema: É possível viver para sempre – Como?</span>
        </CardTitle>
        <CardDescription>
          Selecione os irmãos para respectiva designação
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6 w-full overflow-hidden">
        <div className="flex flex-col items-start justify-start space-y-4">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="/avatar/01.png" />
              <AvatarFallback className="uppercase">{!(FamilyName === "") ? FamilyName.slice(0, 2) : "?"}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium leading-none">{FamilyName ? FamilyName : "Não Selecionado"}</p>
              <p className="text-sm text-muted-foreground">email@gmail.com</p>
            </div>
          </div>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className=""
              >
                {FamilyName
                  ? Family1.find((brother) => brother.name === FamilyName)?.name
                  : "Selecionar irmã(o)..."}
                <ChevronsUpDown className="opacity-50 text-muted-foreground" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0" align="end">
              <Command>
                <CommandInput placeholder="Selecionar o irmão ..." />
                <CommandList>
                  <CommandEmpty>ups! Nenhum irmão encontrado.</CommandEmpty>
                  <CommandGroup>
                    {Family1.map((brother, key) => brother.role !== "Publicador não Baptizado" && (
                      <CommandItem
                        key={brother.name}
                        value={brother.name}
                        onSelect={(currentBrotherName) => {
                          setFamilyName(currentBrotherName === FamilyName ? "" : currentBrotherName)
                          setOpen(false)
                        }}
                      >
                        <div>
                          <p>{brother.name}</p>
                          <div className="flex items-center gap-2" >
                            <p className="text-sm text-muted-foreground">{brother.role} </p>
                            <p className={`rounded-[16px] flex items-center justify-center size-8 ${setThemeColor(key)}`}>{brother.qtds}</p>
                          </div>
                        </div>
                        <Check
                          className={cn(
                            "ml-auto",
                            FamilyName === brother.name ? "opacity-100" : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

        </div>
        <div className="">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="flex items-center gap-x-2">
                <User /> Voluntário
              </TooltipTrigger>
              <TooltipContent>
                <h1>Caso Haja um conveniente, atribua um voluntário</h1>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>


        </div>
        <div className="flex flex-col items-start justify-start space-y-4">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="/avatar/01.png" />
              <AvatarFallback className="uppercase">{!(FamilyNameHelper === "") ? FamilyNameHelper.slice(0, 2) : "?"}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium leading-none">{FamilyNameHelper ? FamilyNameHelper : "Não Selecionado"}</p>
              <p className="text-sm text-muted-foreground">email@gmail.com</p>
            </div>
          </div>
          <Popover open={openHelper} onOpenChange={setOpenHelper}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={openHelper}
                className=""
              >
                {FamilyNameHelper
                  ? Family2.find((brother) => brother.name === FamilyNameHelper)?.name
                  : "Selecionar irmã(o)..."}
                <ChevronsUpDown className="opacity-50 text-muted-foreground" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0" align="end">
              <Command>
                <CommandInput placeholder="Selecionar o irmão ..." />
                <CommandList>
                  <CommandEmpty>ups! Nenhum irmão encontrado.</CommandEmpty>
                  <CommandGroup>
                    {Family2.map((brother, key) => brother.role !== "Publicador não Baptizado" && (
                      <CommandItem
                        key={brother.name}
                        value={brother.name}
                        onSelect={(currentBrotherName) => {
                          setFamilyNameHelper(currentBrotherName === FamilyNameHelper ? "" : currentBrotherName)
                          setOpen(false)
                        }}
                      >
                        <div>
                          <p>{brother.name}</p>
                          <div className="flex items-center gap-2" >
                            <p className="text-sm text-muted-foreground">{brother.role} </p>
                            <p className={`rounded-[16px] flex items-center justify-center size-8 ${setThemeColor(key)}`}>{brother.qtds}</p>
                          </div>
                        </div>
                        <Check
                          className={cn(
                            "ml-auto",
                            FamilyNameHelper === brother.name ? "opacity-100" : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <TooltipProvider >
          <Tooltip>
            <TooltipTrigger>
              <Button size={"icon"} className="rounded-full"> <MagnetIcon size={24} stroke="white" strokeWidth={3} /></Button>
            </TooltipTrigger>
            <TooltipContent>
              <h1>Atribuir designação de forma automática</h1>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardContent>
    </Card>
  )
}
