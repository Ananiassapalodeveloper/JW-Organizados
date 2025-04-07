"use client"

import { ReuniaoAnualForm } from "@/components/reuniaocomponents/ReuniaoAnualForm"
import type { ReuniaoAnual } from "@/types/ReuniaoForm"

export default function RegistrarReuniaoPage() {
  const handleSubmit = async (data: ReuniaoAnual) => {
    try {
      const response = await fetch("/api/reuniao", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      if (!response.ok) {
        throw new Error("Falha ao registrar reunião")
      }
      // Lidar com o sucesso (ex: mostrar uma mensagem, redirecionar, etc.)
    } catch (error) {
      console.error("Erro ao registrar reunião:", error)
      // Lidar com o erro (ex: mostrar uma mensagem de erro)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Registrar Nova Reunião Anual</h1>
      <ReuniaoAnualForm onSubmit={handleSubmit} />
    </div>
  )
}

