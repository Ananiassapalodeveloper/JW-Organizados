/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useMemo, useCallback } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { AlertCircle, Clock, Loader, UserPlus } from "lucide-react";

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

// Custom Components
import { PresidentEndPrayingSkeleton } from "@/components/PresidentEndPrayingSkeleton";

// Hooks and Utilities
import { useFetch } from "@/hooks/useFetch";
import { api } from "@/hooks/use-membro-form-data";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { CompletedDisignation } from "@/lib/isCompleted";

// Data and Types
import { RemoverDesignacaoDialog } from "@/components/ReuniaoDesignacaoExtra/RemoverAssistencia/removedor-designacao-dialog";
import { assistenciaValueType } from "@/services/assistenciaData/data";
import {
  assistenciaSchema,
  AssistenciaType,
} from "@/types/ExtraActivityDTO/AssistenciaType/type";
import { Input } from "@/components/ui/input";
import { AssistenciaEnum } from "@prisma/client";

const defaultValues: Partial<AssistenciaType> = {
  name: "fimDeSemana",
  ReunioesDatesId: "",
  quantidade: "0",
};

export function AssistenciaPage({
  params,
}: {
  params: { id: string|undefined; MeettingName: AssistenciaEnum };
}) {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { MeettingName, id: ReuniaoDateId } = params;
  const {
    data: assistencia,
    error: assistenciaError,
    isLoading: assistenciaLoading,
    mutate,
  } = useFetch<any>(`assistencia/${ReuniaoDateId}`);

  // Form setup
  const methods = useForm<AssistenciaType>({
    resolver: zodResolver(assistenciaSchema),
    defaultValues: {
      ...defaultValues,
      ReunioesDatesId: params.id,
      name: MeettingName,
    },
    mode: "onChange",
  });

  const {
    control,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = methods;

  // Watched values
  const id = watch("ReunioesDatesId") as string;
  // const MettingName = watch("name");
  const Quantidade = watch("quantidade");

  //memoized values
  const Name = useMemo(
    () => assistenciaValueType.find((a) => a.value === MeettingName),
    [MeettingName]
  );

  // Form submission handler
  const onSubmit = useCallback(
    async (values: AssistenciaType) => {
      try {
        setSubmitError(null);

        // Preparar os dados
        const formData = {
          name: MeettingName,
          ReunioesDatesId: params.id,
          quantidade:values.quantidade
        };

        // Cria um novo registro
        await api.post("assistencia", formData);
        toast({
          title: "assistência registrada com sucesso",
          description: "Os irmãos foram designados para as partes.",
          variant: "default",
        });
        mutate(`assistencia/${params.id}`);
      } catch (error) {
        if (error instanceof AxiosError) {
          const errorMessage =
            error.response?.data?.error || "Erro ao registrar a assistência";
          setSubmitError(errorMessage);

          toast({
            title: "Erro ao registrar a assistência",
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
    [MeettingName, mutate, params.id]
  );

  // Loading and error states
  if (assistenciaError) {
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

  if (assistenciaLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Loader className="h-4 w-4 mr-2 animate-spin" />
            Carregando assistência
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
                {Name?.name}
              </h1>
            </CardTitle>
            <CardDescription className="mt-1">
              Regista a assistência para esta semana
            </CardDescription>
          </div>

          <div className="flex items-center gap-2">
            <Badge
              className={cn(
                "rounded-full",
                CompletedDisignation(assistencia?.length >= 2)
              )}
              variant="secondary"
            >
              {assistencia?.length || 0} assistência
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
              {/* Assistência Section */}
              <div className="space-y-4 bg-card rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium flex items-center gap-2">
                    <Badge variant="outline" className="rounded-full">
                      Assistência
                    </Badge>
                    {Name?.name || MeettingName}
                  </h3>
                </div>

                <FormField
                  control={control}
                  name="quantidade"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs text-muted-foreground mb-1">
                        Assistência
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Digite a Assistência"
                          className="focus-visible:ring-1"
                          type="number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex justify-between border-t p-6 bg-muted/40">
            <div className="flex gap-2">
              <Button
                type="submit"
                disabled={isSubmitting || !Quantidade}
                className="gap-2"
              >
                {isSubmitting ? (
                  <Loader className="h-4 w-4 animate-spin" />
                ) : (
                  <UserPlus className="h-4 w-4" />
                )}
                {isSubmitting ? "Salvando..." : "Salvar assistência"}
              </Button>
            </div>
          </CardFooter>
        </form>
      </FormProvider>
    </Card>
  );
}
