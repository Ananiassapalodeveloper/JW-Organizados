/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const tesourosSchema = z.enum(["leitura", "discurso", "perolas"]);

// Buscar tesouros por ID
export async function GET(
  req: Request,
  { params }: { params: { id: string; name: z.infer<typeof tesourosSchema> } }
) {
  const { id: ReunioesDatesId, name } = params;

  const tesouros = await prisma.tesouros.findFirst({
    where: { ReunioesDatesId, name },
    // include: { tesouros: true, carreira: true, servicos: { include: { servico: true, posicao: true } } }
    select: {
      id: true,
      name: true,
      suplenteMembro: {
        select: {
          nome: true,
          contacto: true,
          id: true,
        },
      },
      membro: {
        select: { nome: true, contacto: true, id: true },
      },
    },
  });

  if (!tesouros)
    return NextResponse.json(
      { error: "tesouros não encontrado" },
      { status: 404 }
    );

  return NextResponse.json(tesouros);
}
