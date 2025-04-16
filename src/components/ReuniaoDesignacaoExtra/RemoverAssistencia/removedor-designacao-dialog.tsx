"use client"

import { useState } from "react"
import {  AlertTriangle, Eye } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { RemoverDesignacao } from "./designacao"
import { mutate } from "swr"

export function RemoverDesignacaoDialog({ id }: { id: string | null }) {
  const [open, setOpen] = useState(false)

  const handleComplete = () => {
    // Force refresh of all related data
    mutate(`sentinela/${id}`)

    // Also refresh the specific designation type data
    // This will ensure the parent component's existingDesignation is updated
    const designationTypes = ["dirigente", "leitor", "oracaoFinal"]
    designationTypes.forEach((type) => {
      mutate(`sentinela/${id}/${type}`)
    })

    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button title="Remover Assistência" size={"icon"} variant="destructive" className="flex items-center gap-2">
          <Eye className="h-4 w-4" />
          <span className="sr-only">Remover Assistência</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            Remover Assistência
          </DialogTitle>
          <DialogDescription>Selecione as Assistência que deseja remover. Esta ação é irreversível.</DialogDescription>
        </DialogHeader>

        <div className="py-2">
          <RemoverDesignacao id={id} inDialog={true} onComplete={handleComplete} />
        </div>

        <DialogFooter className="sm:justify-between">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button variant="destructive" onClick={handleComplete}>
            Concluir
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

