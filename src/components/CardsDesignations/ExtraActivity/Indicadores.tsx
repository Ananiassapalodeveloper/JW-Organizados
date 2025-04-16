/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useMemo, useCallback} from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import {
  AlertCircle,
  Check,
  ChevronsUpDown,
  Clock,
  Loader,
  UserPlus,
  Sparkles,
  BookOpen,
} from "lucide-react";

// UI Components
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

// Custom Components
import { PresidentEndPrayingSkeleton } from "@/components/PresidentEndPrayingSkeleton";

// Hooks and Utilities
import { useFetch } from "@/hooks/useFetch";
import { useAutoAssignment } from "@/hooks/useAutoAssignment";
import { api } from "@/hooks/use-membro-form-data";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { SetThemeColor } from "@/lib/color";
import { CompletedDisignation } from "@/lib/isCompleted";

// Data and Types
import { type presidentType as BrothersType } from "@/types/reuniaoMeioSemanaDTO/type";
import { RemoverDesignacaoDialog } from "@/components/ReuniaoDesignacaoExtra/RemoverIndicadores/removedor-designacao-dialog";
import { indicadoresSchema, IndicadorType } from "@/types/ExtraActivityDTO/IndicadorType/type";
import { indicadoresValueType } from "@/services/indicadoresData/data";

const defaultValues: Partial<IndicadorType> = {
  name: "sectorA",
  ReunioesDatesId: "",
  memberId: "",
  suplenteMemberId: ""
};

