"use client"

import { useState, useCallback } from "react"
import { Check, ChevronsUpDown, MagnetIcon } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

// Assuming these imports are available from the original file
import { Family, setThemeColor } from "./original-file"

export function ImprovedReaderWatchTower() {
  const [open, setOpen] = useState(false)
  const [openHelper, setOpenHelper] = useState(false)
  const [readerName, setReaderName] = useState("")
  const [helperName, setHelperName] = useState("")

  const eligibleReaders = Family.filter((member) => member.role !== "Publicador não Baptizado")
  const availableReaders = eligibleReaders.filter((member) => member.name !== helperName)
  const availableHelpers = eligibleReaders.filter((member) => member.name !== readerName)

  const autoFill = useCallback(() => {
    const sortedByQtds = [...eligibleReaders].sort((a, b) => a.qtds - b.qtds)
    const newReader = sortedByQtds[0]
    const newHelper = sortedByQtds[1]

    setReaderName(newReader.name)
    setHelperName(newHelper.name)
  }, [eligibleReaders])

  const PersonSelector = ({ role, name, setName, openState, setOpenState, availableMembers }) => (
    <div className="flex flex-col items-start justify-start space-y-4">
      <div className="flex items-center space-x-4">
        <Avatar>
          <AvatarImage src="/avatar/01.png" />
          <AvatarFallback className="uppercase">{name ? name.slice(0, 2) : "?"}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-medium leading-none">{name || "Não Selecionado"}</p>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
      </div>
      <Popover open={openState} onOpenChange={setOpenState}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" aria-expanded={openState} className="w-[200px] justify-between">
            {name || `Selecionar ${role}...`}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder={`Procurar ${role}...`} />
            <CommandList>
              <CommandEmpty>Nenhum irmão encontrado.</CommandEmpty>
              <CommandGroup>
                {availableMembers.map((member, index) => (
                  <CommandItem
                    key={member.name}
                    onSelect={() => {
                      setName(member.name === name ? "" : member.name)
                      setOpenState(false)
                    }}
                  >
                    <Check className={cn("mr-2 h-4 w-4", name === member.name ? "opacity-100" : "opacity-0")} />
                    {member.name}
                    <span className={`ml-auto ${setThemeColor(index)}`}>{member.qtds}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Leitor da Sentinela</CardTitle>
        <CardDescription>Selecione os irmãos para a leitura da Sentinela</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <PersonSelector
          role="Leitor"
          name={readerName}
          setName={setReaderName}
          openState={open}
          setOpenState={setOpen}
          availableMembers={availableReaders}
        />
        <PersonSelector
          role="Auxiliar"
          name={helperName}
          setName={setHelperName}
          openState={openHelper}
          setOpenState={setOpenHelper}
          availableMembers={availableHelpers}
        />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button onClick={autoFill} className="w-full">
                <MagnetIcon className="mr-2 h-4 w-4" />
                Preenchimento Automático
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Atribuir designação de forma automática</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardContent>
    </Card>
  )
}


  