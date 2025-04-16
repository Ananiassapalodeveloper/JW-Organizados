import { AssistenciaEnum } from "@prisma/client";
import { z } from "zod";

export const assistenciaSchema = z.object({
  name: z.enum(["meioDeSemana", "fimDeSemana"]),
  ReunioesDatesId: z.string({required_error:"É obrigatório a definição da assistência"}),
  quantidade: z.string().default("0"),
}) .refine(
  (data) => {
    if(data.quantidade==="0"){
      return !!data.quantidade
    }
    return true
  },
  {
    message:"é obrigatório a definição da assistência",
    path:["quantidade"]
  }
);

export type AssistenciaType = z.infer<typeof assistenciaSchema>;

export type RegistoAssistencia = {
  id: string;
  name: AssistenciaEnum;
  quantidade: string;
  ReunioesDatesId: string;
  createdAt: Date;
  updatedAt: Date;
  ReunioesDates: {
    from: Date;
    to: Date;
  };
};
