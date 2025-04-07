/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

// Validação dos dados recebidos
const taskSchema = z.object({
  name: z.string().min(3, "Nome da tarefa é obrigatório"),
  isCorrected: z.boolean().default(false),
  studentId: z.string().uuid("ID do estudante inválido"),
  membroId: z.string().uuid("ID do membro inválido"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = taskSchema.parse(body);

    // Verifica se o estudante existe
    const studentExists = await prisma.students.findUnique({
      where: { id: data.studentId },
    });

    if (!studentExists) {
      return NextResponse.json(
        { error: "Estudante não encontrado." },
        { status: 400 }
      );
    }

    // Verifica se o membro existe
    const membroExists = await prisma.membro.findUnique({
      where: { id: data.membroId },
    });

    if (!membroExists) {
      return NextResponse.json(
        { error: "Membro não encontrado." },
        { status: 400 }
      );
    }

    // Criar a nova tarefa
    const newTask = await prisma.tasks.create({ data });

    return NextResponse.json(newTask, { status: 201 });
  } catch (error: any) {
    console.error("Erro ao registrar tarefa:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors.map((err) => err.message).join(", ") },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Erro ao registrar tarefa. Verifique os dados enviados." },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
