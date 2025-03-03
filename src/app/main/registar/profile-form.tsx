"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"

import { cn } from "@/lib/utils"
import { toast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { CalendarIcon, PlusCircle, X } from "lucide-react"
// import { CalendarDateRangePicker } from "../(dashboard)/components/date-range-picker"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { Label } from "recharts"

const profileFormSchema = z.object({
  username: z
    .string({required_error:"O nome é obrigatório"})
    .min(5, {
      message: "Nome tem de ser pelo menos 5 carcteres",
    }),

  status: z
    .string({
      message: "A definicão do estado é obrigatório",
    }),

  role: z
    .string({
      message: "A definicão da função é obrigatório",
    }),

  careers: z
    .string({
      message: "A definicão da carreira é obrigatório",
    }),

  contact: z.
    array(z.
      object(
        {
          value:
            z.string({
              message: "Número é obrigatório.",
            })
        }
      )),

  addicionalInfo: z.string().max(160).min(4),


  dob: z.date({
    message: "A definicão da data de nascimento é obrigatório",
  }).optional(),

  service: z
    .array(
      z.object({
        value: z.enum(["conta", "manutencao", "literatura", "territorio", "somEaudio"]),
        position: z.enum(["servo", "Ajudante"])
      })
    ).max(5, { message: "erro" }),

  regular: z.date({
    message: "A definicão da data da carreira é obrigatório.",
  }).optional(),

  school: z.date({
    message: "A definicão da data é obrigatório.",
  }).optional(),

  helper: z.date({
    message: "A definicão da data da carreira é obrigatório.",
  }).optional(),

  teacher: z.date({
    message: "A definicão da data da carreira é obrigatório.",
  }).optional(),

  Baptized: z.date({
    message: "A definicão da data do baptismo é obrigatório.",
  }).optional(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {
  addicionalInfo: "O irmão é ....",
  service: [
    {
      value: "somEaudio",
      position: "servo"

    },
    {
      value: "conta",
      position: "Ajudante"

    },
  ],
  contact: [
    { value: "+244" }
  ]
}

export function ProfileForm() {

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  })

  // const { formState: { isValid } } = form

  const { fields, append, remove } = useFieldArray({
    name: "service",
    control: form.control,
  })

  const { ["fields"]: fieldsContact, ["append"]: appendContact, ["remove"]: removeContact } = useFieldArray({
    name: "contact",
    control: form.control,
  })

  function onSubmit(data: ProfileFormValues) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* member */}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do membro</FormLabel>
              <FormControl>
                <Input placeholder="Digite o nome do membro" {...field} />
              </FormControl>
              <FormDescription>
                Este é o nome do membro.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* dates  */}
        <div className="grid grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="school"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Data de nascimento</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Selecione a data</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Aqui deve-se adicionar data que foi matriculado na escola
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dob"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Data de Baptismo</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Selecione a data</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  A sua data de nascimento.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />


          <FormField
            control={form.control}
            name="teacher"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Data de Publicador</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Selecione a data</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Aqui deve-se adiconar a data de quando tornou-se publicador.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="Baptized"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Data de Matricula</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Selecione a data</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Aqui deve-se adiconar a data do seu Baptismo.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="helper"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Data de Pioneiro Auxiliar</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Selecione a data</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Aqui deve-se adiconar a data do início da carreira como pioneiro auxiliar.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="regular"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Data de Pioneiro regular</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Selecione a data</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Aqui deve-se adiconar a data do início da carreira como pioneiro regular.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* status  */}
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estado</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o estado" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="M">Matriculado</SelectItem>
                    <SelectItem value="A">Associado</SelectItem>
                    <SelectItem value="B">Baptizado</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Seleciona o estado de progresso do membro
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Carreira  */}
          <FormField
            control={form.control}
            name="careers"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Carreira</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="selecione um a carreira" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="M">Pioneiro Auxiliar</SelectItem>
                    <SelectItem value="A">Pioneiro Regular</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Adicione-o caso pertence numas das respectivas carreira
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Função */}
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dádivas em homem</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="selecione uma função" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="M">Ancião</SelectItem>
                    <SelectItem value="A">Servo ministerial</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Adicione-o caso pertence numas das respectivas funções
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="addicionalInfo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ponto Adicional</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Informações adicionais"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Informações adicionais
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-3 items-center">
              <Label >Adiciione os departamento a que pertence</Label>
              <FormField
                control={form.control}
                key={field.id}
                name={`service.${index}.value`}
                render={({ field }) => (
                  <div className="flex items-center gap-2">
                    <FormItem >
                      <FormLabel className={cn("sr-only")}>
                        URLs
                      </FormLabel>
                      <FormDescription className={cn("sr-only")}>
                        Add links to your website, blog, or social media profiles.
                      </FormDescription>
                      <div className="flex items-center gap-2">
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a verified email to display" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="conta">Contas</SelectItem>
                            <SelectItem value="territorio">Audio</SelectItem>
                            <SelectItem value="somEaudio">Literatura</SelectItem>
                            <SelectItem value="literatura">Literatura</SelectItem>
                            <SelectItem value="manutencao">Manutencão</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className={""}
                          onClick={() => remove(index)}
                        >
                          <X className="stroke-red-500" />
                        </Button>
                      </div>

                      <FormMessage />
                    </FormItem>

                  </div>
                )}
              />
              <FormField
                control={form.control}
                key={field.id}
                name={`service.${index}.position`}
                render={({ field }) => (
                  <div className="flex items-center gap-2">
                    <FormItem >
                      <FormLabel className={cn("sr-only")}>
                        URLs
                      </FormLabel>
                      <FormDescription className={cn("sr-only")}>
                        Add links to your website, blog, or social media profiles.
                      </FormDescription>
                      <div className="flex items-center gap-2">
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a verified email to display" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="servo">Servo</SelectItem>
                            <SelectItem value="Ajudante">Ajudante</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className={""}
                          onClick={() => remove(index)}
                        >
                          <X className="stroke-red-500" />
                        </Button>
                      </div>

                      <FormMessage />
                    </FormItem>

                  </div>
                )}
              />
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={() => append({ value: "conta", position: "Ajudante" })}
          >
            <PlusCircle className="stroke-blue-400" />Adicionar Privilégio de serviço
          </Button>
        </div>
        <div>
          {fieldsContact.map((field, index) => (
            <div key={field.id} className="flex gap-3 items-center">
              <Label >Adicionar números, email, etc</Label>

              <FormField
                control={form.control}
                key={field.id}
                name={`contact.${index}.value`}
                render={({ field }) => (
                  <div className="flex items-center gap-2">
                    <FormItem >
                      <FormLabel className={cn("sr-only")}>
                        URLs
                      </FormLabel>
                      <FormDescription className={cn("sr-only")}>
                        Add links to your website, blog, or social media profiles.
                      </FormDescription>

                      <FormControl>
                        <Input placeholder="Digite o número do membro" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className={"h-full"}
                      onClick={() => removeContact(index)}
                    >
                      <X className="stroke-red-500" />
                    </Button>

                  </div>
                )}
              />
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={() => appendContact({ value: "+244", })}
          >
            <PlusCircle className="stroke-blue-400" />Adicionar números
          </Button>
        </div>
        <Button type="submit">Adicionar membro</Button>
      </form>
    </Form>
  )
}
