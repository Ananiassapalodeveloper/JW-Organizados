"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { pt } from "date-fns/locale/pt";
import { AlertCircle, Trash2 } from "lucide-react";
import { AxiosError } from "axios";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { api } from "@/hooks/use-membro-form-data";
import { toast } from "@/hooks/use-toast";
import { useFetch } from "@/hooks/useFetch";
import { schemaReunioes, type typeSchemaReunioes } from "@/types/reuniaotypes";
import { RemoverDesignacaoSkeleton } from "./RemovedorDesignacaoSkeleton";
import { MinisterioType } from "@/services/MinisterioData/data";
import { Separator } from "../ui/separator";

// Valores padrão para o formulário
const defaultValues: Partial<typeSchemaReunioes> = {
  descricao: "",
  ano: "",
};

type RegistoMinisterio = {
  id: string;
  name: string;
  lessonPoint: string;
  membroDirigente: {
    nome: string;
    estado: string;
  };
  membroMorador: {
    nome: string;
    estado: string;
  };
  suplenteMembroDirigente: {
    nome: string;
    estado: string;
  };
  suplenteMembroMorador: {
    nome: string;
    estado: string;
  };
  reunioesDates: {
    from: Date;
    to: Date;
  };
};

const Estado = [
  { value: "BATIZADO", name: "Baptizado" },
  { value: "MATRICULADO", name: "Matriculado" },
  { value: "ASSOCIADO", name: "Associado" },
];

interface RemoverDesignacaoProps {
  inDialog?: boolean;
  onComplete?: () => void;
  id: string | null;
}

