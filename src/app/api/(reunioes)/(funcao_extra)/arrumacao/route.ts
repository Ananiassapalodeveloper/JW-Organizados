/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { arrumacaoSchema } from "@/types/ExtraActivityDTO/ArrumacaoType/type";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const dados = arrumacaoSchema.parse(body);

    // Contar quantos registros já existem para essa `ReunioesDatesId`
    const totalRegistros = await prisma.arrumacao.count({
      where: { ReunioesDatesId: dados.ReunioesDatesId },
    });

    if (totalRegistros >= 1) {
      return NextResponse.json(
        { error: "Já há um grupo para esta semana" },
        { status: 400 }
      );
    }

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
