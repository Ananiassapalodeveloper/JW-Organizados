/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { TesourosSchema } from "@/types/reuniaoMeioSemanaDTO/type";
import { NameTesouros } from "@/services/TesourosData/data";

// Criar um novo registro de tesouros
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const dados = TesourosSchema.parse(body);

    // Verifica se já existe um registro com o mesmo `name` dentro do mesmo `ReunioesDatesId`
    const existingRecord = await prisma.tesouros.findFirst({
      where: { name: dados.name, ReunioesDatesId: dados.ReunioesDatesId },
    });

    if (existingRecord) {
      return NextResponse.json(
        {
          error: `Já existe um registro "${
            NameTesouros.find((tn) => tn.value === dados.name)?.name
          }" para esta semana.`,
        },
        { status: 400 }
      );
    }

    // Contar quantos registros já existem para essa `ReunioesDatesId`
    const totalRegistros = await prisma.tesouros.count({
      where: { ReunioesDatesId: dados.ReunioesDatesId },
    });

    if (totalRegistros >= 3) {
      return NextResponse.json(
        { error: "O limite de 3 registros por semana foi atingido." },
        { status: 400 }
      );
    }

    // Criar um novo registro
    const tesouros = await prisma.tesouros.create({ data: dados });

    return NextResponse.json({
      message: "Tesouros criado com sucesso!",
      tesouros,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message, detalhes: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  const tesouross = await prisma.tesouros.findMany();
  return NextResponse.json(tesouross);
}
