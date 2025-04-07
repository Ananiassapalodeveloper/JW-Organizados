/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Buscar sentinelas por ID
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id: ReunioesDatesId } = params;

  const sentinelas = await prisma.sentinela.findMany({
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
      ReunioesDates: {
        select: {
          from: true,
          to: true,
        },
      },
    },
  });

  if (!sentinelas)
    return NextResponse.json(
      { error: "sentinelas não encontrado" },
      { status: 404 }
    );

  return NextResponse.json(sentinelas);
}

// Atualizar sentinelas
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await req.json();

    const existingThisDisignation = await prisma.sentinela.findUnique({
      where: { id },
    });

    if(existingThisDisignation){
      return NextResponse.json(
        { error: "Houve um erro ao actualizar, pois já foi removido" },
        { status: 500 }
      );
    }

    const sentinelas = await prisma.sentinela.update({
      where: { id },
      data: body,
    });

    return NextResponse.json({
      message: "sentinelas atualizado com sucesso!",
      sentinelas,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Houve um erro ao actualizar" },
      { status: 500 }
    );
  }
}

// Excluir sentinelas (eliminação em cascata)
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Exclui o sentinelas
    await prisma.sentinela.delete({ where: { id } });

    return NextResponse.json({
      message: "sentinelas excluído com sucesso!",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao excluir sentinelas" },
      { status: 500 }
    );
  }
}
