/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

// Buscar tesouros por ID
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id: ReunioesDatesId } = params;

  if (!ReunioesDatesId) {
    return NextResponse.json({ error: "ID é obrigatório" }, { status: 404 });
  }

  const tesouros = await prisma.tesouros.findMany({
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

  if (!tesouros)
    return NextResponse.json(
      { error: "Tesouros não encontrado" },
      { status: 404 }
    );

  return NextResponse.json(tesouros);
}

// Atualizar tesouros
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await req.json();

    const tesouros = await prisma.tesouros.update({
      where: { id },
      data: body,
    });

    return NextResponse.json({
      message: "tesouros atualizado com sucesso!",
      tesouros,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao atualizar.tesouros" },
      { status: 500 }
    );
  }
}
// Excluir tesouros (eliminação em cascata)
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Exclui o tesouros
    await prisma.tesouros.delete({ where: { id } });

    return NextResponse.json({ message: "tesouros excluído com sucesso!" });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao excluir tesouros" },
      { status: 500 }
    );
  }
}
