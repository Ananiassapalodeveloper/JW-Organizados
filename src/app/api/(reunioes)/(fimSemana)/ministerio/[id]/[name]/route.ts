/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const ministeriosSchema = z.enum([
  "iniciarConversa1",
  "iniciarConversa2",
  "iniciarConversa3",
  "fazerDisciplo",
  "explicarCrenca",
  "discurso",
]);
type ministerioDesignacao = z.infer<typeof ministeriosSchema>;

// Buscar ministerios por ID
export async function GET(
  req: Request,
  { params }: { params: { id: string; name: ministerioDesignacao } }
) {
  const { id, name } = params;

  if (!id || !name) {
    return NextResponse.json(
      { error: "ministerios não encontrado" },
      { status: 404 }
    );
  }

  const ministerios = await prisma.ministerio.findFirst({
    where: {
      reunioesDatesId: id,
      name,
    },
    select: {
      id: true,
      name: true,
      tema:true,
      membroDirigente: {
        select: { nome: true, contacto: true, id: true },
      },
      membroMorador: {
        select: { nome: true, contacto: true, id: true },
      },
      suplenteMembroDirigente: {
        select: { nome: true, contacto: true, id: true },
      },
      suplenteMembroMorador: {
        select: { nome: true, contacto: true, id: true },
      },
      
    },
  });

  if (!ministerios)
    return NextResponse.json(
      { error: "ministerios não encontrado" },
      { status: 404 }
    );

  return NextResponse.json(ministerios);
}
