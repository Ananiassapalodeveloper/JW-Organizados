/* eslint-disable @typescript-eslint/no-unused-vars */
import { useAutoAssignment } from "./Automatic"
import type { presidentType } from "@/types/reuniaoMeioSemanaDTO/type"

interface UseMinisterioAssignmentProps {
  brothers: presidentType[]
  setPresidentId: (id: string) => void
  setPrayerId: (id: string) => void
}

export const useMinisterioAssignment = ({ brothers, setPresidentId, setPrayerId }: UseMinisterioAssignmentProps) => {
  // Usando o hook aprimorado
  const { autoAssign } = useAutoAssignment({
    members: brothers,

    // Função para obter a contagem de designações
    getAssignmentCount: (brother) => brother._count.PartesIniciasDono,

    // Funções para definir os IDs
    setAssignments: {
      Presidente: setPresidentId,
      Oração: setPrayerId,
    },

    // Opções adicionais
    options: {
      // Preferir irmãos batizados para a função de presidente
      preferences: {
        Presidente: (brother) => brother.estado === "BATIZADO",
      },

      // Verificar disponibilidade (exemplo)
      isAvailable: (brother, role, selectedIds) => {
        // Lógica adicional de disponibilidade pode ser adicionada aqui
        return true
      },

      // Mensagem de toast personalizada
      toastMessage: (assignments) => ({
        title: "Designação automática",
        description: `Presidente: ${assignments.Presidente.nome}, Oração: ${assignments.Oração.nome}`,
      }),
    },
  })

  return { autoAssign }
}

