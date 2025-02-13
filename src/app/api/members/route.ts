/* eslint-disable @typescript-eslint/no-unused-vars */
// app/api/members/route.ts

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Para evitar instanciar várias vezes o PrismaClient em ambiente de desenvolvimento,
// você pode criar um arquivo lib/prisma.ts para cachear a instância.
// Aqui, para simplificar, usamos diretamente:

export async function GET() {
  try {
    const members = await prisma.member.findMany();
    return NextResponse.json(members);
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar membros" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Aqui, é interessante validar os dados com uma lib como Zod para garantir integridade.
    // Exemplo (opcional):
    // const parsedData = MemberSchema.parse(data);

    const member = await prisma.member.create({
      data,
    });

    return NextResponse.json(member, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao criar membro" },
      { status: 500 }
    );
  }
}
