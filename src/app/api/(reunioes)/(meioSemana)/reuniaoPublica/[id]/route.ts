/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Buscar reuniaoPublicas por ID
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id: ReunioesDatesId } = params;

  const reuniaoPublicas = await prisma.reuniaoPublica.findMany({
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

  if (!reuniaoPublicas)
    return NextResponse.json(
      { error: "reuniaoPublicas não encontrado" },
      { status: 404 }
    );

  return NextResponse.json(reuniaoPublicas);
}

// Atualizar reuniaoPublicas
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await req.json();

    const existingThisDisignation = await prisma.reuniaoPublica.findUnique({
      where: { id },
    });

    if(existingThisDisignation){
      return NextResponse.json(
        { error: "Houve um erro ao actualizar, pois já foi removido" },
        { status: 500 }
      );
    }

    const reuniaoPublicas = await prisma.reuniaoPublica.update({
      where: { id },
      data: body,
    });

    return NextResponse.json({
      message: "reuniaoPublicas atualizado com sucesso!",
      reuniaoPublicas,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Houve um erro ao actualizar" },
      { status: 500 }
    );
  }
}

// Excluir reuniaoPublicas (eliminação em cascata)
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Exclui o reuniaoPublicas
    await prisma.reuniaoPublica.delete({ where: { id } });

    return NextResponse.json({
      message: "reuniaoPublicas excluído com sucesso!",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao excluir reuniaoPublicas" },
      { status: 500 }
    );
  }
}
