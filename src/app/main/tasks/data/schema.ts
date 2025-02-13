import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const memberSchema = z.object({
  id: z.string(),
  nome: z.string(),
  estados: z.string(),
  generos:z.string(),
  posicoes: z.string().optional(),
  privilegioServicos:z.string().optional(),
  funcoes:z.string().optional(),
  carreiras:z.string().optional()

})

export type memberType = z.infer<typeof memberSchema>
