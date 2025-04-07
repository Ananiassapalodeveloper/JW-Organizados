/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ministerioSchema } from "@/types/reuniaoMeioSemanaDTO/type";
import { MinisterioType } from "@/services/MinisterioData/data";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const dados = ministerioSchema.parse(body);

   // Verifica se já existe um registro com o mesmo `name` dentro do mesmo `ReunioesDatesId`
       const existingRecord = await prisma.ministerio.findFirst({
         where: { name: dados.name, reunioesDatesId: dados.reunioesDatesId },
       });
   
       if (existingRecord) {
         return NextResponse.json(
           {
             error: `Já existe um registro "${
               MinisterioType?.find((tn) => tn.value === dados.name)?.name
             }" para esta semana.`,
           },
           { status: 400 }
         );
       }
   
       // Contar quantos registros já existem para essa `ReunioesDatesId`
       const totalRegistros = await prisma.ministerio.count({
         where: { reunioesDatesId: dados.reunioesDatesId },
       });
   
       if (totalRegistros >= 3) {
         return NextResponse.json(
           { error: "O limite de 3 registros por semana foi atingido." },
           { status: 400 }
         );
       }

    const ministerio = await prisma.ministerio.create({ data: dados });

    return NextResponse.json({
      message: "ministerio criado com sucesso!",
      ministerio,
    });
  } catch (error) {
    return NextResponse.json(
      { error: JSON.stringify(error,null,2) },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function GET() {
  const ministerios = await prisma.ministerio.findMany({
    include: {
      membroDirigente: {
        select: {
          nome: true,
          estado: true,
        },
      },
      membroMorador: {
        select: {
          nome: true,
          estado: true,
        },
      },
      suplenteMembroDirigente: {
        select: {
          nome: true,
          estado: true,
        },
      },
      suplenteMembroMorador: {
        select: {
          nome: true,
          estado: true,
        },
      },
      reunioesDates: {
        select: {
          from: true,
          to: true,
        },
      },
    },
  });
  return NextResponse.json(ministerios);
}
