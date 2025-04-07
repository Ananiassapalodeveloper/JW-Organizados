/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Buscar sentinelas por ID
export async function GET(
  req: Request,
  { params }: { params: { id: string; name: string } }
) {
  const { id } = params;

  const sentinelas = await prisma.membro.findMany({
    where: { id,  },
    select: {
      _count: true,
    },
  });

  if (!sentinelas)
    return NextResponse.json(
      { error: "sentinelas não encontrado" },
      { status: 404 }
    );

  return NextResponse.json(sentinelas);
}
