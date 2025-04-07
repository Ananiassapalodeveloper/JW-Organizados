/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const posicaoSchema = z.object({
    nome: z.string().min(3),
    descricao: z.string().optional(),
  });
  
  export async function POST(request: Request) {
    try {
      const body = await request.json();
      const dados = posicaoSchema.parse(body);
  
      const posicao = await prisma.posicao.create({ data: dados });
  
      return NextResponse.json({ message: "posicao criada com sucesso!", posicao });
    } catch (error) {
      return NextResponse.json({ error: "Erro ao criar posicao" }, { status: 500 });
    }finally {
      await prisma.$disconnect();
    }
  }
  
  export async function GET() {
    const posicaos = await prisma.posicao.findMany();
    return NextResponse.json(posicaos);
  }
  