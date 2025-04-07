/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

type sentinelaEnum = "dirigente" | "leitor" | "oracaoFinal";

// Buscar sentinela por ID
export async function GET(
  req: Request,
  { params }: { params: { id: string; name: sentinelaEnum } }
) {
  const { id: ReunioesDatesId, name } = params;

  if (!ReunioesDatesId || !name) {
    return NextResponse.json(
      { error: "sentinela não encontrado" },
      { status: 404 }
    );
  }

  const sentinela = await prisma.sentinela.findFirst({
    where: {
      ReunioesDatesId,
      name,
    },
    select: {
      id: true,
      name: true,
      tema: true,
      ReunioesDates: true,

      membro: {
        select: { nome: true, contacto: true, id: true },
      },
      suplenteMembro: {
        select: { nome: true, contacto: true, id: true },
      },
    },
  });

  if (!sentinela)
    return NextResponse.json(
      { error: "sentinela não encontrado" },
      { status: 404 }
    );

  return NextResponse.json(sentinela);
}
