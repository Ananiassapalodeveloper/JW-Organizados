import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const membros = await prisma.membro.findMany({
      select: {
        id: true,
        nome: true,
      },
      orderBy: {
        nome: "asc",
      },
    })

    return NextResponse.json(membros)
  } catch (error) {
    console.error("Erro ao buscar membros:", error)
    return NextResponse.json({ error: "Erro ao buscar membros" }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}

