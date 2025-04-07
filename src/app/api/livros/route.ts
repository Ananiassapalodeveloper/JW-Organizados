/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const estadoSchema = z.object({
  name: z.string().min(3),
  lesson: z.string().nullable().optional(),
  point: z.string().nullable().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const dados = estadoSchema.parse(body);

    const estado = await prisma.bookStudying.create({ data: dados });

    return NextResponse.json({ message: "Estado criado com sucesso!", estado });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao criar estado" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function GET() {
  const estados = await prisma.bookStudying.findMany();
  return NextResponse.json(estados);
}
