import { z } from "zod";

export const arrumacaoSchema = z.object({
  name: z.string(),
  grupoId: z.string(),
  ReunioesDatesId: z.string(),
});

export type ArrumacaoType = z.infer<typeof arrumacaoSchema>;

export type RegistoArrumacao = {
  id: string;
  name: string;
  grupoId: string;
  ReunioesDatesId: string;
  Grupo: {
    id: string;
    nome: string;
    descricao: string;
    dirigenteId: string;
    ajudanteId: string;
    dirigente: {
      nome: string;
      estado: string;
      contacto: string;
    };
    _count: {
      Arrumacao: number;
      membros: number;
    };
  };
  ReunioesDates: {
    from: string;
    to: string;
  };
};
