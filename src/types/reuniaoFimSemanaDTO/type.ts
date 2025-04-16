import { ReuniaoPublicaEnum, SentinelaEnum } from "@prisma/client";
import { z } from "zod";

export const reuniaoPublicaSchema = z
  .object({
    name: z.enum(["presidente", "oracaoInicial", "orador"]),
    memberId: z.string().optional(),
    suplenteMemberId: z.string().optional(),
    tema: z.string().optional(),
    ReunioesDatesId: z.string(),
  })
  .refine(
    (data) => {
      if (data.name === "orador") {
        return !!data.tema;
      }
      return true;
    },
    {
      message: "Para orador, o tema é obrigatória.",
      path: ["tema"],
    }
  );

export type reuniaoPublicaType = z.infer<typeof reuniaoPublicaSchema>;

export type RegistoReuniaoPublica = {
  id: string;
  name: ReuniaoPublicaEnum;
  tema: string;
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

//___________________________________________________________________________
export const sentinelaSchema = z
  .object({
    name: z.enum(["dirigente", "leitor", "oracaoFinal"]),
    memberId: z.string().optional(),
    suplenteMemberId: z.string().optional(),
    tema: z.string().optional(),
    ReunioesDatesId: z.string(),
  })
  .refine(
    (data) => {
      if (data.name === "dirigente") {
        return !!data.tema;
      }
      return true;
    },
    {
      message: "Para orador, o tema é obrigatória.",
      path: ["tema"],
    }
  );

export type sentinelaType = z.infer<typeof sentinelaSchema>;

export type RegistoSentinela = {
  id: string;
  name: SentinelaEnum;
  tema: string;
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
