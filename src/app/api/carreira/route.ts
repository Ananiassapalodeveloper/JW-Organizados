/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const carreiraSchema = z.object({
    nome: z.string().min(3),
    descricao: z.string().optional(),
  });
  
  export async function POST(request: Request) {
    try {
      const body = await request.json();
      const dados = carreiraSchema.parse(body);
  
      const carreira = await prisma.carreira.create({ data: dados });
  
      return NextResponse.json({ message: "Carreira criada com sucesso!", carreira });
    } catch (error) {
      return NextResponse.json({ error: "Erro ao criar carreira" }, { status: 500 });
    }finally {
      await prisma.$disconnect();
    }
  }
  
  export async function GET() {
    const carreiras = await prisma.carreira.findMany();
    return NextResponse.json(carreiras);
  }
  