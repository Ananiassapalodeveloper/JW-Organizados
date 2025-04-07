/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Buscar ReunioesDate por ID
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const ReunioesDate = await prisma.reunioesDates.findMany({
    where: { mesId:id },
    orderBy:{
      from:"asc"
    }
    // include: { mes: { include: { ReunioesDates: true, ano: true } } },
  });

  if (!ReunioesDate)
    return NextResponse.json(
      { error: "ReunioesDate não encontrado" },
      { status: 404 }
    );

  return NextResponse.json(ReunioesDate);
}

// Atualizar ReunioesDate
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await req.json();

    const ReunioesDate = await prisma.reunioesDates.update({
      where: { id },
      data: body,
    });

    return NextResponse.json({
      message: "ReunioesDate atualizado com sucesso!",
      ReunioesDate,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao atualizar ReunioesDate" },
      { status: 500 }
    );
  }
}

// Excluir ReunioesDate (eliminação em cascata)
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Exclui o ReunioesDate
    await prisma.reunioesDates.delete({ where: { id } });

    return NextResponse.json({ message: "ReunioesDate excluído com sucesso!" });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao excluir ReunioesDate" },
      { status: 500 }
    );
  }
}
