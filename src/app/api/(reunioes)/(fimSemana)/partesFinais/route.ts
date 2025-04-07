/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const partesFinaisSchema = z.object({
  name: z.string(),
  memberId: z.string().optional(),
  suplenteMemberId: z.string().optional(),
  ReunioesDatesId: z.string(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const dados = partesFinaisSchema.parse(body);

    // Verifica se já existe um registro
    const existingRecord = await prisma.partesFinais.findMany({
      where: { ReunioesDatesId: dados.ReunioesDatesId },
    });
    if (existingRecord.length === 4) {
      return NextResponse.json(
        {
          error:
            "O registro Para esta semana já está preenchido, não é possível criar outro.",
        },
        { status: 400 }
      );
    }

    // Se não existir, cria o registro
    const partesFinais = await prisma.partesFinais.create({ data: dados });

    return NextResponse.json({
      message: "partesFinais criado com sucesso!",
      partesFinais,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao criar partesFinais" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const dados = partesFinaisSchema.parse(body);

    // Busca o único registro existente
    const existingRecord = await prisma.partesFinais.findFirst();

    if (!existingRecord) {
      return NextResponse.json(
        { error: "Nenhum registro encontrado para atualizar." },
        { status: 404 }
      );
    }

    // Atualiza o registro existente
    const updatedRecord = await prisma.partesFinais.update({
      where: { id: existingRecord.id },
      data: dados,
    });

    return NextResponse.json({
      message: "Registro atualizado com sucesso!",
      updatedRecord,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao atualizar partesFinais" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function GET() {
  const partesFinaiss = await prisma.partesFinais.findMany();
  return NextResponse.json(partesFinaiss);
}
