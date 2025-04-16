import { Badge } from "../../ui/badge";
import { Estado } from "@/services/Estado.data";
import { SetThemeColor } from "@/lib/color";
import { cn } from "@/lib/utils";
import { PartesFinaisType } from "@/types/TypeDesiganationView";

export function PartesFinaisView({
  Date: PartesFinaisData,
}: {
  Date: PartesFinaisType[];
}) {
 
  return (
    <div className="space-y-4 p-4">
      <div
        // variant="outline"
        className={cn(
          "px-3 py-1 text-base font-medium uppercase",
          SetThemeColor(0)
        )}
      >
        Partes Finais
      </div>
      <div className={"grid gap-3"}>
        {PartesFinaisData && PartesFinaisData.length > 0 ? (
          PartesFinaisData.map((des) => {
            const dirigenteEstado = Estado?.find(
              (e) => e?.value === des?.membro?.estado
            );
            const suplenteEstado = Estado?.find(
              (e) => e?.value === des?.suplenteMembro?.estado
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
                        {des.name}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="space-y-1">
                        <h4 className="font-medium text-xs text-muted-foreground">
                          Dirigente
                        </h4>
                        <p className="font-medium">{des?.membro?.nome}</p>
                        <p className="text-xs text-muted-foreground">
                          {dirigenteEstado?.name || des?.membro?.estado}
                        </p>
                      </div>

                      <div className="space-y-1">
                        <h4 className="font-medium text-xs text-muted-foreground">
                          Suplente
                        </h4>
                        <p className="font-medium">
                          {des?.suplenteMembro?.nome}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {suplenteEstado?.name || des?.suplenteMembro?.estado}
                        </p>
                      </div>
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
