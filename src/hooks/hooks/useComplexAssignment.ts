/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAutoAssignment } from "./Automatic"

// Exemplo de uso mais complexo com múltiplas funções
export const useComplexAssignment = ({ members, setRoleIds, reuniaoType }:{ members:any[], setRoleIds:any, reuniaoType:any }) => {
  // Função para obter a contagem de designações com base no tipo de reunião
  const getAssignmentCount = (member:any) => {
    switch (reuniaoType) {
      case "ministerio":
        return member._count.MinisterioMembroDirigente
      case "tesouro":
        return member._count.TesouroMembroDirigente
      default:
        return member._count.PartesIniciasDono
    }
  }

  // Usando o hook aprimorado com configurações mais complexas
  const { autoAssign } = useAutoAssignment({
    members,
    getAssignmentCount,

    // Funções para definir os IDs para várias funções
    setAssignments: setRoleIds,

    options: {
      // Preferências específicas para cada função
      preferences: {
        Presidente: (member) => member.estado === "BATIZADO" && member.carreira === "ANCIÃO",
        Orador: (member) => member.estado === "BATIZADO",
        // Outras preferências...
      },

      // Verificação de disponibilidade personalizada
      isAvailable: (member, role, selectedIds) => {
        // Exemplo: Verificar se o membro já foi designado recentemente para esta função
        const recentAssignments = member.recentAssignments || []
        const hasRecentAssignment = recentAssignments.some(
          (assignment: { role: string; date: string | number | Date }) =>
            assignment.role === role && new Date(assignment.date) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        )

        return !hasRecentAssignment
      },

      // Ordenação personalizada (exemplo: priorizar membros com menos designações recentes)
      sortMembers: (a, b) => {
        const countA = getAssignmentCount(a)
        const countB = getAssignmentCount(b)

        // Se as contagens forem iguais, considerar a data da última designação
        if (countA === countB) {
          const lastAssignmentA = a.lastAssignmentDate ? new Date(a.lastAssignmentDate).getTime() : 0
          const lastAssignmentB = b.lastAssignmentDate ? new Date(b.lastAssignmentDate).getTime() : 0
          return lastAssignmentB - lastAssignmentA // Priorizar quem não foi designado há mais tempo
        }

        return countA - countB
      },

      // Mensagem de toast personalizada
      toastMessage: (assignments) => {
        const assignmentList = Object.entries(assignments)
          .map(([role, member]) => `${role}: ${member.nome}`)
          .join("\n")

        return {
          title: `Designação automática para ${reuniaoType}`,
          description: assignmentList,
        }
      },
    },
  })

  return { autoAssign }
}

