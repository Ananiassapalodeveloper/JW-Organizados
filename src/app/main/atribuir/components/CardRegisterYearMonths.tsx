/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { mutate } from "swr";
import { AxiosError } from "axios";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
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
import { Textarea } from "@/components/ui/textarea";
import { DialogClose } from "@radix-ui/react-dialog";
import { toast } from "@/hooks/use-toast";
import { api } from "@/hooks/use-membro-form-data";
import { schemaReunioes, type typeSchemaReunioes } from "@/types/reuniaotypes";

// Valores padrão para o formulário
const defaultValues: Partial<typeSchemaReunioes> = {
  descricao: "",
};

type CardRegisterYearMonthsProps = {
  onSuccess?: () => void;
};

export function CardRegisterYearMonths({
  onSuccess,
}: CardRegisterYearMonthsProps) {
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<typeSchemaReunioes>({
    resolver: zodResolver(schemaReunioes),
    defaultValues,
    mode: "onChange",
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = form;

  async function onSubmit(values: typeSchemaReunioes) {
    try {
      setSubmitError(null);

      const formData = {
        ano: Number(values.ano),
        descricao: values.descricao,
      };

      await api.post("ano", formData);

      // Atualiza o cache do GET
      mutate("ano");

      toast({
        title: "Ano registrado com sucesso",
        description: "O novo ano foi adicionado ao sistema.",
        variant: "default",
      });

      reset(defaultValues);

      // Chama o callback de sucesso se fornecido
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      const errorMessage =
        error instanceof AxiosError
          ? error.response?.data?.message || "Erro ao registrar o ano"
          : "Ocorreu um erro inesperado. Tente novamente mais tarde.";

      setSubmitError(errorMessage);

      toast({
        title: "Erro ao registrar o ano",
        description: errorMessage,
        variant:
          error instanceof AxiosError && error.response?.status === 409
            ? "destructive"
            : "default",
      });
    }
  }

  return (
    <Card className="border-0 ring-0">
      <CardHeader>
        <CardTitle>Registrar Ano e Mês</CardTitle>
        <CardDescription>Adicione os programas das reuniões</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <CardContent className="grid gap-6">
            <div className="grid grid-cols-1 gap-4">
              <FormField
                control={control}
                name="ano"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ano</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value?.toString()}
                    >
                      <SelectTrigger id="ano" aria-label="Selecione o ano">
                        <SelectValue placeholder="Selecione o ano" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 10 }, (_, i) => (
                          <SelectItem
                            key={i}
                            value={`${new Date().getFullYear() + i}`}
                          >
                            {new Date().getFullYear() + i}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={control}
              name="descricao"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea
                      id="descricao"
                      placeholder="Digite a descrição"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {submitError && (
              <p className="text-sm font-medium text-destructive">
                {submitError}
              </p>
            )}

            <div className="grid grid-cols-2 gap-2">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto"
              >
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Registrar
              </Button>
              <DialogClose asChild>
                <Button type="button" className="w-full" variant="outline">
                  Cancelar
                </Button>
              </DialogClose>
            </div>
          </CardContent>
        </form>
      </Form>
    </Card>
  );
}
