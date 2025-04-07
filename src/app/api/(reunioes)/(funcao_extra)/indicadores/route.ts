/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const indicadoresSchema = z.object({
  name: z.string(),
  memberId: z.string().optional(),
  suplenteMemberId: z.string().optional(),
  ReunioesDatesId: z.string(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const dados = indicadoresSchema.parse(body);

    const indicadores = await prisma.indicadores.create({ data: dados });

    return NextResponse.json({
      message: "indicadores criado com sucesso!",
      indicadores,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao criar indicadores" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function GET() {
  const indicadoress = await prisma.indicadores.findMany();
  return NextResponse.json(indicadoress);
}
