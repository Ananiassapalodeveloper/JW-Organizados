import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const membros = await prisma.membro.findMany({
      include:{
        grupo:{
          select: {
            nome:true,
            dirigente:{
              select:{
                nome:true
              }
            },
            ajudante:{
              select:{
                nome:true
              }
            }
          }
        },
        servicos:true
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

