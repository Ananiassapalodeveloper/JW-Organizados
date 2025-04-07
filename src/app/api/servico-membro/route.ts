/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

// Validação
const associacaoSchema = z.object({
  membroId: z.string(),
  servicoId: z.string(),
  posicaoId: z.string()
});

// Criar associação
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const dados = associacaoSchema.parse(body);

    const associacao = await prisma.servicoMembro.create({ data: dados });

    return NextResponse.json({ message: "Associação criada!", associacao });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao criar associação" }, { status: 500 });
  }finally {
    await prisma.$disconnect();
  }
}

// Listar todas as associações
export async function GET() {
  const servicoMembros = await prisma.servicoMembro.findMany({
    include: { membro: true, servico: true, posicao: true }
  });
  return NextResponse.json(servicoMembros);
}
