/* eslint-disable @typescript-eslint/no-explicit-any */
import { CristaoEnum } from "@prisma/client";
import { z } from "zod";

export type PresidenteType = {
  id: string;
  name: string;
  suplenteMembro: {
    nome: string;
    contacto: string;
    id: string;
  };
  membro: {
    nome: string;
    contacto: string;
    id: string;
  };
};

// Schema for form validation
export const PartesIniciasSchema = z.object({
  // id: z.string().optional(),
  name: z.string().default("Presidente"),
  memberId: z.string({ required_error: "Selecione o irmão presidente" }),
  suplenteMemberId: z.string({
    required_error: "Selecione o irmão para oração",
  }),
  ReunioesDatesId: z.string().optional(),
});

export type PartesIniciasDono = z.infer<typeof PartesIniciasSchema>;

export type presidentType = {
  id: string;
  nome: string;
  email: string;
  contacto: string;
  dataNascimento: string;
  dataMatricula: string;
  dataPublicador: string;
  dataBaptismo: string;
  dataAuxiliar: string;
  dataRegular: string;
  descricao: string;
  studentsId: string;
  sexo: string;
  estado: string;
  carreira: string;
  dadiva: string;
  grupoId: string;

  _count: {
    subordinados: number;
    servicos: number;
    students: number;
    tasks: number;
    PartesIniciasDono: number;
    PartesIniciasSuplente: number;
    Tesouros: number;
    TesourosSuplente: number;
    MinisterioMembroDirigente: number;
    MinisteriooradorMembroMorador: number;
    MinisterioSuplenteMembroDirigente: number;
    MinisterioSuplenteMembroMorador: number;
    CristaoParteMembro: number;
    CristaoParteSuplente: number;
    PartesFinaisParteMembro: number;
    PartesFinaisParteSuplente: number;
    ReuniaoPublica: number;
    ReuniaoPublicaParteSuplente: number;
    SentinelaParteMembro: number;
    SentinelaParteSuplente: number;
    IndicadoresParteMembro: number;
    IndicadoresParteSuplente: number;
    Leitor: number;
    LeitorParteSuplente: number;
    CristaoLeitorEstudoBiblico: number;
    CristaoLeitorEstudoBiblicoSuplente: number;
  };
  PartesIniciasDono: any[];
  PartesIniciasSuplente: any[];
  Tesouros: TesourosType[];
  TesourosSuplente: TesourosType[];
  MinisterioMembroDirigente: any[];
  MinisteriooradorMembroMorador: any[];
  MinisterioSuplenteMembroDirigente: any[];
  MinisterioSuplenteMembroMorador: any[];
  CristaoParteMembro: any[];
  CristaoParteSuplente: any[];
  CristaoLeitorEstudoBiblico: any[];
  CristaoLeitorEstudoBiblicoSuplente: any[];
  PartesFinaisParteMembro: any[];
  PartesFinaisParteSuplente: any[];
  ReuniaoPublica: any[];
  ReuniaoPublicaParteSuplente: any[];
  SentinelaParteMembro: any[];
  SentinelaParteSuplente: any[];
  IndicadoresParteMembro:any[];
  IndicadoresParteSuplente:any[];



};

//_________________________________________________________________________
//Tesouros

export const TesourosSchema = z
  .object({
    name: z.enum(["leitura", "perolas", "discurso"]),
    memberId: z.string().optional(),
    suplenteMemberId: z.string().optional(),
    ReunioesDatesId: z.string(),
    nameLivro: z.string().optional(),
    lesson: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.name === "leitura") {
        return !!data.lesson;
      }
      return true;
    },
    {
      message: "Para leitura, é obrigatória a definição da lição.",
      path: ["lesson"],
    }
  );

export type TesourosType = z.infer<typeof TesourosSchema>;
{
}

export type RegistoTesouro = {
  lesson:string,
  id: string;
  name: string; 
  membro: {
    nome: string;
    estado: string;
  };
  suplenteMembro: {
    nome: string;
    estado: string;
  };
  ReunioesDates: {
    from: Date;
    to: Date;
  };
};

// ____________________________________________________________________
// Schema for form validation MINISTERIO
export const ministerioSchema = z.object({
  reunioesDatesId: z.string(),
  tema: z.string().optional(),
  name: z.enum([
    "iniciarConversa1",
    "iniciarConversa2",
    "iniciarConversa3",
    "manterInteresse",
    "fazerDisciplo",
    "explicarCrenca",
    "discurso",
  ]),
  memberDirigenteId: z.string(),
  memberDirigenteSuplenteId: z.string(),
  memberMoradorId: z.string().optional(),
  memberMoradorSuplenteId: z.string().optional(),
  lessonPoint:z.string().optional(),
  lessonNumber: z.string().optional(),
  pointNumber: z.string().optional(),
});

export type RegistoMinisterio = {
  id: string;
  name: string;
  lessonPoint: string;
  tema: string;
  membroDirigente: {
    nome: string;
    estado: string;
  };
  membroMorador: {
    nome: string;
    estado: string;
  };
  suplenteMembroDirigente: {
    nome: string;
    estado: string;
  };
  suplenteMembroMorador: {
    nome: string;
    estado: string;
  };
  reunioesDates: {
    from: Date;
    to: Date;
  };
};

export type ministerioType = z.infer<typeof ministerioSchema>;

//___________________________________________________________________
//Cristãos
export const cristaoSchema = z.object({
  name: z.enum(["parte1", "parte2", "estudoBiblico"]),
  memberId: z.string().optional(),
  suplenteMemberId: z.string().optional(),
  leitorId: z.string().optional(),
  leitorSuplenteId: z.string().optional(),
  ReunioesDatesId: z.string(),
  tema: z.string().optional(),
});

export type cristaoType = z.infer<typeof cristaoSchema>;

export type RegistoCristao = {
  id: string;
  name: CristaoEnum
  tema: string;
  membro: {
    nome: string;
    estado: string;
  };
  suplenteMembro: {
    nome: string;
    estado: string;
  };
  LeitorEstudoBiblico: {
    nome: string;
    estado: string;
  };
  LeitorSuplenteEstudoBiblico: {
    nome: string;
    estado: string;
  };
  ReunioesDates: {
    from: Date;
    to: Date;
  };
};
