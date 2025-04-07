/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import {
  AlertCircle,
  Check,
  ChevronsUpDown,
  Clock10Icon,
  Loader,
  MagnetIcon,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { setThemeColor } from "../../Meetingype";
import { Key, useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { useFetch } from "@/hooks/useFetch";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { api } from "@/hooks/use-membro-form-data";
import { toast } from "@/hooks/use-toast";
import { AxiosError } from "axios";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  type PartesIniciasDono,
  PartesIniciasSchema,
  type PresidenteType,
  type presidentType,
  TesourosSchema,
  TesourosType,
} from "@/types/reuniaoMeioSemanaDTO/type";
import { useAutoAssignment } from "@/hooks/useAutoAssignment";
import { PresidentEndPrayingSkeleton } from "@/components/PresidentEndPrayingSkeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RemoverDesignacaoDialogTsouros } from "@/components/RemoverTesouro/removedor-designacao-dialog";
import { Badge } from "@/components/ui/badge";
import { BookTH } from "@/services/Book.data";
import { NameTesouros } from "@/services/TesourosData/data";
import { CompletedDisignation } from "@/lib/isCompleted";

const defaultValues: Partial<TesourosType> = {
  name: "discurso",
  memberId: "",
  ReunioesDatesId: "",
  suplenteMemberId: "",
  lesson: "",
  nameLivro: "Melhore a sua leitura e o seu ensino",
};

export function Tesouros({ params }: { params: { id: string } }) {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isAutoAssigning, setIsAutoAssigning] = useState(false);

  const {
    data: brothers,
    error,
    isLoading,
    mutate: BroMutate,
  } = useFetch<presidentType[]>("brothers");

  const {
    data: Tesouros,
    error: TesourosError,
    isLoading: TesouroLoading,
    mutate,
  } = useFetch<any>(`tesouros/${params.id}`);

  const form = useForm<TesourosType>({
    resolver: zodResolver(TesourosSchema),
    defaultValues: {
      ...defaultValues,
      ReunioesDatesId: params.id,
    },
    mode: "onChange",
  });

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { isSubmitting },
  } = form;

  // Get current selected values
  const selectedPresidentId = watch("memberId");
  const selectedPrayerId = watch("suplenteMemberId");

  // Memoized values for performance
  const selectedPresident = useMemo(() => {
    return brothers?.find((brother) => brother.id === selectedPresidentId);
  }, [brothers, selectedPresidentId]);

  const selectedPrayer = useMemo(() => {
    return brothers?.find((brother) => brother.id === selectedPrayerId);
  }, [brothers, selectedPrayerId]);

  const filteredBrothers = useMemo(() => {
    return (
      brothers?.filter((brother) => brother.id !== selectedPresidentId) || []
    );
  }, [brothers, selectedPresidentId]);

  const QTDSMembro = useMemo(() => {
    return selectedPresident?.Tesouros.filter(
      (ts) => ts.lesson === watch("lesson")
    )?.length;
  }, [selectedPresident?.Tesouros, watch]);

  const QTDSuplente = useMemo(() => {
    return selectedPrayer?.TesourosSuplente.filter(
      (ts) => ts.lesson === watch("lesson")
    )?.length;
  }, [selectedPrayer?.TesourosSuplente, watch]);

  // Custom hook for auto assignment
  const { autoAssign } = useAutoAssignment({
    brothers: brothers || [],
    setPresidentId: (id) => setValue("memberId", id),
    setPrayerId: (id) => setValue("suplenteMemberId", id),
  });

  const handleAutoAssign = async () => {
    setIsAutoAssigning(true);
    autoAssign();
    setIsAutoAssigning(false);
  };

  // Form submission handler
  async function onSubmit(values: TesourosType) {
    try {
      setSubmitError(null);

      // Preparar os dados
      const formData = {
        name: values.name,
        memberId: values.memberId,
        suplenteMemberId: values.suplenteMemberId,
        ReunioesDatesId: params.id,
        ...(values.name === "leitura" && {
          lesson: values.lesson,
          nameLivro: values.nameLivro,
        }),
      };

      await api.post("tesouros", formData);
      toast({
        title: "Designação registrada com sucesso",
        description: "Os irmãos foram designados para as partes.",
        variant: "default",
      });
      mutate(`tesouros/${params.id}`);
      BroMutate();
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data?.error || "Erro ao registrar a designação";
        setSubmitError(errorMessage);

        toast({
          title: "Erro ao registrar a designação",
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

  if (error || TesourosError) {
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

  if (isLoading || TesouroLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center">
            Presidente & oração inicial
          </CardTitle>
          <CardDescription>
            Selecione os irmãos para respectiva designação
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PresidentEndPrayingSkeleton />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardContent className="">
        <div className="flex items-center justify-between">
          <RemoverDesignacaoDialogTsouros id={watch("ReunioesDatesId") ?? ""} />
          {
            <Badge
              className={`relative -top-4 left-10 rounded-full ${CompletedDisignation(
                Tesouros?.length >= 3
              )}`}
              variant={"secondary"}
            >
              {Tesouros?.length}
            </Badge>
          }
        </div>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="">
            {submitError && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Erro</AlertTitle>
                <AlertDescription>{submitError}</AlertDescription>
              </Alert>
            )}
            <CardHeader className="w-full px-0">
              <CardTitle className="flex flex-col">
                <FormField
                  control={control}
                  name={"name"}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="sr-only">Nome</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value?.toString()}
                      >
                        <SelectTrigger id="nome" className="border-0 text-lg">
                          <SelectValue placeholder="Seleciona o nome da designação" />
                        </SelectTrigger>
                        <SelectContent>
                          {NameTesouros.map((data) => (
                            <SelectItem key={data.value} value={data.value}>
                              {data.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <span className="flex items-center gap-2 text-xs">
                  <Clock10Icon size={14} /> 10 min
                </span>
              </CardTitle>
              <CardDescription className="p-0">
                Selecione os irmão para respectiva designação
              </CardDescription>
            </CardHeader>
            <div className="grid gap-6 w-full">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
                {/* Presidente Section */}
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">
                    {watch("name") === "leitura" ? "Leitor" : "Orador"}
                  </h3>

                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src="/avatar/01.png" alt="Avatar" />
                      <AvatarFallback className="uppercase">
                        {selectedPresident
                          ? selectedPresident.nome.slice(0, 2)
                          : "?"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {selectedPresident?.nome || "Não Selecionado"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {selectedPresident?.contacto || "+244 ___________"}
                      </p>
                    </div>
                  </div>

                  <FormField
                    control={control}
                    name="memberId"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Selecione o irmão</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                role="combobox"
                                className={cn(
                                  "w-full justify-between",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value
                                  ? brothers?.find(
                                      (brother) => brother.id === field.value
                                    )?.nome
                                  : "Selecionar irmão..."}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-[300px] p-0">
                            <Command>
                              <CommandInput placeholder="Buscar irmão..." />
                              <CommandList>
                                <CommandEmpty>
                                  Nenhum irmão encontrado.
                                </CommandEmpty>
                                <CommandGroup>
                                  {brothers?.map((brother, index) => (
                                    <CommandItem
                                      key={brother.id}
                                      value={brother.nome}
                                      onSelect={() => {
                                        setValue("memberId", brother.id);
                                      }}
                                    >
                                      <div className="flex flex-1 items-start flex-col">
                                        <p>{brother.nome}</p>
                                        <div className="flex items-center gap-2">
                                          <p className="text-xs text-muted-foreground">
                                            {brother.carreira || brother.estado}
                                          </p>
                                          <span
                                            className={`rounded-full flex items-center justify-center h-5 w-5 text-xs ${setThemeColor(
                                              index
                                            )}`}
                                          >
                                            {
                                              brother.Tesouros.filter(
                                                (des) =>
                                                  des.name === watch("name")
                                              ).length
                                            }
                                          </span>
                                        </div>
                                      </div>
                                      <Check
                                        className={cn(
                                          "ml-auto h-4 w-4",
                                          field.value === brother.id
                                            ? "opacity-100"
                                            : "opacity-0"
                                        )}
                                      />
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {watch("name") === "leitura" &&
                    watch("lesson") != "" &&
                    selectedPrayerId! &&
                    selectedPrayerId! && (
                      <div>
                        {QTDSMembro && QTDSMembro > 0 ? (
                          <Badge className="rounded-full">
                            Já foi designado {QTDSMembro} vez(es) nesta lição (
                            {watch("lesson")})
                          </Badge>
                        ) : (
                          <Badge>
                            Nunca foi designado nesta lição ({watch("lesson")})
                          </Badge>
                        )}
                      </div>
                    )}
                </div>

                {/* Oração Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-medium">Irmão suplente</h3>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                          <AlertCircle className="h-3 w-3" /> Voluntário
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Caso haja um conveniente, atribua um voluntário</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>

                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src="/avatar/01.png" alt="Avatar" />
                      <AvatarFallback className="uppercase">
                        {selectedPrayer ? selectedPrayer.nome.slice(0, 2) : "?"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {selectedPrayer?.nome || "Não Selecionado"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {selectedPrayer?.contacto || "+244 ___________"}
                      </p>
                    </div>
                  </div>

                  <FormField
                    control={control}
                    name="suplenteMemberId"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Selecione o irmão</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                role="combobox"
                                className={cn(
                                  "w-full justify-between",
                                  !field.value && "text-muted-foreground"
                                )}
                                disabled={!selectedPresidentId}
                              >
                                {field.value
                                  ? brothers?.find(
                                      (brother) => brother.id === field.value
                                    )?.nome
                                  : selectedPresidentId
                                  ? "Selecionar irmão..."
                                  : "Selecione o presidente primeiro"}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-[300px] p-0">
                            <Command>
                              <CommandInput placeholder="Buscar irmão..." />
                              <CommandList>
                                <CommandEmpty>
                                  Nenhum irmão encontrado.
                                </CommandEmpty>
                                <CommandGroup>
                                  {filteredBrothers.map((brother, index) => (
                                    <CommandItem
                                      key={brother.id}
                                      value={brother.nome}
                                      onSelect={() => {
                                        setValue(
                                          "suplenteMemberId",
                                          brother.id
                                        );
                                      }}
                                    >
                                      <div className="flex flex-1 items-start flex-col">
                                        <p>{brother.nome}</p>
                                        <div className="flex items-center gap-2">
                                          <p className="text-xs text-muted-foreground">
                                            {brother.carreira || brother.estado}
                                          </p>
                                          <span
                                            className={`rounded-full flex items-center justify-center h-5 w-5 text-xs ${setThemeColor(
                                              index
                                            )}`}
                                          >
                                            {
                                              brother.TesourosSuplente.filter(
                                                (des) =>
                                                  des.name === watch("name")
                                              ).length
                                            }
                                          </span>
                                        </div>
                                      </div>
                                      <Check
                                        className={cn(
                                          "ml-auto h-4 w-4",
                                          field.value === brother.id
                                            ? "opacity-100"
                                            : "opacity-0"
                                        )}
                                      />
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {watch("name") === "leitura" &&
                    watch("lesson") != "" &&
                    selectedPrayerId! &&
                    selectedPrayerId! && (
                      <div>
                        {QTDSuplente && QTDSuplente > 0 ? (
                          <Badge className="rounded-full">
                            Já foi designado {QTDSuplente} vez(es) nesta lição (
                            {watch("lesson")})
                          </Badge>
                        ) : (
                          <Badge>
                            Nunca foi designado nesta lição ({watch("lesson")})
                          </Badge>
                        )}
                      </div>
                    )}
                </div>

                {/* Lição */}
                {watch("name") === "leitura" && (
                  <div className="space-y-4">
                    <FormField
                      control={control}
                      name="lesson"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel className="">
                            Selecione ponto de conselho
                          </FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  role="combobox"
                                  className={cn(
                                    "w-full justify-between",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    <span className="flex items-center space-x-2">
                                      <Badge
                                        className="rounded-full"
                                        variant={"outline"}
                                      >
                                        {" "}
                                        {
                                          BookTH?.find(
                                            ({ lesson }) =>
                                              lesson.toString() === field.value
                                          )?.lesson
                                        }
                                      </Badge>
                                      <span>
                                        {
                                          BookTH?.find(
                                            ({ lesson }) =>
                                              lesson.toString() === field.value
                                          )?.name
                                        }
                                      </span>
                                    </span>
                                  ) : (
                                    "Selecionar ponto..."
                                  )}
                                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-[300px] p-0">
                              <Command>
                                <CommandInput placeholder="Buscar pontos..." />
                                <CommandList>
                                  <CommandEmpty>
                                    Nenhum ponto encontrado.
                                  </CommandEmpty>
                                  <CommandGroup>
                                    {BookTH?.map(({ lesson, name }) => (
                                      <CommandItem
                                        key={lesson}
                                        value={lesson.toString()}
                                        onSelect={() => {
                                          setValue("lesson", lesson.toString());
                                        }}
                                      >
                                        <div className="flex flex-1 items-start flex-col">
                                          <p>{name}</p>
                                          <div className="flex items-center gap-2">
                                            <p className="text-xs text-muted-foreground">
                                              Ponto de conselho:
                                            </p>
                                            <span
                                              className={`rounded-full flex items-center justify-center h-5 w-5 text-xs ${setThemeColor(
                                                lesson
                                              )}`}
                                            >
                                              {lesson}
                                            </span>
                                          </div>
                                        </div>
                                        <Check
                                          className={cn(
                                            "ml-auto h-4 w-4",
                                            field.value === lesson.toString()
                                              ? "opacity-100"
                                              : "opacity-0"
                                          )}
                                        />
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                </CommandList>
                              </Command>
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}
              </div>
              <div className="flex justify-between">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        type="button"
                        size="icon"
                        className="rounded-full"
                        onClick={handleAutoAssign}
                        disabled={
                          isAutoAssigning || !brothers || brothers.length < 2
                        }
                      >
                        <MagnetIcon
                          size={20}
                          className={cn(isAutoAssigning && "animate-pulse")}
                        />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Atribuir designação de forma automática</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <Button
                  type="submit"
                  disabled={
                    isSubmitting || !selectedPresidentId || !selectedPrayerId
                  }
                >
                  {isSubmitting ? (
                    <>
                      <Loader className="mr-2 h-4 w-4 animate-spin" />
                      Salvando...
                    </>
                  ) : (
                    "Salvar Designação"
                  )}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
