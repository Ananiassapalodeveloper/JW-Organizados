/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import {
  AlertCircle,
  Check,
  ChevronsUpDown,
  Loader,
  MagnetIcon,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
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
import { setThemeColor } from "../../Meetingype";
import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { useFetch } from "@/hooks/useFetch";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { api } from "@/hooks/use-membro-form-data";
import { toast } from "@/hooks/use-toast";
import { AxiosError } from "axios";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  type PartesIniciasDono,
  PartesIniciasSchema,
  type PresidenteType,
  type presidentType,
} from "@/types/reuniaoMeioSemanaDTO/type";
import { useAutoAssignment } from "@/hooks/useAutoAssignment";
import { PresidentEndPrayingSkeleton } from "@/components/PresidentEndPrayingSkeleton";

const defaultValues: Partial<PartesIniciasDono> = {
  name: "Presidente",
  memberId: "",
  ReunioesDatesId: "",
  suplenteMemberId: "",
};

export function FinalParts({ params }: { params: { id: string } }) {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isAutoAssigning, setIsAutoAssigning] = useState(false);

  const {
    data: brothers,
    error,
    isLoading,
  } = useFetch<presidentType[]>("brothers");
  const { data: existingDesignation, isLoading: isLoadingDesignation } =
    useFetch<PresidenteType>(`partesFinais/${params.id}`);

  const form = useForm<PartesIniciasDono>({
    resolver: zodResolver(PartesIniciasSchema),
    defaultValues: {
      ...defaultValues,
      ReunioesDatesId: params.id,
    },
    mode: "onChange",
  });

  // Preenche o formulário quando os dados existentes são carregados
  useEffect(() => {
    if (existingDesignation) {
      form.reset({
        ...defaultValues,
        ReunioesDatesId: params?.id,
        memberId: existingDesignation?.membro?.id,
        suplenteMemberId: existingDesignation?.suplenteMembro?.id,
        name: existingDesignation?.name || "Presidente",
      });
    }
  }, [existingDesignation, params.id, form]);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { isSubmitting },
  } = form;

  // Get current selected values
  const selectedPresidentId = watch("memberId");
  const selectedPrayerId = watch("suplenteMemberId");

  // Memoized values for performance
  const selectedPresident = useMemo(() => {
    return brothers?.find((brother) => brother.id === selectedPresidentId);
  }, [brothers, selectedPresidentId]);

  const selectedPrayer = useMemo(() => {
    return brothers?.find((brother) => brother.id === selectedPrayerId);
  }, [brothers, selectedPrayerId]);

  const filteredBrothers = useMemo(() => {
    return (
      brothers?.filter((brother) => brother.id !== selectedPresidentId) || []
    );
  }, [brothers, selectedPresidentId]);

  // Custom hook for auto assignment
  const { autoAssign } = useAutoAssignment({
    brothers: brothers || [],
    setPresidentId: (id) => setValue("memberId", id),
    setPrayerId: (id) => setValue("suplenteMemberId", id),
  });

  const handleAutoAssign = async () => {
    setIsAutoAssigning(true);
    await autoAssign();
    setIsAutoAssigning(false);
  };

  // Form submission handler
  async function onSubmit(values: PartesIniciasDono) {
    try {
      setSubmitError(null);

      // Preparar os dados
      const formData = {
        name: values.name,
        memberId: values.memberId,
        suplenteMemberId: values.suplenteMemberId,
        ReunioesDatesId: params.id,
      };

      if (existingDesignation) {
        // Atualiza o registro existente
        await api.patch(`partesFinais`, formData);
        toast({
          title: "Designação atualizada com sucesso",
          variant: "default",
        });
      } else {
        // Cria um novo registro
        await api.post("partesFinais", formData);
        toast({
          title: "Designação registrada com sucesso",
          description: "Os irmãos foram designados para as partes.",
          variant: "default",
        });
      }
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
  }

  if (error) {
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

  if (isLoading || isLoadingDesignation) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center">
            Oração final
          </CardTitle>
          <CardDescription>
            Selecione os irmãos para respectiva designação
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PresidentEndPrayingSkeleton />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          Oração final
        </CardTitle>
        <CardDescription>
          Selecione os irmãos para respectiva designação
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6 w-full">
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {submitError && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Erro</AlertTitle>
                <AlertDescription>{submitError}</AlertDescription>
              </Alert>
            )}

            {/* Presidente Section */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Oração final</h3>

              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src="/avatar/01.png" alt="Avatar" />
                  <AvatarFallback className="uppercase">
                    {selectedPresident
                      ? selectedPresident.nome.slice(0, 2)
                      : "?"}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {selectedPresident?.nome || "Não Selecionado"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {selectedPresident?.contacto || "+244 ___________"}
                  </p>
                </div>
              </div>

              <FormField
                control={control}
                name="memberId"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Selecione o irmão para oração inicial</FormLabel>
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
                                      <span
                                        className={`rounded-full flex items-center justify-center h-5 w-5 text-xs ${setThemeColor(
                                          index
                                        )}`}
                                      >
                                        {brother._count.PartesIniciasDono}
                                      </span>
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

            {/* Oração Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-medium">Suplente</h3>
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
                  <AvatarFallback className="uppercase">
                    {selectedPrayer ? selectedPrayer.nome.slice(0, 2) : "?"}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {selectedPrayer?.nome || "Não Selecionado"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {selectedPrayer?.contacto || "+244 ___________"}
                  </p>
                </div>
              </div>

              <FormField
                control={control}
                name="suplenteMemberId"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Selecione o irmão para oração</FormLabel>
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
                            disabled={!selectedPresidentId}
                          >
                            {field.value
                              ? brothers?.find(
                                  (brother) => brother.id === field.value
                                )?.nome
                              : selectedPresidentId
                              ? "Selecionar irmão..."
                              : "Selecione o presidente primeiro"}
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
                              {filteredBrothers.map((brother, index) => (
                                <CommandItem
                                  key={brother.id}
                                  value={brother.nome}
                                  onSelect={() => {
                                    setValue("suplenteMemberId", brother.id);
                                  }}
                                >
                                  <div className="flex flex-1 items-start flex-col">
                                    <p>{brother.nome}</p>
                                    <div className="flex items-center gap-2">
                                      <p className="text-xs text-muted-foreground">
                                        {brother.carreira || brother.estado}
                                      </p>
                                      <span
                                        className={`rounded-full flex items-center justify-center h-5 w-5 text-xs ${setThemeColor(
                                          index
                                        )}`}
                                      >
                                        {brother._count.PartesIniciasSuplente}
                                      </span>
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

            <div className="flex justify-between">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type="button"
                      size="icon"
                      className="rounded-full"
                      onClick={handleAutoAssign}
                      disabled={
                        isAutoAssigning || !brothers || brothers.length < 2
                      }
                    >
                      <MagnetIcon
                        size={20}
                        className={cn(isAutoAssigning && "animate-pulse")}
                      />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Atribuir designação de forma automática</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <Button
                type="submit"
                disabled={
                  isSubmitting || !selectedPresidentId || !selectedPrayerId
                }
              >
                {isSubmitting ? (
                  <>
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  "Salvar Designação"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
