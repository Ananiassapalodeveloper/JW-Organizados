/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Buscar arrumacaos por ID
export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const arrumacaos = await prisma.arrumacao.findUnique({
    where: { id }
    // include: { arrumacao: true, carreira: true, servicos: { include: { servico: true, posicao: true } } }
  });

  if (!arrumacaos) return NextResponse.json({ error: "arrumacaos não encontrado" }, { status: 404 });

  return NextResponse.json(arrumacaos);
}

// Atualizar arrumacaos
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const body = await req.json();

    const arrumacaos = await prisma.arrumacao.update({ where: { id }, data: body });

    return NextResponse.json({ message: "arrumacaos atualizado com sucesso!", arrumacaos });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao atualizar arrumacaos" }, { status: 500 });
  }
}

// Excluir arrumacaos (eliminação em cascata)
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    

    // Exclui o arrumacaos
    await prisma.arrumacao.delete({ where: { id } });

    return NextResponse.json({ message: "arrumacaos excluído com sucesso!" });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao excluir arrumacaos" }, { status: 500 });
  }
}
