/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const partesIniciasSchema = z.object({
  name: z.string(),
  memberId: z.string().optional(),
  suplenteMemberId: z.string().optional(),
  ReunioesDatesId: z.string(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const dados = partesIniciasSchema.parse(body);

    // Verifica se já existe um registro
    const existingRecord = await prisma.partesInicias.findMany({
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
    const partesInicias = await prisma.partesInicias.create({ data: dados });

    return NextResponse.json({
      message: "partesInicias criado com sucesso!",
      partesInicias,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao criar partesInicias" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const dados = partesIniciasSchema.parse(body);

    // Busca o único registro existente
    const existingRecord = await prisma.partesInicias.findFirst();

    if (!existingRecord) {
      return NextResponse.json(
        { error: "Nenhum registro encontrado para atualizar." },
        { status: 404 }
      );
    }
    
    // Atualiza o registro existente
    const updatedRecord = await prisma.partesInicias.update({
      where: { id: existingRecord.id },
      data: dados,
    });

    return NextResponse.json({
      message: "Registro atualizado com sucesso!",
      updatedRecord,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao atualizar partesInicias" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function GET() {
  const partesIniciass = await prisma.partesInicias.findMany();
  return NextResponse.json(partesIniciass);
}
