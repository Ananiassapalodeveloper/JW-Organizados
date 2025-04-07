"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import type { ReuniaoAnual, Mes, Reuniao } from "@/types/ReuniaoForm"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { ReuniaoForm } from "./ReuniaoForm"

const reuniaoAnualSchema = z.object({
  ano: z.number().int().min(2000).max(2100),
})

type ReuniaoAnualFormProps = {
  onSubmit: (data: ReuniaoAnual) => void
  initialData?: ReuniaoAnual
}

export function ReuniaoAnualForm({ onSubmit, initialData }: ReuniaoAnualFormProps) {
  const [meses, setMeses] = useState<Mes[]>(initialData?.meses || [])
  const form = useForm<{ ano: number }>({
    resolver: zodResolver(reuniaoAnualSchema),
    defaultValues: { ano: initialData?.ano || new Date().getFullYear() },
  })

  const handleSubmit = (data: { ano: number }) => {
    onSubmit({ ...data, meses })
  }

  const handleAddMes = (mes: string) => {
    setMeses([...meses, { mes, reuniaoMensalDoMes: { reuniaoMeioSemana: [], reuniaoFimSemana: [] } }])
  }

  const handleAddReuniao = (mesIndex: number, tipo: "meioSemana" | "fimSemana", reuniao: Reuniao) => {
    const novosMeses = [...meses]
    if (tipo === "meioSemana") {
      novosMeses[mesIndex].reuniaoMensalDoMes.reuniaoMeioSemana.push(reuniao)
    } else {
      novosMeses[mesIndex].reuniaoMensalDoMes.reuniaoFimSemana.push(reuniao)
    }
    setMeses(novosMeses)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="ano"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ano</FormLabel>
              <FormControl>
                <Input type="number" {...field} onChange={(e) => field.onChange(Number.parseInt(e.target.value, 10))} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <h2 className="text-xl font-semibold mb-4">Meses</h2>
          {meses.map((mes, mesIndex) => (
            <div key={mesIndex} className="mb-6 p-4 border rounded">
              <h3 className="text-lg font-semibold mb-2">{mes.mes}</h3>
              <div className="mb-4">
                <h4 className="text-md font-medium mb-2">Reuniões de Meio de Semana</h4>
                {mes.reuniaoMensalDoMes.reuniaoMeioSemana.map((reuniao, reuniaoIndex) => (
                  <div key={reuniaoIndex} className="mb-2">
                    {reuniao.nameDate} - {reuniao.designacao.length} designações
                  </div>
                ))}
                <ReuniaoForm onSubmit={(reuniao) => handleAddReuniao(mesIndex, "meioSemana", reuniao)} />
              </div>
              <div>
                <h4 className="text-md font-medium mb-2">Reuniões de Fim de Semana</h4>
                {mes.reuniaoMensalDoMes.reuniaoFimSemana.map((reuniao, reuniaoIndex) => (
                  <div key={reuniaoIndex} className="mb-2">
                    {reuniao.nameDate} - {reuniao.designacao.length} designações
                  </div>
                ))}
                <ReuniaoForm onSubmit={(reuniao) => handleAddReuniao(mesIndex, "fimSemana", reuniao)} />
              </div>
            </div>
          ))}
          <div className="mt-4">
            <Input
              placeholder="Nome do mês"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleAddMes((e.target as HTMLInputElement).value)
                  ;(e.target as HTMLInputElement).value = ""
                }
              }}
            />
            <p className="text-sm text-gray-500 mt-1">Pressione Enter para adicionar um novo mês</p>
          </div>
        </div>
        <Button type="submit">Salvar Reunião Anual</Button>
      </form>
    </Form>
  )
}

