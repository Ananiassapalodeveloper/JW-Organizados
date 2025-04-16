/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFetch } from "@/hooks/useFetch";
import { Loader } from "lucide-react";
import Link from "next/link";
import { columns } from "@/components/IrmaoComponents/columns";
import { DataTable } from "@/components/IrmaoComponents/data-table";
import { Members } from "./data/data";
import { memberSchema, memberType } from "./data/schema";
import { SexoEnum } from "@prisma/client";

const MembroBasico = {
  id: "a3f70f86-85e4-4995-be8f-70667a4b5524",
  nome: "Abel Gonga",
  email: "j@gmail.com",
  createdAt: "2025-03-30T23:36:44.697Z",
  password: "1234",
  contacto: "+244989758753",
  dataNascimento: "2025-03-30T23:00:00.000Z",
  dataMatricula: "2025-03-30T23:00:00.000Z",
  dataPublicador: "2025-03-30T23:00:00.000Z",
  dataBaptismo: "2025-03-30T23:00:00.000Z",
  dataAuxiliar: "2025-03-30T23:00:00.000Z",
  dataRegular: null,
  descricao: "eeeehekhlk",
  studentsId: null,
  sexo: "M",
  estado: "BATIZADO",
  carreira: "PIONEIRO_AUXILIAR",
  dadiva: "SERVO_MINISTERIAL",
  grupoId: "6c41aacd-d03f-4284-b67c-2cc2474bc0da",
  grupo: {
    nome: "grupo 1",
    dirigente: null,
    ajudante: {
      nome: "Abel Gonga",
    },
  },
  servicos: [
    {
      id: "352a039e-83d3-486b-94fa-6896daab2701",
      membroId: "a3f70f86-85e4-4995-be8f-70667a4b5524",
      servico: "CONTAS",
      posicao: "DIRIGENTE",
    },
    {
      id: "20b49f79-1c40-4ea9-81d9-a86cbff728e0",
      membroId: "a3f70f86-85e4-4995-be8f-70667a4b5524",
      servico: "LITERATURA",
      posicao: "DIRIGENTE",
    },
    {
      id: "9abc6146-b810-41dc-9cbb-80c66bacc2ad",
      membroId: "a3f70f86-85e4-4995-be8f-70667a4b5524",
      servico: "SOM_AUDIO",
      posicao: "DIRIGENTE",
    },
  ],
};

export type MembroBasico = typeof MembroBasico;

export function MEMBROS() {
  const {
    error,
    data: membros,
    isLoading,
  } = useFetch<MembroBasico[]>("member2/basico");

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <div className="flex flex-col items-center gap-2">
          <Loader className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Carregando designações...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-destructive">Erro</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Houve um erro ao carregar as designações. Tente novamente.</p>
            <Button className="mt-4" variant="outline" asChild>
              <Link href="/main">Voltar ao início</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const BrothersFilteredCamps = membros?.map((m, index) => {
    const Brother: memberType = {
      id: String(index),
      IdOriginal: m.id,
      nome: m.nome,
      email: m.email,
      contacto: m.contacto,
      sexo: m.sexo,
      estado: m.estado,
      carreira: m.carreira ? m.carreira : "sem carreira",
      dadiva: m.dadiva ? m.dadiva : "sem dádiva",
      grupo: m.grupo.nome ? m.grupo.nome : "Não tem grupo",
      servicos: m?.servicos?.map((m) => ({
        servico: m.servico,
        posicao: m.posicao,
      })),
    };
    return Brother;
  });

  return <DataTable data={BrothersFilteredCamps ?? []} columns={columns} />;
}
