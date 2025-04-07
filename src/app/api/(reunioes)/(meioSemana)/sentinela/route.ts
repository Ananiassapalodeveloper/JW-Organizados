/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sentinelaSchema } from "@/types/reuniaoFimSemanaDTO/type";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const dados = sentinelaSchema.parse(body);

    const sentinela = await prisma.sentinela.create({ data: dados });

    return NextResponse.json({
      message: "sentinela criado com sucesso!",
      sentinela,
    });
  } catch (error: any) {
    console.error("Erro ao registrar membro:", error);

    // Verificar erros específicos do Prisma
    if (error.code === "P2002") {
      const field = error.meta?.target?.[1] || "campo";
      return NextResponse.json(
        { error: `Já existe um registo semelhante, se desejares actualizá-lo, elimina-o.` },
        { status: 400 }
      );
    }

    if (error.code === "P2003") {
      return NextResponse.json(
        {
          error:
            "Referência inválida. Verifique se o grupo ou superior existe.",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: error.message || "Erro desconhecido" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function GET() {
  const sentinelas = await prisma.sentinela.findMany();
  return NextResponse.json(sentinelas);
}
