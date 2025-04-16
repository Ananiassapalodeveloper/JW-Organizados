/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sentinelaSchema } from "@/types/reuniaoFimSemanaDTO/type";
import { sentinelaValueType } from "@/services/WatchTowerLeadData/data";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const dados = sentinelaSchema.parse(body);

    // Verifica se já existe um registro com o mesmo `name` dentro do mesmo `ReunioesDatesId`
    const existingRecord = await prisma.sentinela.findFirst({
      where: { name: dados.name, ReunioesDatesId: dados.ReunioesDatesId },
    });

    if (existingRecord) {
      return NextResponse.json(
        {
          error: `Já existe um registro "${
            sentinelaValueType?.find((tn) => tn.value === dados.name)?.name
          }" para esta semana.`,
        },
        { status: 400 }
      );
    }

    // Contar quantos registros já existem para essa `ReunioesDatesId`
    const totalRegistros = await prisma.sentinela.count({
      where: { ReunioesDatesId: dados.ReunioesDatesId },
    });

    if (totalRegistros >= 3) {
      return NextResponse.json(
        { error: "O limite de 3 registros por semana foi atingido." },
        { status: 400 }
      );
    }

    const sentinela = await prisma.sentinela.create({ data: dados });

    return NextResponse.json({
      message: "sentinela criado com sucesso!",
      sentinela,
    });
  } catch (error: any) {
    console.error("Erro ao registrar membro:", error);

    return NextResponse.json(
      { error: error.message || "Erro desconhecido" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function GET() {
  const sentinelas = await prisma.sentinela.findMany();
  return NextResponse.json(sentinelas);
}
