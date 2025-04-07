/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const estadoSchema = z.object({
    nome: z.string().min(3),
    descricao: z.string().optional(),
  });
  
  export async function POST(request: Request) {
    try {
      const body = await request.json();
      const dados = estadoSchema.parse(body);
  
      const estado = await prisma.estado.create({ data: dados });
  
      return NextResponse.json({ message: "Estado criado com sucesso!", estado });
    } catch (error) {
      return NextResponse.json({ error: "Erro ao criar estado" }, { status: 500 });
    }
    finally {
      await prisma.$disconnect();
    }
  }
  
  export async function GET() {
    const estados = await prisma.estado.findMany();
    return NextResponse.json(estados);
  }
  