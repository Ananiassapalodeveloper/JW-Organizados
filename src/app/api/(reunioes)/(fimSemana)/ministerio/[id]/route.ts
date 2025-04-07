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
// Buscar ministerios por ID
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id: reunioesDatesId } = params;

  if (!reunioesDatesId) {
    return NextResponse.json({ error: "ID é obrigatório" }, { status: 404 });
  }

  const ministerios = await prisma.ministerio.findMany({
    where: {
      reunioesDatesId,
    },
    include: {
      membroDirigente: {
        select: {
          nome: true,
          estado: true,
        },
      },
      membroMorador: {
        select: {
          nome: true,
          estado: true,
        },
      },
      suplenteMembroDirigente: {
        select: {
          nome: true,
          estado: true,
        },
      },
      suplenteMembroMorador: {
        select: {
          nome: true,
          estado: true,
        },
      },
      reunioesDates: {
        select: {
          from: true,
          to: true,
        },
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

// Atualizar ministerios
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await req.json();

    const ministerios = await prisma.ministerio.update({
      where: { id },
      data: body,
    });

    return NextResponse.json({
      message: "ministerios atualizado com sucesso!",
      ministerios,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao atualizar ministerios" },
      { status: 500 }
    );
  }
}
// Excluir ministerios (eliminação em cascata)
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Exclui o ministerios
    await prisma.ministerio.delete({ where: { id } });

    return NextResponse.json({ message: "ministerios excluído com sucesso!" });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao excluir ministerios" },
      { status: 500 }
    );
  }
}
