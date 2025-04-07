/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const arrumacaoSchema = z.object({
  name:            z.string(),
  grupoId :        z.string(),
  ReunioesDatesId: z.string()
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const dados = arrumacaoSchema.parse(body);

    const arrumacao = await prisma.arrumacao.create({ data: dados });

    return NextResponse.json({
      message: "arrumacao criado com sucesso!",
      arrumacao,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao criar arrumacao" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function GET() {
  const arrumacaos = await prisma.arrumacao.findMany();
  return NextResponse.json(arrumacaos);
}
