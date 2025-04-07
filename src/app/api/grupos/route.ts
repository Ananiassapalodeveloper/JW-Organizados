/* eslint-disable @typescript-eslint/no-unused-vars */
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import z from "zod";

const grupoSchema = z.object({
  nome: z.string().min(3),
  descricao:z.string().nullable().optional()
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const dados = grupoSchema.parse(body);

    const grupo = await prisma.grupo.create({ data: dados });

    return NextResponse.json({ message: "grupo criado com sucesso!", grupo });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao criar grupo" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function GET() {
  try {
    const grupos = await prisma.grupo.findMany()

    return NextResponse.json(grupos)
  } catch (error) {
    console.error("Erro ao buscar grupos:", error)
    return NextResponse.json({ error: "Erro ao buscar grupos" }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}

