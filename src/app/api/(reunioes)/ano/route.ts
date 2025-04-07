/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const anoSchema = z.object({
  descricao: z.string().optional(),
  ano: z.number({ required_error: "O ano é obrigatório" }),
});

const MESES = [
  { name: "Janeiro", value: 1 },
  { name: "Fevereiro", value: 2 },
  { name: "Março", value: 3 },
  { name: "Abril", value: 4 },
  { name: "Maio", value: 5 },
  { name: "Junho", value: 6 },
  { name: "Julho", value: 7 },
  { name: "Agosto", value: 8 },
  { name: "Setembro", value: 9 },
  { name: "Outubro", value: 10 },
  { name: "Novembro", value: 11 },
  { name: "Dezembro", value: 12 },
];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = anoSchema.parse(body);

    // Verifica se o ano já existe
    const anoExistente = await prisma.ano.findUnique({
      where: { ano: data.ano },
      include: { meses: true },
    });

    if (anoExistente) {
      return NextResponse.json(
        { message: "Ano já existe!", anoExistente },
        { status: 409 }
      );
    }

    // Criar um novo ano
    const novoAno = await prisma.ano.create({
      data: {
        ano: data.ano,
        descricao: data.descricao,
      },
    });

    // Criar automaticamente os 12 meses vinculados ao ano
    const mesesCriados = await prisma.meses.createMany({
      data: MESES.map((mes) => ({
        id: crypto.randomUUID(), // Garante IDs únicos para os meses
        mes: mes.value,
        descricao: mes.name,
        anoId: novoAno.id, // Associa o mês ao ano recém-criado
      })),
    });

    return NextResponse.json({
      message: "Ano e meses criados com sucesso!",
      novoAno,
      mesesCriados,
    });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  } finally {
    await prisma.$disconnect();
  }
}


export async function GET() {
  try {
    const anos = await prisma.ano.findMany({
      include: {
        meses: {
          include: {
            ReunioesDates: true
          },
        },
      },
    });

    // const result = anos.map((ano) => ({
    //   id: ano.id,
    //   ano: ano.ano,
    //   meses: ano.meses.map((mes) => ({
    //     id: mes.id,
    //     mes: mes.mes,
    //     reunioes:
    //       mes.ReunioesDates.length > 0
    //         ? mes.ReunioesDates.length
    //         : "Sem reuniões",
    //   })),
    // }));

    return NextResponse.json(anos);
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar anos e meses" },
      { status: 500 }
    );
  }
}
