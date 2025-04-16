import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const memberSchema = z.object({
  id: z.string(),
  nome: z.string(),
  estado: z.string(),
  generos:z.string(),
  privilegioServicos:z.string().optional(),
  funcoes:z.string().optional(),
  carreiras:z.string().optional()

})

export type memberType = z.infer<typeof memberSchema>
