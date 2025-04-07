/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

type ReuniaoPublicaEnum = "presidente" | "oracaoInicial" | "orador";

// Buscar reuniaoPublica por ID
export async function GET(
  req: Request,
  { params }: { params: { id: string; name: ReuniaoPublicaEnum } }
) {
  const { id: ReunioesDatesId, name } = params;

  if (!ReunioesDatesId || !name) {
    return NextResponse.json(
      { error: "reuniaoPublica não encontrado" },
      { status: 404 }
    );
  }

  const reuniaoPublica = await prisma.reuniaoPublica.findFirst({
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

  if (!reuniaoPublica)
    return NextResponse.json(
      { error: "reuniaoPublica não encontrado" },
      { status: 404 }
    );

  return NextResponse.json(reuniaoPublica);
}
