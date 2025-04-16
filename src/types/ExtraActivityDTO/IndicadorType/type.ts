import {z} from "zod"
export const indicadoresSchema = z.object({
  name: z.enum(["sectorA", "sectorB", "porta"]),
  memberId: z.string().optional(),
  suplenteMemberId: z.string().optional(),
  ReunioesDatesId: z.string(),
});

export type IndicadorType=z.infer<typeof indicadoresSchema>


export type Registoindicadores = {
  id: string;
  name: "sectorA"|"sectorB"|"porta";
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