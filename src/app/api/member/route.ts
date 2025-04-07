/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

// Validação com Zod
const membroSchema = z.object({
  nome: z.string().min(3),
  email: z.string().email().optional(),
  contacto: z.string().optional(),
  dataBaptismo: z.string().optional(),
  dataNascimento: z.string().optional(),
  estadoId: z.string().optional(),
  carreiraId: z.string().optional(),
  dadivaId: z.string().optional(),
  dataMatricula: z.string().optional(),
  dataAuxiliar: z.string().optional(),
  dataPublicador: z.string().optional(),
  dataRegular: z.string().optional(),
  descricao: z.string().optional(),
  grupoId: z.string().optional(),
  isDirigente: z.boolean(),
  isAjudante: z.boolean(),
  servicos: z.array(
    z.object({
      servicoId: z.string(),
      posicaoId: z.string(),
    })
  ),
});

// Criar um membro
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = membroSchema.parse(body);

    const novoMembro = await prisma.membro.create({
      data: {
        nome: data.nome,
        email: data.email,
        contacto: data.contacto,
        dataAuxiliar: data.dataAuxiliar,
        dataMatricula: data.dataMatricula,
        dataPublicador: data.dataPublicador,
        dataRegular: data.dataRegular,
        descricao: data.descricao,
        dataNascimento: data.dataNascimento,
        dataBaptismo: data.dataBaptismo,
        estadoId: data.estadoId,
        carreiraId: data.carreiraId,
        dadivaId: data.dadivaId,
        grupoId: data.grupoId,

        servicos: {
          create:
            data.servicos?.map(
              (servico: { servicoId: string; posicaoId: string }) => ({
                servicoId: servico.servicoId,
                posicaoId: servico.posicaoId,
              })
            ) || [],
        },
      },
      include: {
        servicos: true,
      },
    });

    // Atualizar o grupo se o membro for dirigente ou ajudante
    if (data.grupoId) {
      const grupo = await prisma.grupo.findUnique({
        where: { id: data.grupoId },
        select: { dirigenteId: true, ajudanteId: true },
      });

      if (grupo) {
        let updateData = {};

        if (data.isDirigente && !grupo.dirigenteId) {
          updateData = { dirigenteId: novoMembro.id };
        } else if (data.isAjudante && !grupo.ajudanteId) {
          updateData = { ajudanteId: novoMembro.id };
        }

        if (Object.keys(updateData).length > 0) {
          await prisma.grupo.update({
            where: { id: data.grupoId },
            data: updateData,
          });
        }
      }
    }

    return NextResponse.json({
      message: "Membro criado com sucesso!",
      novoMembro,
    });
    
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao criar membro" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// Listar todos os membros
export async function GET() {
  const membros = await prisma.membro.findMany({
    include: {
      estado: true,
      carreira: true,
      servicos: { include: { servico: true, posicao: true } },
    },
  });
  return NextResponse.json(membros);
}
