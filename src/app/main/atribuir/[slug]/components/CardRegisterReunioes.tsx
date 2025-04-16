"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { mutate } from "swr"
import { format } from "date-fns"
import { AxiosError } from "axios"
import { CalendarRange, Check, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { DialogClose } from "@/components/ui/dialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CalendarDateRangePicker } from "@/components/componentsCalendarAppNav/date-range-picker"

import { api } from "@/hooks/use-membro-form-data"
import { toast } from "@/hooks/use-toast"
import { parseSlug } from "@/lib/slugUtils"
import type { DateRange } from "react-day-picker"
import { schemaReunioesPartes, type typeSchemaReunioesPartes } from "@/types/reuniaotypes"

const defaultValues: Partial<typeSchemaReunioesPartes> = {
  dateRange: {
    from: new Date(),
    to: new Date(new Date().setDate(new Date().getDate() + 7)),
  },
}

export function CardRegisterReunioesPartes({
  params,
}: {
  params: { slug: string }
}) {
  const [submitError, setSubmitError] = useState<string | null>(null)
  const data = parseSlug(params?.slug)

  const form = useForm<typeSchemaReunioesPartes>({
    resolver: zodResolver(schemaReunioesPartes),
    defaultValues: { ...defaultValues, mesId: data?.id },
    mode: "onChange",
  })

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { isSubmitting, isValid },
  } = form

  const dateRange = watch("dateRange")

  async function onSubmit(values: typeSchemaReunioesPartes) {
    try {
      setSubmitError(null)

      const formData = {
        dateRange: {
          from: values.dateRange.from,
          to: values.dateRange.to,
        },
        mesId: data?.id,
      }

      await api.post<typeSchemaReunioesPartes>("reunioes_date", formData)

      // Update the GET cache
      mutate(`reunioes_date/${data?.id}`)

      toast({
        title: "Período registrado com sucesso",
        description: "O novo período foi adicionado ao sistema.",
        variant: "default",
      })

      reset(defaultValues)
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data?.message ||
          "Erro ao registrar o período. Verifique se o período corresponde ao intervalo correto."

        setSubmitError(errorMessage)

        toast({
          title: "Erro ao registrar",
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
  }

  const formattedDateRange =
    dateRange.from && dateRange.to
      ? `${format(dateRange.from, "dd/MM/yyyy")} - ${format(dateRange.to, "dd/MM/yyyy")}`
      : "Selecione um período"

  return (
    <Card className="border-0 shadow-none">
      <CardHeader>
        <CardTitle className="text-xl">Registrar período</CardTitle>
        <CardDescription>Adicione um novo período para o mês de {data?.mes}</CardDescription>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            {submitError && (
              <Alert variant="destructive">
                <AlertTitle>Erro</AlertTitle>
                <AlertDescription>{submitError}</AlertDescription>
              </Alert>
            )}

            <FormField
              control={control}
              name="dateRange"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Selecione o período</FormLabel>
                  <FormControl>
                    <div className="grid gap-2">
                      <div className="flex items-center justify-between rounded-md border p-3">
                        <div className="flex items-center gap-2">
                          <CalendarRange className="h-4 w-4 text-muted-foreground" />
                          <span>{formattedDateRange}</span>
                        </div>
                      </div>
                      <CalendarDateRangePicker
                        date={field.value as DateRange}
                        setDate={(range) => field.onChange(range)}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField control={control} name="mesId" render={({ field }) => <input type="hidden" {...field} />} />
          </CardContent>

          <CardFooter className="flex justify-between border-t pt-4">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancelar
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isSubmitting || !isValid} className="gap-2">
              {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
              Registrar período
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}

