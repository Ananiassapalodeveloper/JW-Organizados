/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { assistenciaSchema } from "@/types/ExtraActivityDTO/AssistenciaType/type"; 
import { assistenciaValueType } from "@/services/assistenciaData/data";


export async function POST(request: Request) {
  try {
    const body = await request.json();
    const dados = assistenciaSchema.parse(body);

    // Verifica se já existe um registro com o mesmo `name` dentro do mesmo `ReunioesDatesId`
        const existingRecord = await prisma.assistencia.findFirst({
          where: { name: dados.name, ReunioesDatesId: dados.ReunioesDatesId },
        });
    
        if (existingRecord) {
          return NextResponse.json(
            {
              error: `A assistência para "${
                assistenciaValueType?.find((tn) => tn.value === dados.name)?.name
              }" já foi registado.`,
            },
            { status: 400 }
          );
        }

    const assistencia = await prisma.assistencia.create({ data: dados });

    return NextResponse.json({
      message: "assistencia criado com sucesso!",
      assistencia,
    });
  } catch (error: any) {
    console.error("Erro ao registrar a assistencia:", error);

    return NextResponse.json(
      { error: error.message || "Erro desconhecido" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function GET() {
  const Assistencia = await prisma.assistencia.findMany();
  return NextResponse.json(Assistencia);
}
