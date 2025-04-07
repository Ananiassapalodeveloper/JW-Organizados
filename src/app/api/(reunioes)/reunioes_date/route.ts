/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { format } from "date-fns";
import { gerarQuatroIntervalos } from "@/lib/dateIntervals";

const reuniaoDateSchema = z.object({
  dateRange: z.object({
    from: z.string(),
    to: z.string(),
  }),
  mesId: z.string(),
});



export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { dateRange, mesId } = reuniaoDateSchema.parse(body);

    // Gera os 4 intervalos de 7 dias
    const intervalos = gerarQuatroIntervalos(dateRange.from, dateRange.to);

    const ExistingFour= await prisma.reunioesDates.findMany({
      where:{mesId:mesId}
    })

    if (ExistingFour.length === 4) {
      return NextResponse.json(
        {
          message:
            "O registro Para este mês já está preenchido, não é possível criar outro, apenás editá-lo.",
        },
        { status: 400 }
      );
    }

    // Salva os dados no banco de dados
    const reuniaoDates = await prisma.reunioesDates.createMany({
      data: intervalos.map(({ from, to }) => ({ mesId, from, to })),
    });

    return NextResponse.json({
      message: "Datas registradas com sucesso!",
      reuniaoDates,
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function GET() {
  const reuniaoDates = await prisma.reunioesDates.findMany({
    select: {
      id: true,
      mesId: true,
      from: true,
      to: true,
      _count: true,
    },
  });

  // Formata as datas antes de retornar
  const formattedReuniaoDates = reuniaoDates.map(reuniao => ({
    ...reuniao,
    from: format(new Date(reuniao.from), "d/M/yyyy"),
    to: format(new Date(reuniao.to), "d/M/yyyy"),
  }));

  return NextResponse.json(formattedReuniaoDates);
}

