import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Listar todos os membros
export async function GET() {
  const membros = await prisma.membro.findMany({
    where: {
      // sexo:"M",
      estado: "BATIZADO",
    },
    orderBy: {
      nome: "asc",
    },
    include: {
      _count: true,

      PartesIniciasDono:true,
      PartesIniciasSuplente:true,

      Tesouros:true,
      TesourosSuplente:true,

      MinisterioMembroDirigente:true,
      MinisteriooradorMembroMorador:true,
      MinisterioSuplenteMembroDirigente:true,
      MinisterioSuplenteMembroMorador:true,

      CristaoParteMembro:true,
      CristaoParteSuplente:true,
      CristaoLeitorEstudoBiblico:true,
      CristaoLeitorEstudoBiblicoSuplente:true,

      PartesFinaisParteMembro:true,
      PartesFinaisParteSuplente:true,
      
      //___________________________________________________
      ReuniaoPublica:true,
      ReuniaoPublicaParteSuplente:true,

      SentinelaParteMembro:true,
      SentinelaParteSuplente:true,

      //_______________________________________
      IndicadoresParteMembro:true,
      IndicadoresParteSuplente:true
      

    },
  });

  //Reunião Meio de semana



  return NextResponse.json(membros);
}
