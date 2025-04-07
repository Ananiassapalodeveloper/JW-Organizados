/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState, useMemo, useCallback } from "react"
import { useFieldArray, useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { AxiosError } from "axios"
import {
  AlertCircle,
  Check,
  ChevronsUpDown,
  Clock,
  Loader,
  PlusCircle,
  Trash2,
  UserPlus,
  BookOpen,
  Users,
  Sparkles,
} from "lucide-react"

// UI Components
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

// Custom Components
import { QTDsDesignation } from "@/components/FormsComponents/QTDsDesignation"
import { RemoverDesignacaoDialog } from "@/components/RemoverEmpenhaMinisterio/removedor-designacao-dialog"
import { PresidentEndPrayingSkeleton } from "@/components/PresidentEndPrayingSkeleton"

// Hooks and Utilities
import { useFetch } from "@/hooks/useFetch"
import { useAutoAssignment } from "@/hooks/useAutoAssignment"
import { api } from "@/hooks/use-membro-form-data"
import { toast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { setThemeColor } from "../../Meetingype"
import { CompletedDisignation } from "@/lib/isCompleted"

// Data and Types
import { MinisterioType } from "@/services/MinisterioData/data"
import { bookImd, BookTH } from "@/services/Book.data"
import {
  type ministerioType,
  type presidentType as BrothersType,
  ministerioSchema,
} from "@/types/reuniaoMeioSemanaDTO/type"

const defaultValues: Partial<ministerioType> = {
  name: "iniciarConversa1",
  memberDirigenteId: "",
  memberDirigenteSuplenteId: "",
  memberMoradorId: "",
  memberMoradorSuplenteId: "",
  reunioesDatesId: "",
  tema: "",
  lessonPoint: "",
  bookImd: [
    {
      number: "1",
      points: [{ point: "3", subpoint: [] }],
    },
  ],
}

export function MinisterioPage({ params }: { params: { id: string } }) {
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [isAutoAssigning, setIsAutoAssigning] = useState(false)
  const [activeTab, setActiveTab] = useState<string>("dirigentes")

  // Fetch data
  const { data: brothers, error, isLoading, mutate: BroMutate } = useFetch<BrothersType[]>("brothers")

  const {
    data: Ministerios,
    isLoading: isLoadingDesignation,
    mutate: mutateMinisterios,
  } = useFetch<any>(`ministerio/${params.id}`)

  // Form setup
  const methods = useForm<ministerioType>({
    resolver: zodResolver(ministerioSchema),
    defaultValues: {
      ...defaultValues,
      reunioesDatesId: params.id,
    },
    mode: "onChange",
  })

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { isSubmitting, isValid },
  } = methods

  const { fields, append, remove } = useFieldArray({
    name: "bookImd",
    control,
  })

  // Watched values
  const memberDirigenteId = watch("memberDirigenteId")
  const memberDirigenteSuplenteId = watch("memberDirigenteSuplenteId")
  const memberMoradorId = watch("memberMoradorId")
  const memberMoradorSuplenteId = watch("memberMoradorSuplenteId")
  const lessonPoint = watch("lessonPoint")
  const NameDesignation = watch("name")
  const isDiscursoOrExplicarCrenca = ["discurso", "explicarCrenca"].includes(NameDesignation)

  // Memoized values for performance
  const memberDirigente = useMemo(() => {
    return brothers?.find((brother) => brother.id === memberDirigenteId)
  }, [brothers, memberDirigenteId])

  const memberDirigenteSuplente = useMemo(() => {
    return brothers?.find((brother) => brother.id === memberDirigenteSuplenteId)
  }, [brothers, memberDirigenteSuplenteId])

  const memberMorador = useMemo(() => {
    return brothers?.find((brother) => brother.id === memberMoradorId)
  }, [brothers, memberMoradorId])

  const memberMoradorSuplente = useMemo(() => {
    return brothers?.find((brother) => brother.id === memberMoradorSuplenteId)
  }, [brothers, memberMoradorSuplenteId])

  // Filtered lists for dropdowns
  const filteredDirigenteBrothers = useMemo(() => {
    return brothers?.filter((brother) => brother.id !== memberDirigenteId) || []
  }, [brothers, memberDirigenteId])

  const filteredbrothersMorador = useMemo(() => {
    return brothers?.filter((brother) => ![memberDirigenteSuplenteId, memberDirigenteId].includes(brother.id)) || []
  }, [brothers, memberDirigenteId, memberDirigenteSuplenteId])

  const filteredMorador = useMemo(() => {
    return (
      brothers?.filter(
        (brother) => ![memberMoradorId, memberDirigenteSuplenteId, memberDirigenteId].includes(brother.id),
      ) || []
    )
  }, [brothers, memberDirigenteId, memberDirigenteSuplenteId, memberMoradorId])

  // QTDs calculations
  const QTDSMembro = useMemo(() => {
    return memberDirigente?.MinisterioMembroDirigente.filter(
      (ts) => ts.lessonPoint === lessonPoint && ts.memberDirigenteId === memberDirigenteId,
    )?.length
  }, [lessonPoint, memberDirigente?.MinisterioMembroDirigente, memberDirigenteId])

  const QTDSuplente = useMemo(() => {
    return memberDirigenteSuplente?.MinisterioSuplenteMembroDirigente.filter(
      (ts) => ts.lessonPoint === lessonPoint && ts.memberDirigenteSuplenteId,
    )?.length
  }, [lessonPoint, memberDirigenteSuplente?.MinisterioSuplenteMembroDirigente])

  const QTDSMorador = useMemo(() => {
    return memberMorador?.MinisteriooradorMembroMorador.filter(
      (ts) => ts.lessonPoint === lessonPoint && ts.memberMoradorId === memberMoradorId,
    )?.length
  }, [lessonPoint, memberMorador?.MinisteriooradorMembroMorador, memberMoradorId])

  const QTDSMoradorSuplente = useMemo(() => {
    return memberMoradorSuplente?.MinisterioSuplenteMembroMorador.filter(
      (ts) => ts.lessonPoint === lessonPoint && ts.memberMoradorId === memberMoradorSuplenteId,
    )?.length
  }, [lessonPoint, memberMoradorSuplente?.MinisterioSuplenteMembroMorador, memberMoradorSuplenteId])

  // Auto assignment hooks
  const { autoAssign: autoAssignDirigente } = useAutoAssignment({
    brothers: brothers || [],
    setPresidentId: (id) => setValue("memberDirigenteId", id),
    setPrayerId: (id) => setValue("memberDirigenteSuplenteId", id),
  })

  const { autoAssign: autoAssignMorador } = useAutoAssignment({
    brothers: filteredbrothersMorador || [],
    setPresidentId: (id) => setValue("memberMoradorId", id),
    setPrayerId: (id) => setValue("memberMoradorSuplenteId", id),
  })

  // Auto assignment handlers
  const handleAutoAssign = useCallback(async () => {
    setIsAutoAssigning(true)
    autoAssignDirigente()

    if (isDiscursoOrExplicarCrenca) {
      autoAssignMorador()
    }

    setIsAutoAssigning(false)
  }, [autoAssignDirigente, autoAssignMorador, isDiscursoOrExplicarCrenca])

  // Form submission handler
  const onSubmit = useCallback(
    async (values: ministerioType) => {
      try {
        setSubmitError(null)

        // Prepare data based on designation type
        const formData = isDiscursoOrExplicarCrenca
          ? {
              memberDirigenteId: values.memberDirigenteId,
              memberDirigenteSuplenteId: values.memberDirigenteSuplenteId,
              memberMoradorId: values.memberMoradorId,
              memberMoradorSuplenteId: values.memberMoradorSuplenteId,
              name: values.name,
              reunioesDatesId: params.id,
              tema: values.tema,
              lessonPoint: values.lessonPoint,
            }
          : {
              memberDirigenteId: values.memberDirigenteId,
              memberDirigenteSuplenteId: values.memberDirigenteSuplenteId,
              name: values.name,
              reunioesDatesId: params.id,
              lessonPoint: `${bookImd[0].number}.${bookImd[0].points[0].point}`,
            }

        await api.post("ministerio", formData)

        toast({
          title: "Designação registrada com sucesso",
          description: "Os irmãos foram designados para as partes.",
          variant: "default",
        })

        // Refresh data
        mutateMinisterios(`ministerio/${params.id}`)
        BroMutate()
      } catch (error) {
        if (error instanceof AxiosError) {
          const errorMessage = error.response?.data?.error || "Erro ao registrar a designação"
          setSubmitError(errorMessage)

          toast({
            title: "Erro ao registrar a designação",
            description: errorMessage,
            variant: "destructive",
          })
        } else {
          toast({
            title: "Erro inesperado",
            description: "Ocorreu um erro inesperado. Tente novamente mais tarde.",
            variant: "destructive",
          })
        }
      }
    },
    [BroMutate, isDiscursoOrExplicarCrenca, mutateMinisterios, params.id],
  )

  // Loading and error states
  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Erro</AlertTitle>
        <AlertDescription>Não foi possível carregar os dados dos irmãos. Por favor, tente novamente.</AlertDescription>
      </Alert>
    )
  }

  if (isLoading || isLoadingDesignation) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Loader className="h-4 w-4 mr-2 animate-spin" />
            Carregando designações
          </CardTitle>
          <CardDescription>Aguarde enquanto carregamos os dados...</CardDescription>
        </CardHeader>
        <CardContent>
          <PresidentEndPrayingSkeleton />
        </CardContent>
      </Card>
    )
  }

  // Calculate form completion percentage
  const formCompletionPercentage = (() => {
    let total = 2 // Dirigente and Dirigente Suplente are always required
    let completed = 0

    if (memberDirigenteId) completed++
    if (memberDirigenteSuplenteId) completed++

    if (isDiscursoOrExplicarCrenca) {
      total += 3 // Morador, Morador Suplente, and lessonPoint
      if (memberMoradorId) completed++
      if (memberMoradorSuplenteId) completed++
      if (lessonPoint) completed++
    }

    return Math.round((completed / total) * 100)
  })()

  return (
    <Card className="w-full overflow-hidden border shadow-sm">
      <CardHeader className="bg-muted/40 pb-2">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <CardTitle className="text-xl flex items-center gap-2">
              <FormProvider {...methods}>
                <FormField
                  control={control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value)
                          // Reset form values when changing designation type
                          if (isDiscursoOrExplicarCrenca !== ["discurso", "explicarCrenca"].includes(value)) {
                            setValue("lessonPoint", "")
                            setValue("tema", "")
                          }
                        }}
                        defaultValue={field.value?.toString()}
                      >
                        <FormControl>
                          <SelectTrigger
                            id="nome"
                            className="border-0 text-lg font-semibold bg-transparent p-0 h-auto w-auto min-w-[180px]"
                          >
                            <SelectValue placeholder="Selecione o tipo" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {MinisterioType.map((data) => (
                            <SelectItem key={data.value} value={data.value}>
                              {data.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </FormProvider>
              <Badge variant="outline" className="ml-2 flex items-center gap-1">
                <Clock className="h-3 w-3" /> 10 min
              </Badge>
            </CardTitle>
            <CardDescription className="mt-1">Atribua irmãos para esta designação</CardDescription>
          </div>

          <div className="flex items-center gap-2">
            <Badge className={cn("rounded-full", CompletedDisignation(Ministerios?.length >= 3))} variant="secondary">
              {Ministerios?.length || 0} designações
            </Badge>
            <RemoverDesignacaoDialog id={watch("reunioesDatesId") ?? ""} />
          </div>
        </div>

        <Progress
          value={formCompletionPercentage}
          className={cn("h-1 mt-4",formCompletionPercentage === 100 ? "bg-green-500" : "bg-blue-500")}
        />
      </CardHeader>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="p-6">
            {submitError && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Erro</AlertTitle>
                <AlertDescription>{submitError}</AlertDescription>
              </Alert>
            )}

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid grid-cols-2 mb-6">
                <TabsTrigger value="dirigentes" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>Dirigentes</span>
                </TabsTrigger>
                {isDiscursoOrExplicarCrenca && (
                  <TabsTrigger value="moradores" className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    <span>Conteúdo</span>
                  </TabsTrigger>
                )}
              </TabsList>

              <TabsContent value="dirigentes" className="space-y-6 animate-in fade-in-50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Dirigente Section */}
                  <div className="space-y-4 bg-card rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium flex items-center gap-2">
                        <Badge variant="outline" className="rounded-full">
                          Principal
                        </Badge>
                        Dirigente
                      </h3>
                    </div>

                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src="/avatar/01.png" alt="Avatar" />
                        <AvatarFallback className="uppercase bg-primary/10 text-primary">
                          {memberDirigente ? memberDirigente.nome.slice(0, 2) : "?"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">{memberDirigente?.nome || "Não Selecionado"}</p>
                        <p className="text-xs text-muted-foreground">
                          {memberDirigente?.contacto || "+244 ___________"}
                        </p>
                      </div>
                    </div>

                    <FormField
                      control={control}
                      name="memberDirigenteId"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel className="text-xs text-muted-foreground mb-1">
                            Selecione o irmão dirigente
                          </FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  role="combobox"
                                  className={cn("w-full justify-between", !field.value && "text-muted-foreground")}
                                >
                                  {field.value
                                    ? brothers?.find((brother) => brother.id === field.value)?.nome
                                    : "Selecionar irmão..."}
                                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-[300px] p-0">
                              <Command>
                                <CommandInput placeholder="Buscar irmão..." />
                                <CommandList>
                                  <CommandEmpty>Nenhum irmão encontrado.</CommandEmpty>
                                  <CommandGroup>
                                    {brothers?.map((brother, index) => (
                                      <CommandItem
                                        key={brother.id}
                                        value={brother.nome}
                                        onSelect={() => {
                                          setValue("memberDirigenteId", brother.id)
                                        }}
                                      >
                                        <div className="flex flex-1 items-start flex-col">
                                          <p>{brother.nome}</p>
                                          <div className="flex items-center gap-2">
                                            <p className="text-xs text-muted-foreground">
                                              {brother.carreira || brother.estado}
                                            </p>
                                            <Badge
                                              variant="outline"
                                              className={`rounded-full flex items-center justify-center h-5 w-5 text-xs ${setThemeColor(
                                                index,
                                              )}`}
                                            >
                                              {
                                                brother.MinisterioMembroDirigente.filter(
                                                  (des) => des.name === watch("name"),
                                                ).length
                                              }
                                            </Badge>
                                          </div>
                                        </div>
                                        <Check
                                          className={cn(
                                            "ml-auto h-4 w-4",
                                            field.value === brother.id ? "opacity-100" : "opacity-0",
                                          )}
                                        />
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                </CommandList>
                              </Command>
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <QTDsDesignation
                      isPermitted={isDiscursoOrExplicarCrenca && lessonPoint !== "" && memberDirigenteId !== ""}
                      QTDSMembro={QTDSMembro ?? 0}
                      lesson={lessonPoint ?? ""}
                    />
                  </div>

                  {/* Dirigente Suplente Section */}
                  <div className="space-y-4 bg-card rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium flex items-center gap-2">
                        <Badge variant="outline" className="rounded-full">
                          Suplente
                        </Badge>
                        Dirigente Suplente
                      </h3>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                            <AlertCircle className="h-3 w-3" /> Voluntário
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Caso haja um conveniente, atribua um voluntário</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>

                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src="/avatar/01.png" alt="Avatar" />
                        <AvatarFallback className="uppercase bg-primary/10 text-primary">
                          {memberDirigenteSuplente ? memberDirigenteSuplente.nome.slice(0, 2) : "?"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {memberDirigenteSuplente?.nome || "Não Selecionado"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {memberDirigenteSuplente?.contacto || "+244 ___________"}
                        </p>
                      </div>
                    </div>

                    <FormField
                      control={control}
                      name="memberDirigenteSuplenteId"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel className="text-xs text-muted-foreground mb-1">
                            Selecione o irmão suplente
                          </FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  role="combobox"
                                  className={cn("w-full justify-between", !field.value && "text-muted-foreground")}
                                  disabled={!memberDirigenteId}
                                >
                                  {field.value
                                    ? brothers?.find((brother) => brother.id === field.value)?.nome
                                    : memberDirigenteId
                                      ? "Selecionar irmão..."
                                      : "Selecione o dirigente primeiro"}
                                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-[300px] p-0">
                              <Command>
                                <CommandInput placeholder="Buscar irmão..." />
                                <CommandList>
                                  <CommandEmpty>Nenhum irmão encontrado.</CommandEmpty>
                                  <CommandGroup>
                                    {filteredDirigenteBrothers.map((brother, index) => (
                                      <CommandItem
                                        key={brother.id}
                                        value={brother.nome}
                                        onSelect={() => {
                                          setValue("memberDirigenteSuplenteId", brother.id)
                                        }}
                                      >
                                        <div className="flex flex-1 items-start flex-col">
                                          <p>{brother.nome}</p>
                                          <div className="flex items-center gap-2">
                                            <p className="text-xs text-muted-foreground">
                                              {brother.carreira || brother.estado}
                                            </p>
                                            <Badge
                                              variant="outline"
                                              className={`rounded-full flex items-center justify-center h-5 w-5 text-xs ${setThemeColor(
                                                index,
                                              )}`}
                                            >
                                              {
                                                brother.MinisterioSuplenteMembroDirigente.filter(
                                                  (des) => des.name === watch("name"),
                                                ).length
                                              }
                                            </Badge>
                                          </div>
                                        </div>
                                        <Check
                                          className={cn(
                                            "ml-auto h-4 w-4",
                                            field.value === brother.id ? "opacity-100" : "opacity-0",
                                          )}
                                        />
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                </CommandList>
                              </Command>
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <QTDsDesignation
                      isPermitted={isDiscursoOrExplicarCrenca && lessonPoint !== "" && memberDirigenteSuplenteId !== ""}
                      QTDSMembro={QTDSuplente ?? 0}
                      lesson={lessonPoint ?? ""}
                    />
                  </div>
                </div>
              </TabsContent>

              {isDiscursoOrExplicarCrenca && (
                <TabsContent value="moradores" className="space-y-6 animate-in fade-in-50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Morador Section */}
                    <div className="space-y-4 bg-card rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium flex items-center gap-2">
                          <Badge variant="outline" className="rounded-full">
                            Principal
                          </Badge>
                          Morador
                        </h3>
                      </div>

                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage src="/avatar/01.png" alt="Avatar" />
                          <AvatarFallback className="uppercase bg-primary/10 text-primary">
                            {memberMorador ? memberMorador.nome.slice(0, 2) : "?"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">{memberMorador?.nome || "Não Selecionado"}</p>
                          <p className="text-xs text-muted-foreground">
                            {memberMorador?.contacto || "+244 ___________"}
                          </p>
                        </div>
                      </div>

                      <FormField
                        control={control}
                        name="memberMoradorId"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel className="text-xs text-muted-foreground mb-1">
                              Selecione o irmão morador
                            </FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    role="combobox"
                                    className={cn("w-full justify-between", !field.value && "text-muted-foreground")}
                                  >
                                    {field.value
                                      ? brothers?.find((brother) => brother.id === field.value)?.nome
                                      : "Selecionar irmão..."}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-[300px] p-0">
                                <Command>
                                  <CommandInput placeholder="Buscar irmão..." />
                                  <CommandList>
                                    <CommandEmpty>Nenhum irmão encontrado.</CommandEmpty>
                                    <CommandGroup>
                                      {filteredbrothersMorador?.map((brother, index) => (
                                        <CommandItem
                                          key={brother.id}
                                          value={brother.nome}
                                          onSelect={() => {
                                            setValue("memberMoradorId", brother.id)
                                          }}
                                        >
                                          <div className="flex flex-1 items-start flex-col">
                                            <p>{brother.nome}</p>
                                            <div className="flex items-center gap-2">
                                              <p className="text-xs text-muted-foreground">
                                                {brother.carreira || brother.estado}
                                              </p>
                                              <Badge
                                                variant="outline"
                                                className={`rounded-full flex items-center justify-center h-5 w-5 text-xs ${setThemeColor(index)}`}
                                              >
                                                {
                                                  brother.MinisteriooradorMembroMorador.filter(
                                                    (des) => des.name === watch("name"),
                                                  ).length
                                                }
                                              </Badge>
                                            </div>
                                          </div>
                                          <Check
                                            className={cn(
                                              "ml-auto h-4 w-4",
                                              field.value === brother.id ? "opacity-100" : "opacity-0",
                                            )}
                                          />
                                        </CommandItem>
                                      ))}
                                    </CommandGroup>
                                  </CommandList>
                                </Command>
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <QTDsDesignation
                        isPermitted={isDiscursoOrExplicarCrenca && lessonPoint !== "" && memberMoradorId !== ""}
                        QTDSMembro={QTDSMorador ?? 0}
                        lesson={lessonPoint ?? ""}
                      />
                    </div>

                    {/* Morador Suplente Section */}
                    <div className="space-y-4 bg-card rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium flex items-center gap-2">
                          <Badge variant="outline" className="rounded-full">
                            Suplente
                          </Badge>
                          Morador Suplente
                        </h3>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                              <AlertCircle className="h-3 w-3" /> Voluntário
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Caso haja um conveniente, atribua um voluntário</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>

                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage src="/avatar/01.png" alt="Avatar" />
                          <AvatarFallback className="uppercase bg-primary/10 text-primary">
                            {memberMoradorSuplente ? memberMoradorSuplente.nome.slice(0, 2) : "?"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">
                            {memberMoradorSuplente?.nome || "Não Selecionado"}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {memberMoradorSuplente?.contacto || "+244 ___________"}
                          </p>
                        </div>
                      </div>

                      <FormField
                        control={control}
                        name="memberMoradorSuplenteId"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel className="text-xs text-muted-foreground mb-1">
                              Selecione o irmão suplente
                            </FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    role="combobox"
                                    className={cn("w-full justify-between", !field.value && "text-muted-foreground")}
                                    disabled={!memberMoradorId}
                                  >
                                    {field.value
                                      ? brothers?.find((brother) => brother.id === field.value)?.nome
                                      : memberMoradorId
                                        ? "Selecionar irmão..."
                                        : "Selecione o morador primeiro"}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-[300px] p-0">
                                <Command>
                                  <CommandInput placeholder="Buscar irmão..." />
                                  <CommandList>
                                    <CommandEmpty>Nenhum irmão encontrado.</CommandEmpty>
                                    <CommandGroup>
                                      {filteredMorador.map((brother, index) => (
                                        <CommandItem
                                          key={brother.id}
                                          value={brother.nome}
                                          onSelect={() => {
                                            setValue("memberMoradorSuplenteId", brother.id)
                                          }}
                                        >
                                          <div className="flex flex-1 items-start flex-col">
                                            <p>{brother.nome}</p>
                                            <div className="flex items-center gap-2">
                                              <p className="text-xs text-muted-foreground">
                                                {brother.carreira || brother.estado}
                                              </p>
                                              <Badge
                                                variant="outline"
                                                className={`rounded-full flex items-center justify-center h-5 w-5 text-xs ${setThemeColor(index)}`}
                                              >
                                                {
                                                  brother.MinisterioSuplenteMembroMorador.filter(
                                                    (des) => des.name === watch("name"),
                                                  ).length
                                                }
                                              </Badge>
                                            </div>
                                          </div>
                                          <Check
                                            className={cn(
                                              "ml-auto h-4 w-4",
                                              field.value === brother.id ? "opacity-100" : "opacity-0",
                                            )}
                                          />
                                        </CommandItem>
                                      ))}
                                    </CommandGroup>
                                  </CommandList>
                                </Command>
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <QTDsDesignation
                        isPermitted={isDiscursoOrExplicarCrenca && lessonPoint !== "" && memberMoradorSuplenteId !== ""}
                        QTDSMembro={QTDSMoradorSuplente ?? 0}
                        lesson={lessonPoint ?? ""}
                      />
                    </div>

                    {/* Lesson Point Section */}
                    <div className="space-y-4 bg-card rounded-lg border p-4 md:col-span-2">
                      <h3 className="text-sm font-medium flex items-center gap-2">
                        <BookOpen className="h-4 w-4" />
                        Detalhes da Lição
                      </h3>

                      {isDiscursoOrExplicarCrenca ? (
                        <div className="space-y-4">
                          <FormField
                            control={control}
                            name="lessonPoint"
                            render={({ field }) => (
                              <FormItem className="flex flex-col">
                                <FormLabel className="text-xs text-muted-foreground mb-1">
                                  Selecione ponto de conselho
                                </FormLabel>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <FormControl>
                                      <Button
                                        variant="outline"
                                        role="combobox"
                                        className={cn(
                                          "w-full justify-between",
                                          !field.value && "text-muted-foreground",
                                        )}
                                      >
                                        {field.value ? (
                                          <span className="flex items-center gap-2">
                                            <Badge className="rounded-full" variant="outline">
                                              {BookTH?.find(({ lesson }) => lesson.toString() === field.value)?.lesson}
                                            </Badge>
                                            <span>
                                              {BookTH?.find(({ lesson }) => lesson.toString() === field.value)?.name}
                                            </span>
                                          </span>
                                        ) : (
                                          "Selecionar ponto..."
                                        )}
                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                      </Button>
                                    </FormControl>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-[300px] p-0">
                                    <Command>
                                      <CommandInput placeholder="Buscar pontos..." />
                                      <CommandList>
                                        <CommandEmpty>Nenhum ponto encontrado.</CommandEmpty>
                                        <CommandGroup>
                                          {BookTH?.map(({ lesson, name }) => (
                                            <CommandItem
                                              key={lesson}
                                              value={lesson.toString()}
                                              onSelect={() => {
                                                setValue("lessonPoint", lesson.toString())
                                              }}
                                            >
                                              <div className="flex flex-1 items-start flex-col">
                                                <p>{name}</p>
                                                <div className="flex items-center gap-2">
                                                  <p className="text-xs text-muted-foreground">Ponto de conselho:</p>
                                                  <Badge
                                                    variant="outline"
                                                    className={`rounded-full flex items-center justify-center h-5 w-5 text-xs ${setThemeColor(lesson)}`}
                                                  >
                                                    {lesson}
                                                  </Badge>
                                                </div>
                                              </div>
                                              <Check
                                                className={cn(
                                                  "ml-auto h-4 w-4",
                                                  field.value === lesson.toString() ? "opacity-100" : "opacity-0",
                                                )}
                                              />
                                            </CommandItem>
                                          ))}
                                        </CommandGroup>
                                      </CommandList>
                                    </Command>
                                  </PopoverContent>
                                </Popover>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={control}
                            name="tema"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-xs text-muted-foreground mb-1">Tema</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Digite o tema da apresentação"
                                    {...field}
                                    className="focus-visible:ring-1"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {fields.map((field, index) => (
                            <div
                              key={field.id}
                              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-3 bg-muted/40 rounded-md"
                            >
                              <FormField
                                control={control}
                                name={`bookImd.${index}.number`}
                                render={({ field }) => (
                                  <FormItem className="flex-1 w-full sm:w-auto">
                                    <FormLabel
                                      className={cn("text-xs text-muted-foreground mb-1", index !== 0 && "sr-only")}
                                    >
                                      Lição
                                    </FormLabel>
                                    <Select
                                      onValueChange={field.onChange}
                                      defaultValue={field.value || "Selecionar o ponto..."}
                                    >
                                      <FormControl>
                                        <SelectTrigger>
                                          <SelectValue placeholder="Selecione a lição" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        {bookImd.map((book) => (
                                          <SelectItem key={book.number} value={book.number ?? ""}>
                                            <div className="flex items-center gap-x-2">
                                              <Badge className="rounded-full" variant="destructive">
                                                {book.number}
                                              </Badge>
                                              <span>{book.name}</span>
                                            </div>
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={control}
                                name={`bookImd.${index}.points.${index}.point`}
                                render={({ field }) => (
                                  <FormItem className="flex-1 w-full sm:w-auto">
                                    <FormLabel
                                      className={cn("text-xs text-muted-foreground mb-1", index !== 0 && "sr-only")}
                                    >
                                      Pontos
                                    </FormLabel>
                                    <Select
                                      onValueChange={field.onChange}
                                      defaultValue={field.value || "Selecionar o ponto..."}
                                    >
                                      <FormControl>
                                        <SelectTrigger>
                                          <SelectValue placeholder="Selecione o ponto" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        {bookImd
                                          .find((data) => data.number === watch(`bookImd.${index}.number`))
                                          ?.points.map((book) => (
                                            <SelectItem key={book.point} value={book.point?.toString() ?? ""}>
                                              <div className="flex items-center gap-x-2 text-ellipsis max-w-full">
                                                <Badge className="rounded-full" variant="secondary">
                                                  {book.point}
                                                </Badge>
                                                <span className="truncate">{book.name}</span>
                                              </div>
                                            </SelectItem>
                                          ))}
                                      </SelectContent>
                                    </Select>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                className="p-2 rounded-full mt-6 sm:mt-0"
                                onClick={() => remove(index)}
                              >
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Remover ponto</span>
                              </Button>
                            </div>
                          ))}

                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="mt-2"
                            onClick={() =>
                              append({
                                number: "1",
                                points: [{ point: "3", subpoint: [] }],
                              })
                            }
                          >
                            <PlusCircle className="h-4 w-4 mr-2" />
                            Adicionar ponto
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </TabsContent>
              )}
            </Tabs>
          </CardContent>

          <CardFooter className="flex justify-between border-t p-6 bg-muted/40">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="rounded-full h-10 w-10"
                    onClick={handleAutoAssign}
                    disabled={isAutoAssigning || !brothers || brothers.length < 2}
                  >
                    <Sparkles className={cn("h-5 w-5", isAutoAssigning && "animate-pulse text-primary")} />
                    <span className="sr-only">Atribuição automática</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Atribuir irmãos automaticamente</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <div className="flex gap-2">
              <Button
                type="submit"
                disabled={
                  isSubmitting ||
                  !memberDirigenteId ||
                  !memberDirigenteSuplenteId ||
                  (isDiscursoOrExplicarCrenca && (!memberMoradorId || !lessonPoint))
                }
                className="gap-2"
              >
                {isSubmitting ? <Loader className="h-4 w-4 animate-spin" /> : <UserPlus className="h-4 w-4" />}
                {isSubmitting ? "Salvando..." : "Salvar Designação"}
              </Button>
            </div>
          </CardFooter>
        </form>
      </FormProvider>
    </Card>
  )
}

export default MinisterioPage

