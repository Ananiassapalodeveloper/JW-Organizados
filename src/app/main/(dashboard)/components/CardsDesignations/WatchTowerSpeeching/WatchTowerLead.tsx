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
import { useMemo, useState } from "react";
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
import type { presidentType as BrothersType } from "@/types/reuniaoMeioSemanaDTO/type";
import { useAutoAssignment } from "@/hooks/useAutoAssignment";
import { PresidentEndPrayingSkeleton } from "@/components/PresidentEndPrayingSkeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RemoverDesignacaoDialog } from "@/components/RemoverSentinela/removedor-designacao-dialog";
import {
  sentinelaType,
  sentinelaSchema,
} from "@/types/reuniaoFimSemanaDTO/type";
import { Input } from "@/components/ui/input";
import { mutate } from "swr";
const defaultValues: Partial<sentinelaType> = {
  name: "dirigente",
  ReunioesDatesId: "",
  tema: "",
  memberId: "",
  suplenteMemberId: "",
};

export const sentinelaValueType = [
  { value: "dirigente", name: "Dirigente de A Sentinela" },
  { value: "leitor", name: "Leitor" },
  { value: "oracaoFinal", name: "Oração Final" },
];

export function WatchTowerLead({ params }: { params: { id: string } }) {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isAutoAssigningDirigente, setIsAutoAssigningDirigente] =
    useState(false);

  const {
    data: brothers,
    error,
    isLoading,
  } = useFetch<BrothersType[]>("brothers");

  const form = useForm<sentinelaType>({
    resolver: zodResolver(sentinelaSchema),
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

  // Watch for the name field to use in dependencies
  const designationType = watch("name");

  //#region Membro
  // Get current selected values DIRIGENTE
  const memberDirigenteId = watch("memberId");
  const memberDirigenteSuplenteId = watch("suplenteMemberId");

  // Memoized values for performance
  const memberDirigente = useMemo(() => {
    return brothers?.find((brother) => brother.id === memberDirigenteId);
  }, [brothers, memberDirigenteId]);

  const memberDirigenteSuplente = useMemo(() => {
    return brothers?.find(
      (brother) => brother.id === memberDirigenteSuplenteId
    );
  }, [brothers, memberDirigenteSuplenteId]);

  const filteredDirigenteBrothers = useMemo(() => {
    return (
      brothers?.filter((brother) => brother.id !== memberDirigenteId) || []
    );
  }, [brothers, memberDirigenteId]);

  // Custom hook for auto assignment
  const { autoAssign } = useAutoAssignment({
    brothers: brothers || [],
    setPresidentId: (id) => setValue("memberId", id),
    setPrayerId: (id) => setValue("suplenteMemberId", id),
  });

  const handleAutoAssignDirigente = async () => {
    setIsAutoAssigningDirigente(true);
    autoAssign();
    setIsAutoAssigningDirigente(false);
  };

  // Form submission handler
  async function onSubmit(values: sentinelaType) {
    try {
      setSubmitError(null);

      // Preparar os dados
      const formData = {
        name: values.name,
        memberId: values.memberId,
        suplenteMemberId: values.suplenteMemberId,
        ReunioesDatesId: params.id,
        tema: values.tema,
      };

      // Cria um novo registro
      await api.post("sentinela", formData);
      toast({
        title: "Designação registrada com sucesso",
        description: "Os irmãos foram designados para as partes.",
        variant: "default",
      });

      // Force a refresh of the data
      mutate("sentinela");
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

  if (error) {
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

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center">
            Estudo bíblico de congregação
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
        <RemoverDesignacaoDialog id={watch("ReunioesDatesId") ?? ""} />
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
                          <SelectValue placeholder="nome" />
                        </SelectTrigger>
                        <SelectContent>
                          {sentinelaValueType.map((data) => (
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
              <div className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
                  {/* Presidente Section */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Dirigente</h3>

                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src="/avatar/01.png" alt="Avatar" />
                        <AvatarFallback className="uppercase">
                          {memberDirigente
                            ? memberDirigente.nome.slice(0, 2)
                            : "?"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {memberDirigente?.nome || "Não Selecionado"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {memberDirigente?.contacto || "+244 ___________"}
                        </p>
                      </div>
                    </div>

                    <FormField
                      control={control}
                      name="memberId"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Selecione o irmão presidente</FormLabel>
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
                                              {brother.carreira ||
                                                brother.estado}
                                            </p>
                                            <span
                                              className={`rounded-full flex items-center justify-center h-5 w-5 text-xs ${setThemeColor(
                                                index
                                              )}`}
                                            >
                                              {
                                                brother._count
                                                  .SentinelaParteMembro
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
                  </div>

                  {/* Oração Section */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-medium">
                        Dirigente Suplente
                      </h3>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                            <AlertCircle className="h-3 w-3" /> Voluntário
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>
                              Caso haja um conveniente, atribua um voluntário
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>

                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src="/avatar/01.png" alt="Avatar" />
                        <AvatarFallback className="uppercase">
                          {memberDirigenteSuplente
                            ? memberDirigenteSuplente.nome.slice(0, 2)
                            : "?"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {memberDirigenteSuplente?.nome || "Não Selecionado"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {memberDirigenteSuplente?.contacto ||
                            "+244 ___________"}
                        </p>
                      </div>
                    </div>

                    <FormField
                      control={control}
                      name="suplenteMemberId"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Selecione o irmão suplente</FormLabel>
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
                                  disabled={!memberDirigenteId}
                                >
                                  {field.value
                                    ? brothers?.find(
                                        (brother) => brother.id === field.value
                                      )?.nome
                                    : memberDirigenteId
                                    ? "Selecionar irmão..."
                                    : "Selecione o dirigente primeiro"}
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
                                    {filteredDirigenteBrothers.map(
                                      (brother, index) => (
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
                                                {brother.carreira ||
                                                  brother.estado}
                                              </p>
                                              <span
                                                className={`rounded-full flex items-center justify-center h-5 w-5 text-xs ${setThemeColor(
                                                  index
                                                )}`}
                                              >
                                                {
                                                  brother._count
                                                    .SentinelaParteMembro
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
                                      )
                                    )}
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

                  {/* Tema  */}
                  {designationType === "dirigente" && (
                    <div className="space-y-4">
                      <FormField
                        control={control}
                        name="tema"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Digita o tema</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Digite o tema"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}
                </div>

                <div className="flex justify-between">
                  <div className="grid gap-1 grid-cols-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            type="button"
                            size="icon"
                            className="rounded-full"
                            onClick={handleAutoAssignDirigente}
                            disabled={
                              isAutoAssigningDirigente ||
                              !brothers ||
                              brothers.length < 2
                            }
                          >
                            <MagnetIcon
                              size={20}
                              className={cn(
                                isAutoAssigningDirigente && "animate-pulse"
                              )}
                            />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            Atribuir designação de forma automática ao Dirigente
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>

                  <Button
                    type="submit"
                    disabled={
                      isSubmitting ||
                      !memberDirigenteId ||
                      !memberDirigenteSuplenteId
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
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
