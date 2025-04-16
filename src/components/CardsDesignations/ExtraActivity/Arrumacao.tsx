/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useCallback } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import {
  AlertCircle,
  Check,
  ChevronsUpDown,
  Loader,
  UserPlus,
} from "lucide-react";

// UI Components
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
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

// Custom Components
import { PresidentEndPrayingSkeleton } from "@/components/PresidentEndPrayingSkeleton";

// Hooks and Utilities
import { useFetch } from "@/hooks/useFetch";
import { api, useMembroFormData } from "@/hooks/use-membro-form-data";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { CompletedDisignation } from "@/lib/isCompleted";

// Data and Types
import { RemoverDesignacaoDialog } from "@/components/ReuniaoDesignacaoExtra/RemoverArrumacao/removedor-designacao-dialog";
import {
  arrumacaoSchema,
  ArrumacaoType,
} from "@/types/ExtraActivityDTO/ArrumacaoType/type";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { SetThemeColor } from "@/lib/color";

const defaultValues: Partial<ArrumacaoType> = {
  ReunioesDatesId: "",
  grupoId: "",
  name: "",
};

export function ArrumacaoPage({ params }: { params: { id: string|undefined } }) {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { id: ReuniaoDateId } = params;
  const {
    data: arrumacao,
    error: arrumacaoError,
    isLoading: arrumacaoLoading,
    mutate,
  } = useFetch<any>(`arrumacao/${ReuniaoDateId}`);
  const { grupos, isLoading, error: dataError } = useMembroFormData();

  // Form setup
  const methods = useForm<ArrumacaoType>({
    resolver: zodResolver(arrumacaoSchema),
    defaultValues: {
      ...defaultValues,
      ReunioesDatesId: params.id,
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
  const id = watch("ReunioesDatesId") as string;
  // const MettingName = watch("name");
  const GrupoId = watch("grupoId");

  // Form submission handler
  const onSubmit = useCallback(
    async (values: ArrumacaoType) => {
      try {
        setSubmitError(null);

        // Preparar os dados
        const formData = {
          name: values.name,
          ReunioesDatesId: params.id,
          grupoId: values.grupoId,
        };

        // Cria um novo registro
        await api.post("arrumacao", formData);
        toast({
          title: "Arrumação registrada com sucesso",
          description: "Os irmãos foram designados para as partes.",
          variant: "default",
        });
        mutate(`arrumacao/${params.id}`);
      } catch (error) {
        if (error instanceof AxiosError) {
          const errorMessage =
            error.response?.data?.error || "Erro ao registrar a Arrumação";
          setSubmitError(errorMessage);

          toast({
            title: "Erro ao registrar a Arrumação",
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
    [mutate, params.id]
  );

  // Loading and error states
  if (arrumacaoError || dataError) {
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

  if (arrumacaoLoading || isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Loader className="h-4 w-4 mr-2 animate-spin" />
            Carregando Arrumação
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

  return (
    <Card className="w-full overflow-hidden border shadow-sm">
      <CardHeader className="bg-muted/40 pb-2">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <CardTitle className="text-xl flex items-center gap-2">
              <h1 className="border-0 text-lg font-semibold bg-transparent p-0 h-auto w-auto min-w-[180px]">
                Designação do grupo
              </h1>
            </CardTitle>
            <CardDescription className="mt-1">
              Regista a Arrumação para esta semana
            </CardDescription>
          </div>

          <div className="flex items-center gap-2">
            <Badge
              className={cn(
                "rounded-full",
                CompletedDisignation(arrumacao?.length >= 2)
              )}
              variant="secondary"
            >
              {arrumacao?.length || 0} Arrumação
            </Badge>
            <RemoverDesignacaoDialog id={id} />
          </div>
        </div>
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
              {/* Arrumação Section */}
              <div className="space-y-4 bg-card rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium flex items-center gap-2">
                    <Badge variant="outline" className="rounded-full">
                      Arrumação
                    </Badge>
                    Seleciona o grupo para arrumação
                  </h3>
                </div>

                <FormField
                  control={control}
                  name="grupoId"
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
                            >
                              {field.value
                                ? grupos.find(
                                    (brother) => brother.id === field.value
                                  )?.nome
                                : GrupoId
                                ? "Selecionar o grupo..."
                                : "Selecione o grupo primeiro"}
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
                                {grupos.map((grupo, index) => (
                                  <CommandItem
                                    key={grupo.id}
                                    value={grupo.nome}
                                    onSelect={() => {
                                      setValue("grupoId", grupo.id);
                                    }}
                                  >
                                    <div className="flex flex-1 items-start flex-col">
                                      <p>{grupo.nome}</p>
                                      <div className="flex items-center gap-2">
                                        <p className="text-xs text-muted-foreground">
                                          número de membros:{" "}
                                          {grupo._count.membros}
                                        </p>
                                        <Badge
                                          variant="outline"
                                          className={`rounded-full flex items-center justify-center h-5 w-5 text-xs ${SetThemeColor(
                                            index % 5
                                          )}`}
                                        >
                                          {grupo._count.Arrumacao}
                                        </Badge>
                                      </div>
                                    </div>
                                    <Check
                                      className={cn(
                                        "ml-auto h-4 w-4",
                                        field.value === grupo.id
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
            </div>
          </CardContent>

          <CardFooter className="flex justify-between border-t p-6 bg-muted/40">
            <div className="flex gap-2">
              <Button type="submit" disabled={isSubmitting} className="gap-2">
                {isSubmitting ? (
                  <Loader className="h-4 w-4 animate-spin" />
                ) : (
                  <UserPlus className="h-4 w-4" />
                )}
                {isSubmitting ? "Salvando..." : "Salvar Arrumação"}
              </Button>
            </div>
          </CardFooter>
        </form>
      </FormProvider>
    </Card>
  );
}
