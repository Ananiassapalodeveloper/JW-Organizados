"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import type { Designacao, Parte } from "@/types/ReuniaoForm"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { ParteForm } from "./ParteForm"

const designacaoSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
})

type DesignacaoFormProps = {
  onSubmit: (data: Designacao) => void
  initialData?: Designacao
}

export function DesignacaoForm({ onSubmit, initialData }: DesignacaoFormProps) {
  const [partes, setPartes] = useState<Parte[]>(initialData?.partes || [])
  const form = useForm<{ name: string }>({
    resolver: zodResolver(designacaoSchema),
    defaultValues: { name: initialData?.name || "" },
  })

  const handleSubmit = (data: { name: string }) => {
    onSubmit({ ...data, partes })
  }

  const handleAddParte = (parte: Parte) => {
    setPartes([...partes, parte])
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome da Designação</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <h3 className="text-lg font-semibold mb-2">Partes</h3>
          {partes.map((parte, index) => (
            <div key={index} className="mb-2">
              {parte.name} - Membro: {parte.memberId}
            </div>
          ))}
          <ParteForm onSubmit={handleAddParte} />
        </div>
        <Button type="submit">Salvar Designação</Button>
      </form>
    </Form>
  )
}

