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

export type ReturReuniaoPublica = {
  id: string;
  name: "presidente" | "oracaoInicial" | "orador";
  tema: string;
  membro: { nome: string; contacto: string; id: string };
  suplenteMembro: { nome: string; contacto: string; id: string };
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

export type ReturSentinela = {
  id: string;
  name: "presidente" | "oracaoInicial" | "orador";
  tema: string;
  membro: { nome: string; contacto: string; id: string };
  suplenteMembro: { nome: string; contacto: string; id: string };
};
