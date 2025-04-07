/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // Preparar os dados para criação do membro
    const memberData = {
      nome: data.nome,
      email: data.email || null,
      contacto: data.contacto,
      dataNascimento: data.dataNascimento
        ? new Date(data.dataNascimento)
        : null,
      dataMatricula: data.dataMatricula ? new Date(data.dataMatricula) : null,
      dataPublicador: data.dataPublicador
        ? new Date(data.dataPublicador)
        : null,
      dataBaptismo: data.dataBaptismo ? new Date(data.dataBaptismo) : null,
      dataAuxiliar: data.dataAuxiliar ? new Date(data.dataAuxiliar) : null,
      dataRegular: data.dataRegular ? new Date(data.dataRegular) : null,
      descricao: data.descricao || null,
      estado: data.estado,
      carreira: data.carreira || null,
      dadiva: data.dadiva || null,
      grupoId: data.grupoId || null,
      sexo:data.sexo
    };

    // Criar o novo membro
    const novoMembro = await prisma.membro.create({
      data: {
        ...memberData,
        // Criar serviços se existirem
        ...(data.servicos && data.servicos.length > 0
          ? {
              servicos: {
                create: data.servicos.map((servico: any) => ({
                  servico: servico.servico,
                  posicao: servico.posicao,
                })),
              },
            }
          : {}),
        // Configurar relacionamentos de grupo se o membro for dirigente ou ajudante
        ...(data.isDirigente && data.grupoId
          ? {
              dirige: {
                connect: { id: data.grupoId },
              },
            }
          : {}),
        ...(data.isAjudante && data.grupoId
          ? {
              ajuda: {
                connect: { id: data.grupoId },
              },
            }
          : {}),
      },
      include: {
        servicos: true,
        grupo: true,
      },
    });

    // Se necessário, criar hierarquia do membro
    if (data.superiorId) {
      await prisma.hierarquiaMembro.create({
        data: {
          membroId: novoMembro.id,
          superiorId: data.superiorId,
        },
      });
    }

    return NextResponse.json(novoMembro, { status: 201 });
  } catch (error: any) {
    console.error("Erro ao registrar membro:", error);

    // Verificar erros específicos do Prisma
    if (error.code === "P2002") {
      const field = error.meta?.target?.[0] || "campo";
      return NextResponse.json(
        { error: `Já existe um membro com este ${field}.` },
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
  const membros = await prisma.membro.findMany({
    orderBy: {
      nome: "asc",
    },
  });
  return NextResponse.json(membros);
}
