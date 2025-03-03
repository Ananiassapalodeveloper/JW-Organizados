"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function AssistenceRegisterCard() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          Assistência da reunião
        </CardTitle>
        <CardDescription>
          Define a assistência da reunião da semana
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6 w-full overflow-hidden">
        <div className="flex flex-col items-start justify-start space-y-4">
          <div className="flex items-center space-x-4">
            <p className="text-sm text-muted-foreground">
              200 pessoas assistiram
            </p>
            <Dialog>
              <DialogTrigger>
                <Button>Editar</Button>
              </DialogTrigger>
              <DialogContent className="space-y-4">
                <DialogHeader>
                  <DialogTitle>Registar a assistência</DialogTitle>
                </DialogHeader>
                <form action="" className="space-y-2">
                  <Label htmlFor="assistence">
                    Define o número de assistência
                  </Label>
                  <Input
                    type="number"
                    name=""
                    id="assistence"
                    placeholder="Define o número de assistência..."
                  />
                </form>
                <DialogFooter>
                  <Button>Registar</Button>
                  <DialogClose asChild>
                    <Button variant={"outline"}>Cancelar</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
