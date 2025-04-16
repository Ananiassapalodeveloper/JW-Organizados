/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

// Buscar assistencia por ID
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id: ReunioesDatesId } = params;

  if (!ReunioesDatesId) {
    return NextResponse.json({ error: "ID é obrigatório" }, { status: 404 });
  }

  const assistencia = await prisma.assistencia.findMany({
    where: {
      ReunioesDatesId,
    },
    include: {
      ReunioesDates: {
        select: {
          from: true,
          to: true,
        },
      },
      
    },
  });

  if (!assistencia)
    return NextResponse.json(
      { error: "assistencia não encontrado" },
      { status: 404 }
    );

  return NextResponse.json(assistencia);
}

// Atualizar assistencia
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await req.json();

    const assistencia = await prisma.assistencia.update({
      where: { id },
      data: body,
    });

    return NextResponse.json({
      message: "assistencia atualizado com sucesso!",
      assistencia,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao atualizar.assistencia" },
      { status: 500 }
    );
  }
}
// Excluir assistencia (eliminação em cascata)
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Exclui o assistencia
    await prisma.assistencia.delete({ where: { id } });

    return NextResponse.json({ message: "assistencia excluído com sucesso!" });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao excluir assistencia" },
      { status: 500 }
    );
  }
}
