"use client"

import { useState, useEffect } from "react"
import axios from "axios"

// Tipo para o grupo
export type Grupo = {
  id: string
  nome: string
}

// Tipo para membro (para uso em seleção de superior)
export type MembroBasico = {
  id: string
  nome: string
}

// Hook personalizado para buscar dados do formulário
export function useMembroFormData() {
  const [grupos, setGrupos] = useState<Grupo[]>([])
  const [membros, setMembros] = useState<MembroBasico[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)

        // Buscar grupos e membros em paralelo
        const [gruposResponse, membrosResponse] = await Promise.all([
          axios.get("/api/grupos"),
          axios.get("/api/member2/basico"), // Endpoint para buscar apenas id e nome dos membros
        ])

        setGrupos(gruposResponse.data)
        setMembros(membrosResponse.data)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Erro ao carregar dados"))
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  return { grupos, membros, isLoading, error }
}

// Instância do axios para uso em toda a aplicação
export const api = axios.create({
  baseURL: "/api/",
  headers: {
    "Content-Type": "application/json",
  },
})

