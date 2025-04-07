"use client"

import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { BookOpen, Check, ChevronsUpDown, Info } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

// Dados das lições
export const bookImd = [
  {
    number: "1",
    name: "Interesse pelas pessoas",
    points: [
      { name: "Seja flexível", point: 3, subpoint: ["a", "b"] },
      { name: "Esteja atento", point: 4, subpoint: ["a", "b", "c"] },
      { name: "Escute", point: 5, subpoint: ["a", "b"] },
    ],
  },
  {
    number: "2",
    name: "Naturalidade",
    points: [
      { name: "Esteja atento", point: 3 },
      { name: "Seja paciente", point: 4 },
      { name: "Seja adaptável", point: 5 },
    ],
  },
  {
    number: "3",
    name: "Bondade",
    points: [
      { name: "Tenha empatia", point: 3, subpoint: ["a", "b"] },
      { name: "Fale com bondade e respeito", point: 4 },
      { name: "Esteja pronto para ajudar", point: 5 },
    ],
  },
  {
    number: "4",
    name: "Humildade",
    points: [
      { name: "Não fale com arrogância", point: 3 },
      {
        name: "Deixe claro que aquilo que você ensina vem da Bíblia",
        point: 4,
      },
      { name: "Mantenha a calma", point: 5 },
    ],
  },
  {
    number: "5",
    name: "Tato",
    points: [
      { name: "Escolha bem as palavras", point: 3 },
      { name: "Não corrija logo a pessoa", point: 4 },
      {
        name: "Sempre que possível, concorde com a pssoa e dê elogios",
        point: 5,
      },
    ],
  },
  {
    number: "6",
    name: "Coragem",
    points: [
      { name: "Confie em Jeová", point: 3 },
      { name: "Não julgues as pessoas", point: 4, subpoint: ["a", "b"] },
      { name: "Seja corajoso, mas tenha cuidado", point: 5 },
    ],
  },
  {
    number: "7",
    name: "Perseverança",
    points: [
      {
        name: "Ajuste a sua programação para visotar a pessoa num horário que seja bom para ela",
        point: 3,
      },
      { name: "Marque a próxima conversa", point: 4 },
      { name: "Não perca a esperança", point: 5 },
    ],
  },
  {
    number: "8",
    name: "Paciência",
    points: [
      { name: "Tenta usar um método diferente", point: 3 },
      { name: "Não faça comparções cada pessoa diferente", point: 4 },
      { name: "Hore pela pessoa interessada", point: 5 },
    ],
  },
  {
    number: "9",
    name: "Empatia",
    points: [
      { name: "Escute com atenção", point: 3 },
      {
        name: "Pense na pessoa interessada",
        point: 4,
        subpoint: ["a", "b"],
      },
      { name: "Use informação que vão ajudar a pessoa", point: 5 },
    ],
  },
  {
    number: "10",
    name: "Determinação",
    points: [
      {
        name: "Faça o estudo na hora e no local que seja bom para o estudante",
        point: 3,
      },
      { name: "Estude regularmente", point: 4, subpoint: ["a", "b", "c"] },
      { name: "Ore para pedir para ter a atitude certa", point: 5 },
    ],
  },
  {
    number: "11",
    name: "Simplicidade",
    points: [
      { name: "Não fale de mais", point: 3 },
      {
        name: "Ajude o seu estudante a ligar o que ele já aprendeu com o que ele está a aprender agora",
        point: 4,
      },
      {
        name: "Saiba como usar ilustrações",
        point: 5,
        subpoint: ["a", "b", "c"],
      },
    ],
  },
  {
    number: "12",
    name: "Sinceridade",
    points: [
      {
        name: "Ajude o seu estudante a estabelecer e alcançar alvos",
        point: 3,
      },
      {
        name: "Identifique o que pode estar a impedir o seu estudante de fazer progresso e o ajude a vencer esses desafios",
        point: 4,
      },
      {
        name: "Pare de dirigir estudos que nãp progridem",
        point: 5,
        subpoint: ["a", "b", "c"],
      },
    ],
  },
]

