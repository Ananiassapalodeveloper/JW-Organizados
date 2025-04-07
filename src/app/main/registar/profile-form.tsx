/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { AxiosError } from "axios";
import { CalendarIcon, LoaderCircle, PlusCircle, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { api, useMembroFormData } from "@/hooks/use-membro-form-data";
import {
  profileFormSchema,
  type ProfileFormValues,
} from "@/types/schema-register-member";
import {
  CarreiraEnum,
  DadivaEnum,
  EstadoEnum,
  PosicaoEnum,
  ServicoEnum,
  SexoEnum,
} from "@/const/type-members";

// Valores padrão para o formulário
const defaultValues: Partial<ProfileFormValues> = {
  contacto: "+244",
  addicionalInfo: "",
  servicos: [],
};

export function ProfileForm() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const {
    control,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { isSubmitting, errors },
  } = form;

  const { fields, append, remove } = useFieldArray({
    name: "servicos",
    control,
  });

  const { grupos, isLoading, error: dataError } = useMembroFormData();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("info-pessoal");

  const watchEstado = watch("estado");
  const watchCarreira = watch("carreira");
  const watchGrupoId = watch("grupoId");

  // Efeito para limpar campos não relevantes quando o estado muda
  useEffect(() => {
    if (watchEstado !== "BATIZADO") {
      setValue("carreira", undefined);
      setValue("dadivas", undefined);
      setValue("baptismo", undefined);
      setValue("dataPioneiroRegular", undefined);
      setValue("dataPioneiroAuxiliar", undefined);
      setValue("servicos", []);
      setValue("funcaoGrupo", undefined);
    }
    if (watchEstado === "MATRICULADO") {
      setValue("dataPublicador", undefined);
      setValue("grupoId", undefined);
      setValue("isDirigente", false);
      setValue("isAjudante", false);
    }

    if (watchCarreira === "PIONEIRO_AUXILIAR") {
      setValue("dataPioneiroRegular", undefined);
    }
    if (watchCarreira === "PIONEIRO_REGULAR") {
      setValue("dataPioneiroAuxiliar", undefined);
    }
  }, [watchEstado, watchCarreira, setValue]);

  // Função para lidar com o envio do formulário
  async function onSubmit(values: ProfileFormValues) {
    try {
      setSubmitError(null);

      // Preparar dados para envio
      const formData = {
        nome: values.nome,
        email: values.email,
        contacto: values.contacto,
        dataNascimento: values.nascimento,
        estado: values.estado,
        descricao: values.addicionalInfo,
        sexo: values.sexo,
        ...(values.estado === "BATIZADO" && {
          dataBaptismo: values.baptismo,
          carreira: values.carreira,
          dadiva: values.dadivas,
          ...(values.carreira != "PIONEIRO_REGULAR"
            ? { dataAuxiliar: values.dataPioneiroAuxiliar }
            : { dataRegular: values.dataPioneiroRegular }),
          isDirigente: values.isDirigente,
          isAjudante: values.isAjudante,
          servicos: values.servicos,
        }),
        ...((values.estado === "MATRICULADO" ||
          values.estado === "BATIZADO" ||
          values.estado === "ASSOCIADO") && {
          dataMatricula: values.dataMatricula,
        }),
        ...((values.estado === "ASSOCIADO" || values.estado === "BATIZADO") && {
          dataPublicador: values.dataPublicador,
          grupoId: values.grupoId,
        }),
      };

      await api.post("member2", formData);

      toast({
        title: "Membro registrado com sucesso",
        description: "O novo membro foi adicionado ao sistema.",
        variant: "default",
      });

      reset(defaultValues);
      setActiveTab("info-pessoal");
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data?.error || "Erro ao registrar o membro";
        setSubmitError(errorMessage);

        toast({
          title: "Erro ao registrar o membro",
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
  }

  // Atualizar isDirigente e isAjudante quando funcaoGrupo mudar
  const handleFuncaoGrupoChange = (value: string) => {
    setValue("funcaoGrupo", value as "dirigente" | "ajudante");
    setValue("isDirigente", value === "dirigente");
    setValue("isAjudante", value === "ajudante");
  };

  if (isLoading)
    return (
      <div className="flex justify-center p-8">
        <LoaderCircle className="animate-spin h-8 w-8" />
      </div>
    );
  if (dataError)
    return (
      <div className="p-4 text-red-500">
        Erro ao carregar dados: {dataError.message}
      </div>
    );

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Registrar Novo Membro</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {submitError && (
              <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md">
                {submitError}
              </div>
            )}

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
                <TabsTrigger value="info-pessoal">
                  Informações Pessoais
                </TabsTrigger>
                <TabsTrigger value="estado-progresso">
                  Estado e Progresso
                </TabsTrigger>
                {watchEstado === "BATIZADO" && (
                  <>
                    <TabsTrigger value="carreira-funcoes">
                      Carreira e Funções
                    </TabsTrigger>
                    <TabsTrigger value="servicos">Serviços</TabsTrigger>
                  </>
                )}
              </TabsList>

              <TabsContent value="info-pessoal" className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Informações Pessoais</h3>

                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={control}
                      name="nome"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome do membro</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Digite o nome completo"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={control}
                      name="sexo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sexo</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione o sexo" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {SexoEnum.map((sexo) => (
                                <SelectItem key={sexo.value} value={sexo.value}>
                                  {sexo.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={control}
                      name="contacto"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contacto</FormLabel>
                          <FormControl>
                            <Input placeholder="+244 000 000 000" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="exemplo@email.com"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={control}
                    name="nascimento"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Data de Nascimento</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  <span className="block truncate">
                                    {format(field.value, "dd/MM/yyyy")}
                                  </span>
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
                                date > new Date() ||
                                date < new Date("1900-01-01")
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="addicionalInfo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Informações Adicionais</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Informações adicionais sobre o membro"
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="pt-4 flex flex-col sm:flex-row justify-between gap-2">
                    <Button
                      type="button"
                      onClick={() => setActiveTab("estado-progresso")}
                      className="w-full sm:w-auto"
                    >
                      Próximo
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="estado-progresso" className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Estado e Progresso</h3>

                  <FormField
                    control={control}
                    name="estado"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Estado</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o estado" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {EstadoEnum.map((estado) => (
                              <SelectItem
                                key={estado.value}
                                value={estado.value}
                              >
                                {estado.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {watchEstado === "BATIZADO" && (
                    <FormField
                      control={control}
                      name="baptismo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Data de Baptismo</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    <span className="block truncate">
                                      {format(field.value, "dd/MM/yyyy")}
                                    </span>
                                  ) : (
                                    <span>Selecione a data</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date > new Date() ||
                                  date < new Date("1900-01-01")
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  {(watchEstado === "MATRICULADO" ||
                    watchEstado === "BATIZADO" ||
                    watchEstado === "ASSOCIADO") && (
                    <FormField
                      control={control}
                      name="dataMatricula"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Data de Matrícula</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    <span className="block truncate">
                                      {format(field.value, "dd/MM/yyyy")}
                                    </span>
                                  ) : (
                                    <span>Selecione a data</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date > new Date() ||
                                  date < new Date("1900-01-01")
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  {(watchEstado === "ASSOCIADO" ||
                    watchEstado === "BATIZADO") && (
                    <>
                      <FormField
                        control={control}
                        name="dataPublicador"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Data de Publicador</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    className={cn(
                                      "w-full pl-3 text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value ? (
                                      <span className="block truncate">
                                        {format(field.value, "dd/MM/yyyy")}
                                      </span>
                                    ) : (
                                      <span>Selecione a data</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto p-0"
                                align="start"
                              >
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) =>
                                    date > new Date() ||
                                    date < new Date("1900-01-01")
                                  }
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                        <FormField
                        control={control}
                        name="grupoId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Grupo</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecione o grupo" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {grupos.map((grupo) => (
                                  <SelectItem key={grupo.id} value={grupo.id}>
                                    {grupo.nome}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                    </>
                  )}

                  <div className="pt-4 flex flex-col sm:flex-row justify-between gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setActiveTab("info-pessoal")}
                      className="w-full sm:w-auto"
                    >
                      Anterior
                    </Button>
                    {watchEstado === "BATIZADO" && (
                      <Button
                        type="button"
                        onClick={() => setActiveTab("carreira-funcoes")}
                        className="w-full sm:w-auto"
                      >
                        Próximo
                      </Button>
                    )}
                  </div>
                </div>
              </TabsContent>

              {watchEstado === "BATIZADO" && (
                <>
                  <TabsContent value="carreira-funcoes" className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">
                        Carreira e Funções
                      </h3>

                      <FormField
                        control={control}
                        name="carreira"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Carreira</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecione a carreira" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {CarreiraEnum.map((carreira) => (
                                  <SelectItem
                                    key={carreira.value}
                                    value={carreira.value}
                                  >
                                    {carreira.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {watchCarreira === "PIONEIRO_REGULAR" && (
                        <FormField
                          control={control}
                          name="dataPioneiroRegular"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Data de Pioneiro Regular</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant="outline"
                                      className={cn(
                                        "w-full pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                      )}
                                    >
                                      {field.value ? (
                                        <span className="block truncate">
                                          {format(field.value, "dd/MM/yyyy")}
                                        </span>
                                      ) : (
                                        <span>Selecione a data</span>
                                      )}
                                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent
                                  className="w-auto p-0"
                                  align="start"
                                >
                                  <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    disabled={(date) =>
                                      date > new Date() ||
                                      date < new Date("1900-01-01")
                                    }
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}

                      {watchCarreira === "PIONEIRO_AUXILIAR" && (
                        <FormField
                          control={control}
                          name="dataPioneiroAuxiliar"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Data de Pioneiro Auxiliar</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant="outline"
                                      className={cn(
                                        "w-full pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                      )}
                                    >
                                      {field.value ? (
                                        <span className="block truncate">
                                          {format(field.value, "dd/MM/yyyy")}
                                        </span>
                                      ) : (
                                        <span>Selecione a data</span>
                                      )}
                                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent
                                  className="w-auto p-0"
                                  align="start"
                                >
                                  <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    disabled={(date) =>
                                      date > new Date() ||
                                      date < new Date("1900-01-01")
                                    }
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}

                      <FormField
                        control={control}
                        name="dadivas"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Dádivas</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecione a dádiva" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {DadivaEnum.map((dadiva) => (
                                  <SelectItem
                                    key={dadiva.value}
                                    value={dadiva.value}
                                  >
                                    {dadiva.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {watchGrupoId && (
                        <FormField
                          control={control}
                          name="funcaoGrupo"
                          render={({ field }) => (
                            <FormItem className="space-y-3">
                              <FormLabel>Função no Grupo</FormLabel>
                              <FormControl>
                                <RadioGroup
                                  onValueChange={handleFuncaoGrupoChange}
                                  defaultValue={field.value}
                                  className="flex flex-col space-y-1"
                                >
                                  <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                      <RadioGroupItem value="dirigente" />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      Dirigente
                                    </FormLabel>
                                  </FormItem>
                                  <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                      <RadioGroupItem value="ajudante" />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      Ajudante
                                    </FormLabel>
                                  </FormItem>
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}

                      <div className="pt-4 flex flex-col sm:flex-row justify-between gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setActiveTab("estado-progresso")}
                          className="w-full sm:w-auto"
                        >
                          Anterior
                        </Button>
                        <Button
                          type="button"
                          onClick={() => setActiveTab("servicos")}
                          className="w-full sm:w-auto"
                        >
                          Próximo
                        </Button>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="servicos" className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Serviços</h3>

                      {fields.length > 0 && (
                        <div className="space-y-4">
                          {fields.map((field, index) => (
                            <div
                              key={field.id}
                              className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
                            >
                              <FormField
                                control={control}
                                name={`servicos.${index}.servico`}
                                render={({ field }) => (
                                  <FormItem className="flex-1 w-full sm:w-auto">
                                    <FormLabel
                                      className={cn(index !== 0 && "sr-only")}
                                    >
                                      Serviço
                                    </FormLabel>
                                    <Select
                                      onValueChange={field.onChange}
                                      defaultValue={field.value}
                                    >
                                      <FormControl>
                                        <SelectTrigger>
                                          <SelectValue placeholder="Selecione o serviço" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        {ServicoEnum.map((servico) => (
                                          <SelectItem
                                            key={servico.value}
                                            value={servico.value}
                                          >
                                            {servico.name}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={control}
                                name={`servicos.${index}.posicao`}
                                render={({ field }) => (
                                  <FormItem className="flex-1 w-full sm:w-auto">
                                    <FormLabel
                                      className={cn(index !== 0 && "sr-only")}
                                    >
                                      Posição
                                    </FormLabel>
                                    <Select
                                      onValueChange={field.onChange}
                                      defaultValue={field.value}
                                    >
                                      <FormControl>
                                        <SelectTrigger>
                                          <SelectValue placeholder="Selecione a posição" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        {PosicaoEnum.map((posicao) => (
                                          <SelectItem
                                            key={posicao.value}
                                            value={posicao.value}
                                          >
                                            {posicao.name}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                className="mt-2 sm:mt-8"
                                onClick={() => remove(index)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}

                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="mt-2 w-full sm:w-auto"
                        onClick={() =>
                          append({ servico: "TERRITORIO", posicao: "AJUDANTE" })
                        }
                      >
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Adicionar Serviço
                      </Button>

                      <div className="pt-8 flex flex-col sm:flex-row justify-between gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setActiveTab("carreira-funcoes")}
                          className="w-full sm:w-auto"
                        >
                          Anterior
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                </>
              )}
            </Tabs>

            {/* Adicione o botão de submissão fora das abas */}
            <div className="pt-8 flex flex-col sm:flex-row justify-end gap-2">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto"
              >
                {isSubmitting && (
                  <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                )}
                Registrar Membro
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
