/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
const dadivaSchema = z.object({
    nome: z.string().min(3),
    descricao: z.string().optional(),
  });
  
  export async function POST(request: Request) {
    try {
      const body = await request.json();
      const dados = dadivaSchema.parse(body);
  
      const dadiva = await prisma.dadiva.create({ data: dados });
  
      return NextResponse.json({ message: "Dádiva criada com sucesso!", dadiva });
    } catch (error) {
      return NextResponse.json({ error: "Erro ao criar dádiva" }, { status: 500 });
    }finally {
      await prisma.$disconnect();
    }
  }
  
  export async function GET() {
    const dadivas = await prisma.dadiva.findMany();
    return NextResponse.json(dadivas);
  }
  