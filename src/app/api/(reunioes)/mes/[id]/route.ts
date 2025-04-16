/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Buscar meses por ID
export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const meses = await prisma.meses.findUnique({
    where: { id },
    include: {
      ReunioesDates:{
        select:{
          Assistencia:{
            include:{
              ReunioesDates:{
                select:{
                  from:true,
                  to:true
                }
              }
            }
          }
        },
      },
      ano:{
        select:{
          ano:true
        }
      }
    },
  });

  if (!meses) return NextResponse.json({ error: "meses não encontrado" }, { status: 404 });

  return NextResponse.json(meses);
}

// Atualizar meses
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const body = await req.json();

    const meses = await prisma.meses.update({ where: { id }, data: body });

    return NextResponse.json({ message: "meses atualizado com sucesso!", meses });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao atualizar meses" }, { status: 500 });
  }
}

// Excluir meses (eliminação em cascata)
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    

    // Exclui o meses
    await prisma.meses.delete({ where: { id } });

    return NextResponse.json({ message: "meses excluído com sucesso!" });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao excluir meses" }, { status: 500 });
  }
}
