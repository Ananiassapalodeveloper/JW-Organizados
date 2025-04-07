"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import type { Reuniao, Designacao } from "@/types/ReuniaoForm"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { DesignacaoForm } from "./DesignacaoForm"

const reuniaoSchema = z.object({
  nameDate: z.string().min(1, "Data é obrigatória"),
})

type ReuniaoFormProps = {
  onSubmit: (data: Reuniao) => void
  initialData?: Reuniao
}

export function ReuniaoForm({ onSubmit, initialData }: ReuniaoFormProps) {
  const [designacoes, setDesignacoes] = useState<Designacao[]>(initialData?.designacao || [])
  const form = useForm<{ nameDate: string }>({
    resolver: zodResolver(reuniaoSchema),
    defaultValues: { nameDate: initialData?.nameDate || "" },
  })

  const handleSubmit = (data: { nameDate: string }) => {
    onSubmit({ ...data, designacao: designacoes })
  }

  const handleAddDesignacao = (designacao: Designacao) => {
    setDesignacoes([...designacoes, designacao])
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="nameDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Data da Reunião</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <h3 className="text-lg font-semibold mb-2">Designações</h3>
          {designacoes.map((designacao, index) => (
            <div key={index} className="mb-2">
              {designacao.name} - {designacao.partes.length} partes
            </div>
          ))}
          <DesignacaoForm onSubmit={handleAddDesignacao} />
        </div>
        <Button type="submit">Salvar Reunião</Button>
      </form>
    </Form>
  )
}

