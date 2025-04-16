/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Buscar meses por ID
export async function GET(
  req: Request,
  { params }: { params: { mes: number; year: number } }
) {
  const { mes, year } = params;
  const meses = await prisma.meses.findFirst({
    where: { mes:Number(mes), ano: { ano: Number(year) } },
    include: {
      ReunioesDates: {
        select: {
          Assistencia: {
            include: {
              ReunioesDates: {
                select: {
                  from: true,
                  to: true,
                },
              },
            },
          },
        },
      },
      ano: {
        select: {
          ano: true,
        },
      },
    },
  });

  if (!meses)
    return NextResponse.json(
      { error: "meses não encontrado" },
      { status: 404 }
    );

  return NextResponse.json(meses);
}
