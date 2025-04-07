/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Buscar anos por ID
export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const anos = await prisma.ano.findUnique({
    where: { id }
    // include: { ano: true, carreira: true, servicos: { include: { servico: true, posicao: true } } }
  });

  if (!anos) return NextResponse.json({ error: "anos não encontrado" }, { status: 404 });

  return NextResponse.json(anos);
}

// Atualizar anos
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const body = await req.json();

    const anos = await prisma.ano.update({ where: { id }, data: body });

    return NextResponse.json({ message: "anos atualizado com sucesso!", anos });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao atualizar anos" }, { status: 500 });
  }
}

// Excluir anos (eliminação em cascata)
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    

    // Exclui o anos
    await prisma.ano.delete({ where: { id } });

    return NextResponse.json({ message: "anos excluído com sucesso!" });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao excluir anos" }, { status: 500 });
  }
}
