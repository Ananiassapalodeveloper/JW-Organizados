/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cristaoSchema } from "@/types/reuniaoMeioSemanaDTO/type";




export async function POST(request: Request) {
  try {
    const body = await request.json();
    const dados = cristaoSchema.parse(body);

    const cristao = await prisma.cristao.create({ data: dados });

    return NextResponse.json({
      message: "cristao criado com sucesso!",
      cristao,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao criar cristao" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function GET() {
  const cristaos = await prisma.cristao.findMany();
  return NextResponse.json(cristaos);
}