// Definição do esquema Zod
const formSchema = z.object({
  lessonNumber: z.string({
    required_error: "Por favor, selecione uma lição",
  }),
  pointNumber: z.string({
    required_error: "Por favor, selecione um ponto",
  }),
  lessonPoint: z.string({
    required_error: "O ponto da lição é obrigatório",
  }),
})

type FormValues = z.infer<typeof formSchema>

export default function LessonPointForm() {
  const [availablePoints, setAvailablePoints] = useState<{ name: string; point: number; subpoint?: string[] }[]>([])

  // Inicializar o formulário com valores padrão
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      lessonNumber: "",
      pointNumber: "",
      lessonPoint: "",
    },
  })

  const { watch, setValue } = form
  const lessonNumber = watch("lessonNumber")
  const pointNumber = watch("pointNumber")

  // Atualizar pontos disponíveis quando a lição mudar
  useEffect(() => {
    if (lessonNumber) {
      const selectedLesson = bookImd.find((book) => book.number === lessonNumber)
      if (selectedLesson) {
        setAvailablePoints(selectedLesson.points)
        // Limpar o ponto selecionado quando a lição mudar
        setValue("pointNumber", "")
        setValue("lessonPoint", "")
      }
    } else {
      setAvailablePoints([])
    }
  }, [lessonNumber, setValue])

  // Atualizar lessonPoint quando lição ou ponto mudar
  useEffect(() => {
    if (lessonNumber && pointNumber) {
      setValue("lessonPoint", `${lessonNumber}.${pointNumber}`)
    }
  }, [lessonNumber, pointNumber, setValue])

  // Função para lidar com o envio do formulário
  function onSubmit(data: FormValues) {
    console.log("Formulário enviado:", data)
    // Aqui você pode fazer o que quiser com os dados, como enviar para uma API
    alert(`Lição e ponto selecionados: ${data.lessonPoint}`)
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          Seleção de Lição e Ponto
        </CardTitle>
        <CardDescription>Selecione uma lição e um ponto para gerar o valor de lessonPoint.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="lessonNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lição</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn("w-full justify-between", !field.value && "text-muted-foreground")}
                        >
                          {field.value ? (
                            <span className="flex items-center gap-2">
                              <Badge variant="outline" className="rounded-full">
                                {field.value}
                              </Badge>
                              {bookImd.find((book) => book.number === field.value)?.name}
                            </span>
                          ) : (
                            "Selecione uma lição"
                          )}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput placeholder="Buscar lição..." />
                        <CommandList>
                          <CommandEmpty>Nenhuma lição encontrada.</CommandEmpty>
                          <CommandGroup>
                            {bookImd.map((book) => (
                              <CommandItem
                                key={book.number}
                                value={book.number}
                                onSelect={() => {
                                  form.setValue("lessonNumber", book.number)
                                }}
                              >
                                <div className="flex items-center gap-2">
                                  <Badge variant="outline" className="rounded-full">
                                    {book.number}
                                  </Badge>
                                  <span>{book.name}</span>
                                </div>
                                <Check
                                  className={cn(
                                    "ml-auto h-4 w-4",
                                    book.number === field.value ? "opacity-100" : "opacity-0",
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormDescription>Selecione uma das 12 lições disponíveis.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="pointNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ponto</FormLabel>
                  <Select disabled={!lessonNumber} onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um ponto" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {availablePoints.map((point) => (
                        <SelectItem key={point.point} value={point.point.toString()}>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="rounded-full">
                              {point.point}
                            </Badge>
                            <span className="truncate max-w-[200px]">{point.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    {lessonNumber ? "Selecione um ponto da lição escolhida." : "Primeiro selecione uma lição."}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lessonPoint"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ponto da Lição (Combinado)</FormLabel>
                  <FormControl>
                    <div className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
                      <span className={!field.value ? "text-muted-foreground" : ""}>
                        {field.value || "Será gerado automaticamente"}
                      </span>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-4 w-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Este valor é gerado automaticamente no formato &quot;número.ponto&quot;</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </FormControl>
                  <FormDescription>Formato: número da lição + &quot;.&quot; + número do ponto</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <Button onClick={form.handleSubmit(onSubmit)} className="w-full" disabled={!form.watch("lessonPoint")}>
          Confirmar Seleção
        </Button>
      </CardFooter>
    </Card>
  )
}

