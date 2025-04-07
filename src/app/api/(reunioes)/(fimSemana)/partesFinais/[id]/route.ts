/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Buscar partesFinais por ID
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const partesFinais = await prisma.partesFinais.findFirst({
    where: { ReunioesDatesId: id },

    select: {
      id:true,
      name:true,
      suplenteMembro: { select: { nome: true, contacto: true, id: true } },
      membro: { select: { nome: true, contacto: true, id: true } },
    },
  });

  if (!partesFinais)
    return NextResponse.json(
      { error: "partesFinais não encontrado" },
      { status: 404 }
    );

  return NextResponse.json(partesFinais);
}

// Atualizar partesFinais
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await req.json();

    const partesFinais = await prisma.partesFinais.update({
      where: { id },
      data: body,
    });

    return NextResponse.json({
      message: "partesFinais atualizado com sucesso!",
      partesFinais,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao atualizar partesFinais" },
      { status: 500 }
    );
  }
}

// Excluir partesFinais (eliminação em cascata)
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Exclui o partesFinais
    await prisma.partesFinais.delete({ where: { id } });

    return NextResponse.json({
      message: "partesFinais excluído com sucesso!",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao excluir partesFinais" },
      { status: 500 }
    );
  }
}
