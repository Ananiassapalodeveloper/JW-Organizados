"use client";

import { useState } from "react";
import { Trash2, AlertTriangle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { RemoverDesignacao } from "./designacao";

export function RemoverDesignacaoDialog({ id }: { id: string | null }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          title="Remover Designações"
          size={"icon"}
          variant="destructive"
          className="flex items-center gap-2"
        >
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Remover Designações</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            Remover Designações
          </DialogTitle>
          <DialogDescription>
            Selecione as designações que deseja remover. Esta ação é
            irreversível.
          </DialogDescription>
        </DialogHeader>

        <div className="py-2">
          <RemoverDesignacao
            id={id}
            inDialog={true}
            onComplete={() => setOpen(false)}
          />
        </div>

        <DialogFooter className="sm:justify-between">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button variant="destructive" onClick={() => setOpen(false)}>
            Concluir
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
