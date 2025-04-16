import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const memberSchema = z.object({
  id: z.string(),
  IdOriginal: z.string().uuid().optional(),
  nome: z.string(),
  email: z.string().email(),
  contacto: z.string(),
  sexo: z.string(),
  estado: z.string().optional(),
  carreira: z.string().optional(),
  dadiva: z.string(),
  grupo: z.string(),
  servicos: z.array(
    z.object({
      posicao: z.string(),
      servico: z.string(),
    })
  ),
});

export type memberType = z.infer<typeof memberSchema>;
