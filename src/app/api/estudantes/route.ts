import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

// Esquema de validação com Zod
const studentSchema = z.object({
  name: z.string().min(3, "Nome muito curto"),
  date: z.string().datetime().optional(),
  bookId: z.string().uuid("ID do livro inválido").optional(),
  membroId: z.string().uuid("ID do membro inválido"),
  membroReferenteId: z.string().uuid("ID do membro referente inválido").nullable().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = studentSchema.safeParse(body);

    if (!data.success) {
      return NextResponse.json(
        { error: data.error.errors.map((err) => err.message).join(", ") },
        { status: 400 }
      );
    }

    const studentData = data.data;

    // Verifica se o membro existe
    const membroExists = await prisma.membro.findUnique({
      where: { id: studentData.membroId },
    });

    if (!membroExists) {
      return NextResponse.json(
        { error: "Membro não encontrado. Verifique o ID informado." },
        { status: 400 }
      );
    }

    // Verifica se o membro referente existe (se for fornecido)
    if (studentData.membroReferenteId) {
      const membroReferenteExists = await prisma.membro.findUnique({
        where: { id: studentData.membroReferenteId },
      });

      if (!membroReferenteExists) {
        return NextResponse.json(
          { error: "Membro referente não encontrado. Verifique o ID informado." },
          { status: 400 }
        );
      }
    }

    // Verifica se o livro de estudo existe (se for fornecido)
    if (studentData.bookId) {
      const bookExists = await prisma.bookStudying.findUnique({
        where: { id: studentData.bookId },
      });

      if (!bookExists) {
        return NextResponse.json(
          { error: "Livro de estudo não encontrado. Verifique o ID informado." },
          { status: 400 }
        );
      }
    }

    // Garante que membroReferenteId seja `null` caso não tenha sido enviado
    const newStudent = await prisma.students.create({
      data: {
        name: studentData.name,
        date: studentData.date,
        bookId: studentData.bookId || null,
        membroId: studentData.membroId,
        membroReferenteId: studentData.membroReferenteId || null,
      },
    });

    return NextResponse.json(newStudent, { status: 201 });
  } catch (error) {
    console.error("Erro ao registrar estudante:", error);

    return NextResponse.json(
      { error: "Erro ao registrar estudante. Verifique os dados enviados." },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
