import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Listar todos os membros
export async function GET() {
  const membros = await prisma.membro.findMany({
    where:{
        // sexo:"M",
        estado:"BATIZADO"
    },
    orderBy:{
        nome:"asc"
    },
    include:{
        _count:true
    }
  });
  return NextResponse.json(membros);
}