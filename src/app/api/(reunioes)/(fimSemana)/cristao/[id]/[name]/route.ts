/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const cristaoSchema = z.enum(["parte1", "parte2", "estudoBiblico"]);
type cristaoDesignacao = z.infer<typeof cristaoSchema>;

// Buscar cristao por ID
export async function GET(
  req: Request,
  { params }: { params: { id: string; name: cristaoDesignacao } }
) {
  const { id:ReunioesDatesId, name } = params;

  if (!ReunioesDatesId || !name) {
    return NextResponse.json(
      { error: "cristao não encontrado" },
      { status: 404 }
    );
  }

  const cristao = await prisma.cristao.findFirst({
    where: {
      ReunioesDatesId,
      name,
    },
    select: {
      id: true,
      name: true,
      tema: true,
      ReunioesDates:true,

      membro: {
        select: { nome: true, contacto: true, id: true },
      },
      suplenteMembro: {
        select: { nome: true, contacto: true, id: true },
      },
      LeitorEstudoBiblico: {
        select: { nome: true, contacto: true, id: true },
      },
      LeitorSuplenteEstudoBiblico: {
        select: { nome: true, contacto: true, id: true },
      },
    },
  });

  if (!cristao)
    return NextResponse.json(
      { error: "cristao não encontrado" },
      { status: 404 }
    );

  return NextResponse.json(cristao);
}
