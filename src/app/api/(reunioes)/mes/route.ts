/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const mesSchema = z.object({
  descricao: z.string().optional(),
  mes: z.number({ required_error: "O mes é obrigatório" }),
  AnosId: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const dados = mesSchema.parse(body);

    const mes = await prisma.meses.create({ data: dados });

    return NextResponse.json({ message: "mes criado com sucesso!", mes });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao criar mes" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function GET() {
  const mes = await prisma.meses.findMany({
    select: {
      ano: true,
      AnosId: true,
      descricao: true,
      ReunioesDates: true,
      mes: true,
      id: true,
      _count: true,
    },
    orderBy: {
      mes: "asc",
    },
  });
  return NextResponse.json(mes);
}
