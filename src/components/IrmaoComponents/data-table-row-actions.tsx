"use client";

import { Row } from "@tanstack/react-table";
import {
  MoreHorizontal,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { memberSchema } from "../../app/main/membros/data/schema";
import { privilegioServicos, posicoes } from "@/app/main/membros/data/data";
import { Badge } from "../ui/badge";
import { api } from "@/hooks/use-membro-form-data";
import { useState } from "react";
import { mutate } from "swr";
import { toast } from "@/hooks/use-toast";
import { AxiosError } from "axios";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const member = memberSchema.parse(row.original);

  async function handleDelete(id: string) {
    try {
      setIsDeleting(id);
      setSubmitError(null);

      await api.delete(`member2/${id}`);

      // Atualiza o cache do GET
      mutate("member2/basico");

      toast({
        title: "Irmão removido com sucesso",
        description: "O membro foi removida do sistema.",
        variant: "default",
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data?.message || "Erro ao remover o membro";

        setSubmitError(errorMessage);

        toast({
          title: "Erro ao remover o membro",
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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <MoreHorizontal />
          <span className="sr-only">Abrir menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem>Editar</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          {!(member.servicos.length === 0) ? (
            <DropdownMenuSubTrigger>Serviços</DropdownMenuSubTrigger>
          ) : (
            <Badge variant={"outline"} className="text-xs my-2">
              Sem departamento
            </Badge>
          )}
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup value={member.nome}>
              {member.servicos.map((label) => {
                const servico = privilegioServicos.find(
                  (s) => s.value === label.servico
                );
                const posicao = posicoes.find((s) => s.value === label.posicao);
                return (
                  <DropdownMenuRadioItem
                    className="space-x-2"
                    key={label.servico}
                    value={label.servico}
                  >
                    <Badge variant={"secondary"} className="text-xs">
                      {servico?.label}
                    </Badge>{" "}
                    <span>{posicao?.label}</span>
                  </DropdownMenuRadioItem>
                );
              })}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem  onClick={() => handleDelete(member.IdOriginal ?? "")}
                disabled={isDeleting === member.IdOriginal} title="Remover Designações">
              Deletar
              <DropdownMenuShortcut>
                <Trash2 className="h-4 w-4" />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
    
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
