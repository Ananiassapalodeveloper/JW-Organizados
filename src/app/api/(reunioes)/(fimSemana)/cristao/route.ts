/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cristaoSchema } from "@/types/reuniaoMeioSemanaDTO/type";
import { CristaoValueType } from "@/services/cristaoData/data";




export async function POST(request: Request) {
  try {
    const body = await request.json();
    const dados = cristaoSchema.parse(body);
 // Verifica se já existe um registro com o mesmo `name` dentro do mesmo `ReunioesDatesId`
       const existingRecord = await prisma.cristao.findFirst({
         where: { name: dados.name, ReunioesDatesId: dados.ReunioesDatesId },
       });
   
       if (existingRecord) {
         return NextResponse.json(
           {
             error: `Já existe um registro "${
              CristaoValueType?.find((tn) => tn.value === dados.name)?.name
             }" para esta semana.`,
           },
           { status: 400 }
         );
       }
   
       // Contar quantos registros já existem para essa `ReunioesDatesId`
       const totalRegistros = await prisma.cristao.count({
         where: { ReunioesDatesId: dados.ReunioesDatesId },
       });
   
       if (totalRegistros >= 3) {
         return NextResponse.json(
           { error: "O limite de 3 registros por semana foi atingido." },
           { status: 400 }
         );
       }
    const cristao = await prisma.cristao.create({ data: dados });

    return NextResponse.json({
      message: "cristao criado com sucesso!",
      cristao,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao criar cristao" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function GET() {
  const cristaos = await prisma.cristao.findMany();
  return NextResponse.json(cristaos);
}
