/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Buscar estados por ID
export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const estados = await prisma.estado.findUnique({
    where: { id }
    // include: { estado: true, carreira: true, servicos: { include: { servico: true, posicao: true } } }
  });

  if (!estados) return NextResponse.json({ error: "estados não encontrado" }, { status: 404 });

  return NextResponse.json(estados);
}

// Atualizar estados
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const body = await req.json();

    const estados = await prisma.estado.update({ where: { id }, data: body });

    return NextResponse.json({ message: "estados atualizado com sucesso!", estados });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao atualizar estados" }, { status: 500 });
  }
}

// Excluir estados (eliminação em cascata)
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    

    // Exclui o estados
    await prisma.estado.delete({ where: { id } });

    return NextResponse.json({ message: "estados excluído com sucesso!" });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao excluir estados" }, { status: 500 });
  }
}
