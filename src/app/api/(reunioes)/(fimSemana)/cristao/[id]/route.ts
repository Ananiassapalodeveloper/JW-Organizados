/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Buscar cristaos por ID
export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id:ReunioesDatesId } = params;


  const cristaos = await prisma.cristao.findMany({
    where: { ReunioesDatesId },
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
      LeitorEstudoBiblico: {
        select: {
          nome: true,
          estado: true,
        },
      },
      LeitorSuplenteEstudoBiblico: {
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

  if (!cristaos) return NextResponse.json({ error: "cristaos não encontrado" }, { status: 404 });

  return NextResponse.json(cristaos);
}

// Atualizar cristaos
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const body = await req.json();

    const cristaos = await prisma.cristao.update({ where: { id }, data: body });

    return NextResponse.json({ message: "cristaos atualizado com sucesso!", cristaos });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao atualizar cristaos" }, { status: 500 });
  }
}

// Excluir cristaos (eliminação em cascata)
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    

    // Exclui o cristaos
    await prisma.cristao.delete({ where: { id } });

    return NextResponse.json({ message: "cristaos excluído com sucesso!" });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao excluir cristaos" }, { status: 500 });
  }
}
