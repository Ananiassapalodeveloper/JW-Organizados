/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { ano, meses } = body

    const reuniao = await prisma.reuniao.create({
      data: {
        ano,
        meses: {
          create: meses.map((mes: any) => ({
            nome: mes.mes,
            reuniaoMensal: {
              create: {
                reunioesMeioSemana: {
                  create: mes.reuniaoMensalDoMes.reuniaoMeioSemana.map((reuniao: any) => ({
                    nameDate: reuniao.nameDate,
                    designacoes: {
                      create: reuniao.designacao.map((designacao: any) => ({
                        name: designacao.name,
                        partes: {
                          create: designacao.partes.map((parte: any) => ({
                            name: parte.name,
                            memberId: parte.memberId,
                            suplenteMemberId: parte.sumplenteMemberId,
                            grupoId: parte.GrupoId,
                            bookDeOratoriaDeconselhoId: parte.bookDeOratoriaDeconselhoId,
                          })),
                        },
                      })),
                    },
                  })),
                },
                reunioesFimSemana: {
                  create: mes.reuniaoMensalDoMes.reuniaoFimSemana.map((reuniao: any) => ({
                    nameDate: reuniao.nameDate,
                    designacoes: {
                      create: reuniao.designacao.map((designacao: any) => ({
                        name: designacao.name,
                        partes: {
                          create: designacao.partes.map((parte: any) => ({
                            name: parte.name,
                            memberId: parte.memberId,
                            suplenteMemberId: parte.sumplenteMemberId,
                            grupoId: parte.GrupoId,
                          })),
                        },
                      })),
                    },
                  })),
                },
              },
            },
          })),
        },
      },
      include: {
        meses: {
          include: {
            reuniaoMensal: {
              include: {
                reunioesMeioSemana: {
                  include: {
                    designacoes: {
                      include: {
                        partes: true,
                      },
                    },
                  },
                },
                reunioesFimSemana: {
                  include: {
                    designacoes: {
                      include: {
                        partes: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    })

    return NextResponse.json(reuniao)
  } catch (error) {
    console.error("Error creating reuniao:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

