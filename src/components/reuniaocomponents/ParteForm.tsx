"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import type { Parte } from "@/types/ReuniaoForm"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"

const parteSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  memberId: z.string().optional(),
  suplenteMemberId: z.string().optional(),
  grupoId: z.string().optional(),
  bookDeOratoriaDeconselhoId: z.string().optional(),
})

type ParteFormProps = {
  onSubmit: (data: Parte) => void
  initialData?: Parte
}

export function ParteForm({ onSubmit, initialData }: ParteFormProps) {
  const form = useForm<Parte>({
    resolver: zodResolver(parteSchema),
    defaultValues: initialData || {},
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome da Parte</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="memberId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ID do Membro</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Adicione campos similares para suplenteMemberId, grupoId, e bookDeOratoriaDeconselhoId */}
        <Button type="submit">Adicionar Parte</Button>
      </form>
    </Form>
  )
}

