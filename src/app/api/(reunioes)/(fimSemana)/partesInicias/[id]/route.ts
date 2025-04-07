/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Buscar partesInicias por ID
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const partesInicias = await prisma.partesInicias.findFirst({
    where: { ReunioesDatesId: id },

    select: {
      id:true,
      name:true,
      suplenteMembro: { select: { nome: true, contacto: true, id: true } },
      membro: { select: { nome: true, contacto: true, id: true } },
    },
  });

  if (!partesInicias)
    return NextResponse.json(
      { error: "partesInicias não encontrado" },
      { status: 404 }
    );

  return NextResponse.json(partesInicias);
}

// Atualizar partesInicias
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await req.json();

    const partesInicias = await prisma.partesInicias.update({
      where: { id },
      data: body,
    });

    return NextResponse.json({
      message: "partesInicias atualizado com sucesso!",
      partesInicias,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao atualizar partesInicias" },
      { status: 500 }
    );
  }
}

// Excluir partesInicias (eliminação em cascata)
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Exclui o partesInicias
    await prisma.partesInicias.delete({ where: { id } });

    return NextResponse.json({
      message: "partesInicias excluído com sucesso!",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao excluir partesInicias" },
      { status: 500 }
    );
  }
}
