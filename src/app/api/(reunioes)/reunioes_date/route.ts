/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { format } from "date-fns";
import { gerarQuatroIntervalos } from "@/lib/dateIntervals";
import { isWithinWeek } from "@/lib/isWithinInterval";

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

    const ExistingFour = await prisma.reunioesDates.findMany({
      where: { mesId: mesId },
    });

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
    include: {
      //Reunião Meio de semana
      PartesInicias: {
        include: {
          membro: {
            select: {
              nome: true,
              estado: true,
              contacto: true,
              _count: {
                select: { PartesIniciasDono: true },
              },
            },
          },
          suplenteMembro: {
            select: {
              nome: true,
              estado: true,
              contacto: true,
              _count: {
                select: { PartesIniciasSuplente: true },
              },
            },
          },
        },
      },

      Tesouros: {
        include: {
          membro: {
            select: {
              nome: true,
              estado: true,
              contacto: true,
              Tesouros: true,
            },
          },
          suplenteMembro: {
            select: {
              nome: true,
              estado: true,
              contacto: true,
              Tesouros: true,
            },
          },
        },
      },

      Ministerio: {
        include: {
          membroDirigente: {
            select: {
              nome: true,
              estado: true,
              contacto: true,
              MinisterioMembroDirigente: true,
            },
          },
          suplenteMembroDirigente: {
            select: {
              nome: true,
              estado: true,
              contacto: true,
              MinisterioSuplenteMembroDirigente: true,
            },
          },
          membroMorador: {
            select: {
              nome: true,
              estado: true,
              contacto: true,
              MinisteriooradorMembroMorador: true,
            },
          },
          suplenteMembroMorador: {
            select: {
              nome: true,
              estado: true,
              contacto: true,
              MinisteriooradorMembroMorador: true,
            },
          },
        },
      },

      Cristao: {
        include: {
          membro: {
            select: {
              nome: true,
              estado: true,
            },
          },
          suplenteMembro: {
            select: {
              nome: true,
              estado: true,
            },
          },
          LeitorEstudoBiblico: {
            select: {
              nome: true,
              estado: true,
            },
          },
          LeitorSuplenteEstudoBiblico: {
            select: {
              nome: true,
              estado: true,
            },
          },
          ReunioesDates: {
            select: {
              from: true,
              to: true,
            },
          },
        },
      },
      PartesFinais: {
        include: {
          membro: {
            select: {
              nome: true,
              estado: true,
              contacto: true,
              _count: {
                select: { PartesFinaisParteMembro: true },
              },
            },
          },
          suplenteMembro: {
            select: {
              nome: true,
              estado: true,
              contacto: true,
              _count: {
                select: { PartesFinaisParteSuplente: true },
              },
            },
          },
        },
      },

      //Reuniao do fim de semana
      ReuniaoPublica: {
        include: {
          membro: {
            select: {
              nome: true,
              estado: true,
            },
          },
          suplenteMembro: {
            select: {
              nome: true,
              estado: true,
            },
          },
          ReunioesDates: {
            select: {
              from: true,
              to: true,
            },
          },
        },
      },
      Sentinela: {
        include: {
          membro: {
            select: {
              nome: true,
              estado: true,
            },
          },
          suplenteMembro: {
            select: {
              nome: true,
              estado: true,
            },
          },
          ReunioesDates: {
            select: {
              from: true,
              to: true,
            },
          },
        },
      },

      //Actividade extra
      Arrumacao: {
        include: {
          Grupo: {
            include: {
              dirigente: {
                select: {
                  nome: true,
                  estado: true,
                  contacto: true,
                },
              },
              _count: {
                select: {
                  Arrumacao: true,
                  membros: true,
                },
              },
            },
          },
          ReunioesDates: {
            select: {
              from: true,
              to: true,
            },
          },
        },
      },
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
      Indicadores: {
        include: {
          membro: {
            select: {
              nome: true,
              estado: true,
            },
          },
          suplenteMembro: {
            select: {
              nome: true,
              estado: true,
            },
          },
    
          ReunioesDates: {
            select: {
              from: true,
              to: true,
            },
          },
        },
      },

      mes: {
        include: {
          ano: true,
        },
      },
    },
  });

  const Reuniao = reuniaoDates.find((a) =>
    isWithinWeek(
      format(a.from, "dd/MM/yyyy").toString(),
      format(a.to, "dd/MM/yyyy").toString()
    )
  );

  // Formata as datas antes de retornar
  if (!Reuniao) return NextResponse.json({ message: "Não há curso publicado" });

  const formattedReuniaoDates = {
    ...Reuniao,
    from: format(new Date(Reuniao.from), "dd/MM/yyyy"),
    to: format(new Date(Reuniao.to), "dd/MM/yyyy"),
  };

  return NextResponse.json(formattedReuniaoDates);
}
