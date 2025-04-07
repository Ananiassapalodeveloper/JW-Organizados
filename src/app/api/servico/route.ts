/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const servicoSchema = z.object({
    nome: z.string().min(3),
    descricao: z.string().optional(),
  });
  
  export async function POST(request: Request) {
    try {
      const body = await request.json();
      const dados = servicoSchema.parse(body);
  
      const servico = await prisma.servico.create({ data: dados });
  
      return NextResponse.json({ message: "Serviço criado com sucesso!", servico });
    } catch (error) {
      return NextResponse.json({ error: "Erro ao criar serviço" }, { status: 500 });
    }finally {
      await prisma.$disconnect();
    }
  }
  
  export async function GET() {
    const servicos = await prisma.servico.findMany();
    return NextResponse.json(servicos);
  }
  