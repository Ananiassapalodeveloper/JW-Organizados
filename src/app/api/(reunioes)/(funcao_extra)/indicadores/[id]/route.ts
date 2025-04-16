/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

// Buscar indicadores por ID
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id: ReunioesDatesId } = params;

  if (!ReunioesDatesId) {
    return NextResponse.json({ error: "ID é obrigatório" }, { status: 404 });
  }

  const indicadores = await prisma.indicadores.findMany({
    where: {
      ReunioesDatesId,
    },
    include: {
      membro: {
        select: {
          nome: true,
          estado: true,
        },
      },
      suplenteMembro: {
        select: {
          nome: true,
          estado: true,
        },
      },

      ReunioesDates: {
        select: {
          from: true,
          to: true,
        },
      },
    },
  });

  if (!indicadores)
    return NextResponse.json(
      { error: "indicadores não encontrado" },
      { status: 404 }
    );

  return NextResponse.json(indicadores);
}

// Atualizar indicadores
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await req.json();

    const indicadores = await prisma.indicadores.update({
      where: { id },
      data: body,
    });

    return NextResponse.json({
      message: "indicadores atualizado com sucesso!",
      indicadores,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao atualizar.indicadores" },
      { status: 500 }
    );
  }
}
// Excluir indicadores (eliminação em cascata)
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Exclui o indicadores
    await prisma.indicadores.delete({ where: { id } });

    return NextResponse.json({ message: "indicadores excluído com sucesso!" });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao excluir indicadores" },
      { status: 500 }
    );
  }
}
