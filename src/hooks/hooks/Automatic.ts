/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useCallback, useMemo } from "react"
import { toast } from "@/hooks/use-toast"

// Tipos genéricos para maior flexibilidade
export interface Member {
  id: string
  nome: string
  estado?: string
  carreira?: string
  [key: string]: any // Para permitir campos adicionais
}

export interface AssignmentCounts {
  [key: string]: number
}

export interface AssignmentOptions<T extends Member> {
  // Membros disponíveis para designação
  members: T[]

  // Função para obter a contagem de designações de um membro
  getAssignmentCount: (member: T) => number

  // Função para definir o ID do membro para uma função específica
  setAssignments: Record<string, (id: string) => void>

  // Configurações opcionais
  options?: {
    // Preferências para cada função (ex: preferir anciãos para presidente)
    preferences?: Record<string, (member: T) => boolean>

    // Função para verificar se um membro está disponível para uma função específica
    isAvailable?: (member: T, role: string, selectedIds: Record<string, string>) => boolean

    // Mensagem de toast personalizada
    toastMessage?: (assignments: Record<string, T>) => { title: string; description: string }

    // Ordenação personalizada (padrão: por número de designações, ascendente)
    sortMembers?: (a: T, b: T) => number
  }
}

export function useAutoAssignment<T extends Member>({
  members,
  getAssignmentCount,
  setAssignments,
  options = {},
}: AssignmentOptions<T>) {
  // Configurações padrão
  const {
    preferences = {},
    isAvailable = () => true,
    toastMessage,
    sortMembers = (a, b) => getAssignmentCount(a) - getAssignmentCount(b),
  } = options

  // Memoize a lista de funções para evitar recálculos desnecessários
  const roles = useMemo(() => Object.keys(setAssignments), [setAssignments])

  // Função principal de atribuição automática
  const autoAssign = useCallback(() => {
    if (!members || members.length < roles.length) {
      toast({
        title: "Erro na designação automática",
        description: `São necessários pelo menos ${roles.length} irmãos para designação automática.`,
        variant: "destructive",
      })
      return false
    }

    try {
      // Ordenar membros por número de designações (ascendente)
      const sortedMembers = [...members].sort(sortMembers)

      // Objeto para armazenar as atribuições
      const assignments: Record<string, T> = {}

      // Objeto para rastrear IDs já selecionados
      const selectedIds: Record<string, string> = {}

      // Para cada função, encontrar o membro mais adequado
      for (const role of roles) {
        // Filtrar membros disponíveis para esta função
        const availableMembers = sortedMembers.filter(
          (member) => !Object.values(selectedIds).includes(member.id) && isAvailable(member, role, selectedIds),
        )

        if (availableMembers.length === 0) {
          throw new Error(`Não há irmãos disponíveis para a função ${role}`)
        }

        // Verificar se há preferências para esta função
        const preferenceFilter = preferences[role]

        // Aplicar preferências se existirem e houver membros que atendam aos critérios
        const preferredMembers = preferenceFilter ? availableMembers.filter(preferenceFilter) : []

        // Selecionar o membro (preferido ou não) com menos designações
        const selectedMember = preferredMembers.length > 0 ? preferredMembers[0] : availableMembers[0]

        // Armazenar a atribuição
        assignments[role] = selectedMember
        selectedIds[role] = selectedMember.id

        // Definir o ID do membro para esta função
        setAssignments[role](selectedMember.id)
      }

      // Exibir mensagem de sucesso
      if (toastMessage) {
        const message = toastMessage(assignments)
        toast(message)
      } else {
        // Mensagem padrão
        const description = Object.entries(assignments)
          .map(([role, member]) => `${role}: ${member.nome}`)
          .join(", ")

        toast({
          title: "Designação automática concluída",
          description,
        })
      }

      return true
    } catch (error) {
      toast({
        title: "Erro na designação automática",
        description: error instanceof Error ? error.message : "Erro desconhecido",
        variant: "destructive",
      })
      return false
    }
  }, [members, roles, setAssignments, preferences, isAvailable, sortMembers, toastMessage])

  return { autoAssign }
}