export function RemoverDesignacao({
  inDialog = false,
  onComplete,
  id,
}: RemoverDesignacaoProps) {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const form = useForm<typeSchemaReunioes>({
    resolver: zodResolver(schemaReunioes),
    defaultValues,
    mode: "onChange",
  });

  const { reset } = form;

  const { data, error, isLoading, mutate } = useFetch<RegistoMinisterio[]>(
    `ministerio/${id}`
  );

  async function handleDelete(id: string) {
    try {
      setIsDeleting(id);
      setSubmitError(null);

      await api.delete(`ministerio/${id}`);

      // Atualiza o cache do GET
      mutate();

      toast({
        title: "Designação removida com sucesso",
        description: "A designação foi removida do sistema.",
        variant: "default",
      });

      reset(defaultValues);
      if (onComplete) onComplete();
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data?.message || "Erro ao remover a designação";

        setSubmitError(errorMessage);

        toast({
          title: "Erro ao remover a designação",
          description: errorMessage,
          variant: error.response?.status === 409 ? "destructive" : "default",
        });
      } else {
        toast({
          title: "Erro inesperado",
          description:
            "Ocorreu um erro inesperado. Tente novamente mais tarde.",
          variant: "destructive",
        });
      }
    } finally {
      setIsDeleting(null);
    }
  }

  async function handleBulkDelete() {
    if (selectedItems.length === 0) return;

    try {
      setSubmitError(null);

      // Implementar lógica para excluir múltiplos itens
      for (const id of selectedItems) {
        await api.delete(`ministerio/${id}`);
      }

      mutate();

      toast({
        title: "Designações removidas com sucesso",
        description: `${selectedItems.length} designações foram removidas do sistema.`,
        variant: "default",
      });

      setSelectedItems([]);
      if (onComplete) onComplete();
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data?.message || "Erro ao remover as designações";

        setSubmitError(errorMessage);

        toast({
          title: "Erro ao remover as designações",
          description: errorMessage,
          variant: error.response?.status === 409 ? "destructive" : "default",
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

  function toggleSelectItem(id: string) {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  }

  function isSelected(id: string) {
    return selectedItems.includes(id);
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Erro</AlertTitle>
        <AlertDescription>
          Não foi possível carregar os dados das designações. Por favor, tente
          novamente.
        </AlertDescription>
      </Alert>
    );
  }

  if (isLoading) {
    return <RemoverDesignacaoSkeleton inDialog={inDialog} />;
  }

  return (
    <div className={inDialog ? "" : "border rounded-lg shadow-sm"}>
      {!inDialog && (
        <div className="p-4 bg-muted/40 border-b">
          <h2 className="text-xl font-semibold">Designações</h2>
          <p className="text-sm text-muted-foreground">
            Esta ação é irreversível. Tem certeza que deseja eliminar?
          </p>
        </div>
      )}

      {submitError && (
        <Alert
          variant="destructive"
          className={inDialog ? "mb-4" : "mx-4 mt-2"}
        >
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Erro</AlertTitle>
          <AlertDescription>{submitError}</AlertDescription>
        </Alert>
      )}

      {inDialog && selectedItems.length > 0 && (
        <div className="flex items-center justify-between mb-4 px-1">
          <span className="text-sm font-medium">
            {selectedItems.length} designação(ões) selecionada(s)
          </span>
          <Button
            variant="destructive"
            size="sm"
            onClick={handleBulkDelete}
            className="h-8"
          >
            <Trash2 className="h-3.5 w-3.5 mr-1" />
            Remover selecionados
          </Button>
        </div>
      )}

      <div className={`grid gap-3 ${inDialog ? "" : "p-4"}`}>
        {data && data.length > 0 ? (
          data.map((des) => {
            const ministerioInfo = MinisterioType?.find(
              (m) => m?.value === des?.name
            );
            const dirigenteEstado = Estado?.find(
              (e) => e?.value === des?.membroDirigente?.estado
            );
            const moradorEstado = Estado?.find(
              (e) => e?.value === des?.membroMorador?.estado
            );

            const dirigenteSuplenteEstado = Estado?.find(
              (e) => e?.value === des?.suplenteMembroDirigente?.estado
            );
            const moradorSuplenteEstado = Estado?.find(
              (e) => e?.value === des?.suplenteMembroMorador?.estado
            );

            return (
              <div
                key={des.id}
                className={`rounded-lg border p-3 transition-all ${
                  isSelected(des.id)
                    ? "bg-primary/5 border-primary/30"
                    : "hover:bg-muted/50"
                }`}
              >
                <div className="flex items-start gap-3">
                  {inDialog && (
                    <div className="pt-1">
                      <Checkbox
                        checked={isSelected(des.id)}
                        onCheckedChange={() => toggleSelectItem(des.id)}
                        className={isSelected(des.id) ? "border-primary" : ""}
                      />
                    </div>
                  )}

                  <div className="space-y-2 flex-1">
                    <div className="flex items-center justify-between">
                      <Badge
                        variant="outline"
                        className="bg-primary/10 text-primary font-medium px-2.5 py-0.5"
                      >
                        {ministerioInfo?.name || des.name}
                      </Badge>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => handleDelete(des.id)}
                        disabled={isDeleting === des.id}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>

                    {des.name != "discurso" ? (
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="space-y-1">
                          <h4 className="font-medium text-xs text-muted-foreground">
                            Dirigente
                          </h4>
                          <p className="font-medium">
                            {des.membroDirigente.nome}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {dirigenteEstado?.name ||
                              des.membroDirigente.estado}
                          </p>
                        </div>

                        <div className="space-y-1">
                          <h4 className="font-medium text-xs text-muted-foreground">
                            Morador
                          </h4>
                          <p className="font-medium">
                            {des.membroMorador.nome}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {moradorEstado?.name || des.membroMorador.estado}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="space-y-1">
                          <h4 className="font-medium text-xs text-muted-foreground">
                            Orador
                          </h4>
                          <p className="font-medium">
                            {des.membroDirigente.nome}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {dirigenteEstado?.name ||
                              des.membroDirigente.estado}
                          </p>
                        </div>

                        <div className="space-y-1">
                          <h4 className="font-medium text-xs text-muted-foreground">
                            Orador suplente
                          </h4>
                          <p className="font-medium">
                            {des.suplenteMembroDirigente.nome}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {dirigenteSuplenteEstado?.name ||
                              des.suplenteMembroDirigente.estado}
                          </p>
                        </div>
                      </div>
                    )}

                    <Separator />

                    {des.name != "discurso" && (
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="space-y-1">
                          <h4 className="font-medium text-xs text-muted-foreground">
                            Dirigente suplente
                          </h4>
                          <p className="font-medium">
                            {des.suplenteMembroDirigente.nome}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {dirigenteSuplenteEstado?.name ||
                              des.suplenteMembroDirigente.estado}
                          </p>
                        </div>

                        <div className="space-y-1">
                          <h4 className="font-medium text-xs text-muted-foreground">
                            Morador suplente
                          </h4>
                          <p className="font-medium">
                            {des.suplenteMembroMorador.nome}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {moradorSuplenteEstado?.name ||
                              des.suplenteMembroMorador.estado}
                          </p>
                        </div>
                      </div>
                    )}
                    {des.name != "discurso" && <Separator />}
                    <div className="flex flex-col text-xs space-y-1 text-muted-foreground">
                      <span>
                        lição de conselho:{" "}
                        <Badge className="rounded-full" variant={"secondary"}>
                          {des?.lessonPoint.split(".")[0]}
                        </Badge>
                      </span>
                      <span>
                        ponto de conselho:{" "}
                        <Badge className="rounded-full" variant={"destructive"}>
                          {des?.lessonPoint.split(".")[1]}
                        </Badge>
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground pt-1">
                      <span>Semana: </span>
                      {format(new Date(des.reunioesDates?.from), "dd/MM/yyyy", {
                        locale: pt,
                      })}
                      {" - "}
                      {format(new Date(des.reunioesDates?.to), "dd/MM/yyyy", {
                        locale: pt,
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-6 text-muted-foreground">
            Nenhuma designação encontrada.
          </div>
        )}
      </div>
    </div>
  );
}
