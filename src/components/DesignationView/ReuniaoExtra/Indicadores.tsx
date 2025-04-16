import { Badge } from "../../ui/badge";
import { Separator } from "../../ui/separator";
import { Estado } from "@/services/Estado.data";
import { SetThemeColor } from "@/lib/color";
import { cn } from "@/lib/utils";
import { indicadoresValueType } from "@/services/indicadoresData/data";
import { Registoindicadores } from "@/types/ExtraActivityDTO/IndicadorType/type";
import { format } from "date-fns";
import { formatDateRange } from "@/lib/formatDateRange";

export function IndicadoresView({
  Indicadores,
}: {
  Indicadores: Registoindicadores[];
}) {
  return (
    <div className="space-y-4 p-4">
      <Badge
        variant="outline"
        className={cn(
          "px-3 py-1 text-base font-medium uppercase",
          SetThemeColor(2)
        )}
      >
        Indicadores
      </Badge>
      <div className={"grid gap-3 p-4"}>
        {Indicadores && Indicadores.length > 0 ? (
          Indicadores.map((des) => {
            const sentinelInfo = indicadoresValueType.find(
              (m) => m.value === des.name
            );
            const dirigenteEstado = Estado.find(
              (e) => e.value === des?.membro?.estado
            );
            const sumplenteEstado = Estado.find(
              (e) => e.value === des?.suplenteMembro?.estado
            );
            // Format dates before returning
            const formattedReuniaoDates = {
              ...des.ReunioesDates,
              from: format(new Date(des?.ReunioesDates?.from), "dd/MM/yyyy"),
              to: format(new Date(des?.ReunioesDates?.to), "dd/MM/yyyy"),
            };
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
                        {sentinelInfo?.name || des.name}
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
                          {sumplenteEstado?.name || des?.suplenteMembro?.estado}
                        </p>
                      </div>
                    </div>
                    <Separator />

                    {/* semana  */}
                    <div className="text-xs text-muted-foreground pt-1">
                      <span>Semana: </span>
                      <Badge variant={"outline"} className="rounded-full">
                        {" "}
                        {formatDateRange(
                          formattedReuniaoDates.from,
                          formattedReuniaoDates.to,
                          { showMonthAsText: true }
                        )}
                      </Badge>
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
