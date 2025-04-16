/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { api } from "@/hooks/use-membro-form-data"
import { toast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

export function useRemoveDesignacao() {
  const router = useRouter()

  const handleRemoveDesignacao = async (id: string, type: string) => {
    try {
      await api.delete(`sentinela/${id}/${type}`)

      toast({
        title: "Designação removida com sucesso",
        variant: "default",
      })

      // Force a refresh of the page to ensure all state is reset
      router.refresh()

      return true
    } catch (error) {
      toast({
        title: "Erro ao remover designação",
        description: "Ocorreu um erro ao tentar remover a designação.",
        variant: "destructive",
      })

      return false
    }
  }

  return { handleRemoveDesignacao }
}

