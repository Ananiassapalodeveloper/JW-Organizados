/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

// Buscar arrumacao por ID
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id: ReunioesDatesId } = params;

  if (!ReunioesDatesId) {
    return NextResponse.json({ error: "ID é obrigatório" }, { status: 404 });
  }

  const arrumacao = await prisma.arrumacao.findMany({
    where: {
      ReunioesDatesId,
    },
    orderBy: {
      Grupo: {
        nome: "asc",
      },
    },
    include: {
      Grupo: {
        include: {
          dirigente: {
            select: {
              nome: true,
              estado: true,
              contacto: true,
            },
          },
          _count:{
            select:{
              Arrumacao:true,
              membros:true
            }
          }
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

  if (!arrumacao)
    return NextResponse.json(
      { error: "arrumacao não encontrado" },
      { status: 404 }
    );

  return NextResponse.json(arrumacao);
}

// Atualizar arrumacao
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await req.json();

    const arrumacao = await prisma.arrumacao.update({
      where: { id },
      data: body,
    });

    return NextResponse.json({
      message: "arrumacao atualizado com sucesso!",
      arrumacao,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao atualizar.arrumacao" },
      { status: 500 }
    );
  }
}
// Excluir arrumacao (eliminação em cascata)
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Exclui o arrumacao
    await prisma.arrumacao.delete({ where: { id } });

    return NextResponse.json({ message: "arrumacao excluído com sucesso!" });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao excluir arrumacao" },
      { status: 500 }
    );
  }
}
