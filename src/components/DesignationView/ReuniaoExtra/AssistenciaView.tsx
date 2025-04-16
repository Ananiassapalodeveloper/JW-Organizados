import { Badge } from "../../ui/badge";
import { Separator } from "../../ui/separator";
import { SetThemeColor } from "@/lib/color";
import { cn } from "@/lib/utils";
import { assistenciaValueType } from "@/services/assistenciaData/data";
import { RegistoAssistencia } from "@/types/ExtraActivityDTO/AssistenciaType/type";

export function AssistenciaView({
  Assistencia,
}: {
  Assistencia: RegistoAssistencia[];
}) {

  return (
    <div className="space-y-4 p-4">
      <Badge
        variant="outline"
        className={cn(
          "px-3 py-1 text-base font-medium uppercase",
          SetThemeColor(1)
        )}
      >
        Assistência
      </Badge>

      <div className={"grid gap-3"}>
        {Assistencia && Assistencia.length > 0 ? (
          Assistencia.map((des) => {
            const assistenciaInfo = assistenciaValueType.find(
              (m) => m.value === des.name
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
                        {assistenciaInfo?.name || des.name}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="space-y-1">
                        <h4 className="font-medium text-xs text-muted-foreground">
                          Assistência
                        </h4>
                        <p className="font-medium">{des.quantidade}</p>
                      </div>
                    </div>
                    <Separator />
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-6 text-muted-foreground">
            Nenhuma Assistência encontrada.
          </div>
        )}
      </div>
    </div>
  );
}
