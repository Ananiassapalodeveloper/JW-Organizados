import { z } from "zod"
import type { Servico, Posicao } from "@/const/type-members"

export const profileFormSchema = z
  .object({
    nome: z.string({ required_error: "O nome é obrigatório" }).min(5, {
      message: "Nome tem de ser pelo menos 5 caracteres",
    }),

    estado: z.enum(["BATIZADO", "MATRICULADO", "ASSOCIADO"], {
      required_error: "A definição do estado é obrigatória",
    }),

    sexo: z.enum(["M", "F"], {
      required_error: "A definição do sexo é obrigatório",
    }),

    dadivas: z.string().optional(),

    carreira: z.string().optional(),

    contacto: z.string({
      required_error: "Número é obrigatório.",
    }),

    addicionalInfo: z.string().max(160).min(4).optional(),

    baptismo: z.date().optional(),

    servicos: z
      .array(
        z.object({
          servico: z.enum(["CONTAS", "MANUTENCAO", "TERRITORIO", "LITERATURA", "SOM_AUDIO"]),
          posicao: z.enum(["DIRIGENTE", "AJUDANTE"]),
        }),
      )
      .max(5, { message: "Máximo de 5 serviços permitidos" })
      .optional(),

    dataPioneiroRegular: z.date().optional(),

    nascimento: z.date({
      required_error: "A definição da data de nascimento é obrigatória.",
    }),

    dataPioneiroAuxiliar: z.date().optional(),

    dataPublicador: z.date().optional(),

    dataMatricula: z.date().optional(),

    email: z.string().email({ message: "Email inválido" }).optional(),

    funcaoGrupo: z
      .enum(["dirigente", "ajudante"], {
        required_error: "Selecione o dirigente ou ajudante.",
      })
      .optional(),

    grupoId: z.string().optional(),
    isDirigente: z.boolean().default(false).optional(),
    isAjudante: z.boolean().default(false).optional(),
  })
  .refine(
    (data) => {
      if (data.estado === "BATIZADO") {
        return !!data.baptismo
      }
      return true
    },
    {
      message: "A data de baptismo é obrigatória para membros baptizados.",
      path: ["baptismo"],
    },
  )
  .refine(
    (data) => {
      if (data.estado === "BATIZADO" && data.carreira === "PIONEIRO_REGULAR") {
        return !!data.dataPioneiroRegular
      }
      return true
    },
    {
      message: "A data de pioneiro regular é obrigatória para pioneiros regulares baptizados.",
      path: ["dataPioneiroRegular"],
    },
  )
  .refine(
    (data) => {
      if (data.estado === "BATIZADO" && data.carreira === "PIONEIRO_AUXILIAR") {
        return !!data.dataPioneiroAuxiliar
      }
      return true
    },
    {
      message: "A data de pioneiro auxiliar é obrigatória para pioneiros auxiliares baptizados.",
      path: ["dataPioneiroAuxiliar"],
    },
  )
  .refine(
    (data) => {
      if (data.estado === "MATRICULADO") {
        return !!data.dataMatricula
      }
      return true
    },
    {
      message: "A data de matrícula é obrigatória para membros matriculados.",
      path: ["dataMatricula"],
    },
  )
  .refine(
    (data) => {
      if (data.estado === "ASSOCIADO") {
        return !!data.dataPublicador
      }
      return true
    },
    {
      message: "A data de publicador é obrigatória para membros associados.",
      path: ["dataPublicador"],
    },
  )
  .refine(
    (data) => {
      if (data.isDirigente && data.isAjudante) {
        return false
      }
      return true
    },
    {
      message: "Um membro só pode ser Dirigente ou Ajudante, não ambos.",
      path: ["funcaoGrupo"],
    },
  )

export type ProfileFormValues = z.infer<typeof profileFormSchema>

export type ServicoItem = {
  servico: Servico
  posicao: Posicao
}

