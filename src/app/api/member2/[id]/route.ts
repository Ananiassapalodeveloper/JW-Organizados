/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Buscar membro por ID
export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const membro = await prisma.membro.findUnique({
    where: { id },
    include:{
      Tesouros:true
    }
  });

  if (!membro) return NextResponse.json({ error: "Membro não encontrado" }, { status: 404 });

  return NextResponse.json(membro);
}

// Atualizar membro
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const body = await req.json();

    const membro = await prisma.membro.update({ where: { id }, data: body });

    return NextResponse.json({ message: "Membro atualizado com sucesso!", membro });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao atualizar membro" }, { status: 500 });
  }
}

// Excluir membro (eliminação em cascata)
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    
    // Remove as associações primeiro (por segurança)
    await prisma.servicoMembro.deleteMany({ where: { membroId: id } });

    // Exclui o membro
    await prisma.membro.delete({ where: { id } });

    return NextResponse.json({ message: "Membro excluído com sucesso!" });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao excluir membro" }, { status: 500 });
  }
}
