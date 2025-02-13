/* eslint-disable @typescript-eslint/no-unused-vars */
// app/api/members/[id]/route.ts

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
interface Params {
  params: {
    id: string;
  };
}

// [GET] Buscar um membro pelo ID
export async function GET(request: Request, { params }: Params) {
  try {
    const member = await prisma.member.findUnique({
      where: { id: params.id },
    });

    if (!member) {
      return NextResponse.json(
        { error: "Membro não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(member);
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar membro" },
      { status: 500 }
    );
  }
}

// [PUT] Atualizar os dados de um membro
export async function PUT(request: Request, { params }: Params) {
  try {
    const data = await request.json();

    const updatedMember = await prisma.member.update({
      where: { id: params.id },
      data,
    });

    return NextResponse.json(updatedMember);
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao atualizar membro" },
      { status: 500 }
    );
  }
}

// [DELETE] Remover um membro
export async function DELETE(request: Request, { params }: Params) {
  try {
    const deletedMember = await prisma.member.delete({
      where: { id: params.id },
    });

    return NextResponse.json(deletedMember);
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao deletar membro" },
      { status: 500 }
    );
  }
}
