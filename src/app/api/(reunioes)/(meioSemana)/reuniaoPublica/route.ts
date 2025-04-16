/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { reuniaoPublicaSchema } from "@/types/reuniaoFimSemanaDTO/type";
import { ReuniaoPublicaValueType } from "@/services/ReuniaopublicaData/data";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const dados = reuniaoPublicaSchema.parse(body);

    // Verifica se já existe um registro com o mesmo `name` dentro do mesmo `ReunioesDatesId`
    const existingRecord = await prisma.reuniaoPublica.findFirst({
      where: { name: dados.name, ReunioesDatesId: dados.ReunioesDatesId },
    });

    if (existingRecord) {
      return NextResponse.json(
        {
          error: `Já existe um registro "${
            ReuniaoPublicaValueType?.find((tn) => tn.value === dados.name)?.name
          }" para esta semana.`,
        },
        { status: 400 }
      );
    }

    // Contar quantos registros já existem para essa `ReunioesDatesId`
    const totalRegistros = await prisma.reuniaoPublica.count({
      where: { ReunioesDatesId: dados.ReunioesDatesId },
    });

    if (totalRegistros >= 3) {
      return NextResponse.json(
        { error: "O limite de 3 registros por semana foi atingido." },
        { status: 400 }
      );
    }

    const reuniaoPublica = await prisma.reuniaoPublica.create({ data: dados });

    return NextResponse.json({
      message: "reuniaoPublica criado com sucesso!",
      reuniaoPublica,
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
  const reuniaoPublicas = await prisma.reuniaoPublica.findMany();
  return NextResponse.json(reuniaoPublicas);
}
