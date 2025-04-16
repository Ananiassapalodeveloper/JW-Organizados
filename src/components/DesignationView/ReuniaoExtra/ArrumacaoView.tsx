import { Badge } from "../../ui/badge";
import { Separator } from "../../ui/separator";
import { Estado } from "@/services/Estado.data";
import { SetThemeColor } from "@/lib/color";
import { cn } from "@/lib/utils";
import { RegistoArrumacao } from "@/types/ExtraActivityDTO/ArrumacaoType/type";

export function ArrumacaoView({
  Date: ArrumacaoData,
}: {
  Date: RegistoArrumacao[];
}) {

 

  return (
    <div className="space-y-4 p-4">
      <Badge
        variant="outline"
        className={cn(
          "px-3 py-1 text-base font-medium uppercase",
          SetThemeColor(0)
        )}
      >
        Arrumação
      </Badge>
      <div className={"grid gap-3"}>
        {ArrumacaoData && ArrumacaoData.length > 0 ? (
          ArrumacaoData.map((des) => {
            const dirigenteEstado = Estado?.find(
              (e) => e?.value === des?.Grupo?.dirigente?.estado
            );

            return (
              <div
                key={des.id}
                className={
                  "rounded-lg border p-3 transition-all hover:bg-muted/50"
                }
              >
                <div className="flex items-start gap-3">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center justify-between">
                      <Badge
                        variant="outline"
                        className="bg-primary/10 text-primary font-medium px-2.5 py-0.5"
                      >
                        {des?.Grupo?.nome}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="space-y-1">
                        <h4 className="font-medium text-xs text-muted-foreground">
                          Número de designação:
                        </h4>

                        <Badge variant={"outline"} className="rounded-full">
                          {des.Grupo._count.Arrumacao}
                        </Badge>

                        <p className="text-xs text-muted-foreground space-x-2">
                          <span>Quantidade de irmãos</span>
                          <Badge
                            variant={"secondary"}
                            className="font-medium rounded-full"
                          >
                            {des.Grupo._count.membros}
                          </Badge>
                        </p>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex flex-col text-xs space-y-1 text-muted-foreground">
                      {des.Grupo.dirigente && (
                        <div className="space-y-1">
                          <Badge
                            variant="outline"
                            className="bg-primary/10 text-primary font-medium px-2.5 py-0.5"
                          >
                            Irmão dirigente
                          </Badge>
                          <p className="font-medium">
                            {des.Grupo.dirigente.nome}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Estado:{" "}
                            {dirigenteEstado?.name ||
                              des?.Grupo?.dirigente?.estado}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-6 text-muted-foreground">
            Nenhuma designação encontrada.
          </div>
        )}
      </div>
    </div>
  );
}