export function Indicadores({ params }: { params: { id: string|undefined } }) {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isAutoAssigning, setIsAutoAssigning] = useState(false);

  // Fetch data
  const {
    data: brothers,
    error,
    isLoading,
    mutate: BroMutate,
  } = useFetch<BrothersType[]>("brothers");

  const {
    data: Indicadores,
    error: IndicadoresError,
    isLoading: IndicadoresLoading,
    mutate,
  } = useFetch<any>(`indicadores/${params.id}`);

  // Form setup
  const methods = useForm<IndicadorType>({
    resolver: zodResolver(indicadoresSchema),
    defaultValues: {
      ...defaultValues,
     ReunioesDatesId:params.id
    },
    mode: "onChange",
  });

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { isSubmitting },
  } = methods;

  // Watched values
  const memberIndicadorId = watch("memberId");
  const memberIndicadorSuplenteId = watch("suplenteMemberId");
  const id = watch("ReunioesDatesId") as string;
  const NameDesignation = watch("name");

  // Memoized values for performance
  const memberIndicador = useMemo(() => {
    return brothers?.find((brother) => brother.id === memberIndicadorId);
  }, [brothers, memberIndicadorId]);

  const memberIndicadorSuplente = useMemo(() => {
    return brothers?.find(
      (brother) => brother.id === memberIndicadorSuplenteId
    );
  }, [brothers, memberIndicadorSuplenteId]);

  // Filtered lists for dropdowns
  const filteredIndicadorBrothers = useMemo(() => {
    return (
      brothers?.filter((brother) => brother.id !== memberIndicadorId) || []
    );
  }, [brothers, memberIndicadorId]);

  // Auto assignment hooks
  const { autoAssign } = useAutoAssignment({
    brothers: brothers || [],
    setPresidentId: (id) => setValue("memberId", id),
    setPrayerId: (id) => setValue("suplenteMemberId", id),
  });

  // Auto assignment handlers
  const handleAutoAssign = useCallback(async () => {
    setIsAutoAssigning(true);
    autoAssign();
    setIsAutoAssigning(false);
  }, [autoAssign]);

  // Form submission handler
  const onSubmit = useCallback(
    async (values: IndicadorType) => {
      try {
        setSubmitError(null);

        // Preparar os dados
        const formData = {
          name: values.name,
          memberId: values.memberId,
          suplenteMemberId: values.suplenteMemberId,
          ReunioesDatesId: params.id,
        };

        // Cria um novo registro
        await api.post("indicadores", formData);
        toast({
          title: "Designação registrada com sucesso",
          description: "Os irmãos foram designados para as partes.",
          variant: "default",
        });
        mutate(`indicadores/${params.id}`);
        BroMutate();
      } catch (error) {
        if (error instanceof AxiosError) {
          const errorMessage =
            error.response?.data?.error || "Erro ao registrar a designação";
          setSubmitError(errorMessage);

          toast({
            title: "Erro ao registrar a designação",
            description: errorMessage,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Erro inesperado",
            description:
              "Ocorreu um erro inesperado. Tente novamente mais tarde.",
            variant: "destructive",
          });
        }
      }
    },
    [BroMutate, mutate, params.id]
  );

  // Loading and error states
  if (error || IndicadoresError) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Erro</AlertTitle>
        <AlertDescription>
          Não foi possível carregar os dados dos irmãos. Por favor, tente
          novamente.
        </AlertDescription>
      </Alert>
    );
  }

  if (isLoading || IndicadoresLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Loader className="h-4 w-4 mr-2 animate-spin" />
            Carregando designações
          </CardTitle>
          <CardDescription>
            Aguarde enquanto carregamos os dados...
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PresidentEndPrayingSkeleton />
        </CardContent>
      </Card>
    );
  }

  // Calculate form completion percentage
  const formCompletionPercentage = (() => {
    const total = 2; // Indicador and Indicador Suplente are always required
    let completed = 0;

    if (memberIndicadorId) completed++;
    if (memberIndicadorSuplenteId) completed++;

   

    return Math.round((completed / total) * 100);
  })();

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
                          {indicadoresValueType.map((data) => (
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
            <CardDescription className="mt-1">
              Atribua irmãos para esta designação
            </CardDescription>
          </div>

          <div className="flex items-center gap-2">
            <Badge
              className={cn(
                "rounded-full",
                CompletedDisignation(Indicadores?.length >= 3)
              )}
              variant="secondary"
            >
              {Indicadores?.length || 0} designações
            </Badge>
            <RemoverDesignacaoDialog id={id} />
          </div>
        </div>

        <Progress
          value={formCompletionPercentage}
          className={cn(
            "h-1 mt-4",
            formCompletionPercentage === 100 ? "bg-green-500" : "bg-blue-500"
          )}
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Indicador Section */}
              <div className="space-y-4 bg-card rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium flex items-center gap-2">
                    <Badge variant="outline" className="rounded-full">
                      Principal
                    </Badge>
                    Indicador
                  </h3>
                </div>

                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src="/avatar/01.png" alt="Avatar" />
                    <AvatarFallback className="uppercase bg-primary/10 text-primary">
                      {memberIndicador ? memberIndicador.nome.slice(0, 2) : "?"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {memberIndicador?.nome || "Não Selecionado"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {memberIndicador?.contacto || "+244 ___________"}
                    </p>
                  </div>
                </div>

                <FormField
                  control={control}
                  name="memberId"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="text-xs text-muted-foreground mb-1">
                        Selecione o irmão Indicador
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "w-full justify-between",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value
                                ? brothers?.find(
                                    (brother) => brother.id === field.value
                                  )?.nome
                                : "Selecionar irmão..."}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[300px] p-0">
                          <Command>
                            <CommandInput placeholder="Buscar irmão..." />
                            <CommandList>
                              <CommandEmpty>
                                Nenhum irmão encontrado.
                              </CommandEmpty>
                              <CommandGroup>
                                {brothers?.map((brother, index) => (
                                  <CommandItem
                                    key={brother.id}
                                    value={brother.nome}
                                    onSelect={() => {
                                      setValue("memberId", brother.id);
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
                                          className={`rounded-full flex items-center justify-center h-5 w-5 text-xs ${SetThemeColor(
                                            index
                                          )}`}
                                        >
                                          {
                                            brother.IndicadoresParteMembro?.filter(
                                              (des) =>
                                                des.name === NameDesignation
                                            ).length
                                          }
                                        </Badge>
                                      </div>
                                    </div>
                                    <Check
                                      className={cn(
                                        "ml-auto h-4 w-4",
                                        field.value === brother.id
                                          ? "opacity-100"
                                          : "opacity-0"
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
              </div>

              {/* Indicador Suplente Section */}
              <div className="space-y-4 bg-card rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium flex items-center gap-2">
                    <Badge variant="outline" className="rounded-full">
                      Suplente
                    </Badge>
                    Indicador Suplente
                  </h3>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger
                        type="button"
                        className="inline-flex items-center gap-1 text-xs text-muted-foreground"
                      >
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
                      {memberIndicadorSuplente
                        ? memberIndicadorSuplente.nome.slice(0, 2)
                        : "?"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {memberIndicadorSuplente?.nome || "Não Selecionado"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {memberIndicadorSuplente?.contacto || "+244 ___________"}
                    </p>
                  </div>
                </div>

                <FormField
                  control={control}
                  name="suplenteMemberId"
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
                              className={cn(
                                "w-full justify-between",
                                !field.value && "text-muted-foreground"
                              )}
                              disabled={!memberIndicadorId}
                            >
                              {field.value
                                ? brothers?.find(
                                    (brother) => brother.id === field.value
                                  )?.nome
                                : memberIndicadorId
                                ? "Selecionar irmão..."
                                : "Selecione o Indicador primeiro"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[300px] p-0">
                          <Command>
                            <CommandInput placeholder="Buscar irmão..." />
                            <CommandList>
                              <CommandEmpty>
                                Nenhum irmão encontrado.
                              </CommandEmpty>
                              <CommandGroup>
                                {filteredIndicadorBrothers.map(
                                  (brother, index) => (
                                    <CommandItem
                                      key={brother.id}
                                      value={brother.nome}
                                      onSelect={() => {
                                        setValue(
                                          "suplenteMemberId",
                                          brother.id
                                        );
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
                                            className={`rounded-full flex items-center justify-center h-5 w-5 text-xs ${SetThemeColor(
                                              index
                                            )}`}
                                          >
                                            {
                                              brother.IndicadoresParteSuplente.filter(
                                                (des) =>
                                                  des.name === NameDesignation
                                              ).length
                                            }
                                          </Badge>
                                        </div>
                                      </div>
                                      <Check
                                        className={cn(
                                          "ml-auto h-4 w-4",
                                          field.value === brother.id
                                            ? "opacity-100"
                                            : "opacity-0"
                                        )}
                                      />
                                    </CommandItem>
                                  )
                                )}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
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
                    disabled={
                      isAutoAssigning || !brothers || brothers.length < 2
                    }
                  >
                    <Sparkles
                      className={cn(
                        "h-5 w-5",
                        isAutoAssigning && "animate-pulse text-primary"
                      )}
                    />
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
                  !memberIndicadorId ||
                  !memberIndicadorSuplenteId
                }
                className="gap-2"
              >
                {isSubmitting ? (
                  <Loader className="h-4 w-4 animate-spin" />
                ) : (
                  <UserPlus className="h-4 w-4" />
                )}
                {isSubmitting ? "Salvando..." : "Salvar Designação"}
              </Button>
            </div>
          </CardFooter>
        </form>
      </FormProvider>
    </Card>
  );
}
