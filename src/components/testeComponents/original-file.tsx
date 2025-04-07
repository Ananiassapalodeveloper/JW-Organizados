import type { FamilyMember } from "./types"

// Dados de exemplo - substitua pelos seus dados reais
export const Family: FamilyMember[] = [
  // Adicione seus dados de membros aqui. Exemplo:
  { name: "Member 1", role: "Publicador Baptizado", qtds: 10 },
  { name: "Member 2", role: "Publicador Baptizado", qtds: 5 },
  { name: "Member 3", role: "Publicador não Baptizado", qtds: 2 },
  { name: "Member 4", role: "Publicador Baptizado", qtds: 15 },
  { name: "Member 5", role: "Publicador Baptizado", qtds: 8 },
]

export const setThemeColor = (index: number): string => {
  const colors = ["text-sky-500", "text-emerald-500", "text-rose-500", "text-yellow-500", "text-indigo-500"] // Adicione mais cores conforme necessário
  return colors[index % colors.length]
}


  
  
