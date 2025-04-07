import z from "zod";



const schemaReunioes = z.object({
  descricao: z.string().optional(),
  ano: z.string({ required_error: "O ano é obrigatório" }),
});


 const schemaReunioesPartes = z.object({
  dateRange: z.object(
    {
      from: z.date({ required_error: "Data inicial é obrigatória" }),
      to: z.date({ required_error: "Data final é obrigatória" }),
    },
    { required_error: "Período é obrigatório" },
  ),
  mesId: z.string({ required_error: "O id do mês é obrigatório" }),
})

export type typeSchemaReunioesPartes = z.infer<typeof schemaReunioesPartes>



export type typeSchemaReunioes = z.infer<typeof schemaReunioes>;

export { schemaReunioes,schemaReunioesPartes };
