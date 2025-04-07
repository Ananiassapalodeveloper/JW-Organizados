"use client"

import { useState, useCallback, type FC } from "react"
import { Check, ChevronsUpDown, MagnetIcon, AlertCircle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { cn } from "@/lib/utils"

// Importando os tipos
import type { FamilyMember, FeedbackType, PersonSelectorProps } from "./types"

// Assumindo que estas importações estão disponíveis do arquivo original
import { Family, setThemeColor } from "./original-file"

export const ImprovedReaderWatchTower: FC = () => {
  const [open, setOpen] = useState<boolean>(false)
  const [openHelper, setOpenHelper] = useState<boolean>(false)
  const [readerName, setReaderName] = useState<string>("")
  const [helperName, setHelperName] = useState<string>("")
  const [feedback, setFeedback] = useState<FeedbackType>({ message: "", type: "" })
  const [showFeedback, setShowFeedback] = useState<boolean>(false)

  const eligibleReaders: FamilyMember[] = Family.filter(
    (member: FamilyMember) => member.role !== "Publicador não Baptizado",
  )

  const availableReaders: FamilyMember[] = eligibleReaders.filter((member: FamilyMember) => member.name !== helperName)

  const availableHelpers: FamilyMember[] = eligibleReaders.filter((member: FamilyMember) => member.name !== readerName)

  // Função para mostrar feedback temporário
  const showTemporaryFeedback = useCallback((message: string, type: "success" | "error" | "info" = "success"): void => {
    setFeedback({ message, type })
    setShowFeedback(true)
    setTimeout(() => {
      setShowFeedback(false)
    }, 3000)
  }, [])

  // Função de preenchimento automático
  const autoFill = useCallback((): void => {
    // Ordenar por qtds (menor para maior)
    const sortedByQtds = [...eligibleReaders].sort((a, b) => a.qtds - b.qtds)

    if (sortedByQtds.length < 2) {
      showTemporaryFeedback("Não há irmãos suficientes para designação automática", "error")
      return
    }

    const newReader = sortedByQtds[0]
    const newHelper = sortedByQtds[1]

    setReaderName(newReader.name)
    setHelperName(newHelper.name)

    showTemporaryFeedback(`Designação automática: ${newReader.name} como leitor e ${newHelper.name} como auxiliar`)
  }, [eligibleReaders, showTemporaryFeedback])

  // Função para lidar com a seleção do leitor
  const handleReaderSelection = useCallback(
    (name: string): void => {
      const newName = name === readerName ? "" : name
      setReaderName(newName)
      setOpen(false)

      if (newName) {
        showTemporaryFeedback(`${newName} selecionado como leitor`)
      }
    },
    [readerName, showTemporaryFeedback],
  )

  // Função para lidar com a seleção do auxiliar
  const handleHelperSelection = useCallback(
    (name: string): void => {
      const newName = name === helperName ? "" : name
      setHelperName(newName)
      setOpenHelper(false)

      if (newName) {
        showTemporaryFeedback(`${newName} selecionado como auxiliar`)
      }
    },
    [helperName, showTemporaryFeedback],
  )

  // Componente de seleção de pessoa reutilizável
  const PersonSelector: FC<PersonSelectorProps> = ({
    role,
    name,
    onSelect,
    openState,
    setOpenState,
    availableMembers,
  }) => (
    <div className="flex flex-col items-start justify-start space-y-4">
      <div className="flex items-center space-x-4">
        <Avatar>
          <AvatarImage src="/avatar/01.png" alt={name || "Avatar"} />
          <AvatarFallback className="uppercase">{name ? name.slice(0, 2) : "?"}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-medium leading-none">{name || "Não Selecionado"}</p>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
      </div>
      <Popover open={openState} onOpenChange={setOpenState}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" aria-expanded={openState} className="w-full justify-between">
            {name || `Selecionar ${role}...`}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0">
          <Command>
            <CommandInput placeholder={`Procurar ${role}...`} />
            <CommandList>
              <CommandEmpty>Nenhum irmão encontrado.</CommandEmpty>
              <CommandGroup>
                {availableMembers.map((member, index) => (
                  <CommandItem
                    key={member.name}
                    onSelect={() => onSelect(member.name)}
                    className="flex justify-between"
                  >
                    <div className="flex items-center">
                      <Check className={cn("mr-2 h-4 w-4", name === member.name ? "opacity-100" : "opacity-0")} />
                      <span>{member.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">{member.role}</span>
                      <span className={`rounded-full px-2 py-1 text-xs ${setThemeColor(index)}`}>{member.qtds}</span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )

  // Função para salvar as designações
  const saveDesignations = useCallback((): void => {
    if (!readerName || !helperName) {
      showTemporaryFeedback("Por favor, selecione o leitor e o auxiliar antes de salvar", "error")
      return
    }

    // Aqui você implementaria a lógica para salvar as designações
    // Por exemplo, enviar para uma API ou armazenar localmente

    showTemporaryFeedback("Designações salvas com sucesso!", "success")

    // Opcional: limpar os campos após salvar
    // setReaderName("")
    // setHelperName("")
  }, [readerName, helperName, showTemporaryFeedback])

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Leitor da Sentinela</CardTitle>
        <CardDescription>
          Selecione os irmãos para a leitura da Sentinela ou use o preenchimento automático
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {showFeedback && (
          <Alert
            variant={feedback.type === "error" ? "destructive" : "default"}
            className="mb-4 transition-opacity duration-300"
          >
            {feedback.type === "error" ? <AlertCircle className="h-4 w-4" /> : <Check className="h-4 w-4" />}
            <AlertTitle>{feedback.type === "error" ? "Atenção" : "Sucesso"}</AlertTitle>
            <AlertDescription>{feedback.message}</AlertDescription>
          </Alert>
        )}

        <PersonSelector
          role="Leitor"
          name={readerName}
          onSelect={handleReaderSelection}
          openState={open}
          setOpenState={setOpen}
          availableMembers={availableReaders}
        />

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Auxiliar</span>
          </div>
        </div>

        <PersonSelector
          role="Auxiliar"
          name={helperName}
          onSelect={handleHelperSelection}
          openState={openHelper}
          setOpenState={setOpenHelper}
          availableMembers={availableHelpers}
        />
      </CardContent>
      <CardFooter className="flex gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button onClick={autoFill} className="flex-1">
                <MagnetIcon className="mr-2 h-4 w-4" />
                Preenchimento Automático
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Atribuir designação de forma automática baseada na quantidade de designações anteriores</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <Button onClick={saveDesignations} className="flex-1" variant="default">
          Salvar Designações
        </Button>
      </CardFooter>
    </Card>
  )
}

