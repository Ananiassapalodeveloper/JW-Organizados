import { Badge } from "../../ui/badge";
import { Separator } from "../../ui/separator";
import { Estado } from "@/services/Estado.data";
import { SetThemeColor } from "@/lib/color";
import { cn } from "@/lib/utils";
import { ReuniaoPublicaValueType } from "@/services/ReuniaopublicaData/data";
import { RegistoReuniaoPublica } from "@/types/reuniaoFimSemanaDTO/type";

export function ReuniaoPublicaView({ Date:ReuniaoPublicaData }: { Date: RegistoReuniaoPublica[] }) {

  return (
    <div className="space-y-4 p-4">
      <Badge
        variant="outline"
        className={cn(
          "px-3 py-1 text-base font-medium uppercase",
          SetThemeColor(2)
        )}
      >
        Reunião Pública
      </Badge>
      <div className={"grid gap-3"}>
        {ReuniaoPublicaData && ReuniaoPublicaData.length > 0 ? (
          ReuniaoPublicaData.map((des) => {
            const reuniaoPublicaInfo = ReuniaoPublicaValueType?.find(
              (m) => m?.value === des?.name
            );
            const dirigenteEstado = Estado?.find(
              (e) => e?.value === des?.suplenteMembro?.estado
            );

            const dirigenteSuplenteEstado = Estado?.find(
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
                        {reuniaoPublicaInfo?.name || des?.name}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="space-y-1">
                        <h4 className="font-medium text-xs text-muted-foreground">
                          {des?.name === "orador" ? "Orador" : "Dirigente"}
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
                          {dirigenteSuplenteEstado?.name ||
                            des?.suplenteMembro?.estado}
                        </p>
                      </div>
                    </div>

                    <Separator />
                    {/* {tema} */}
                    {des.name === "orador" && (
                      <div className="flex flex-col text-xs space-y-1 text-muted-foreground">
                        <span>
                          Tema:{" "}
                          <Badge
                            className={cn("rounded-full ")}
                            variant={"outline"}
                          >
                            {des?.tema}
                          </Badge>
                        </span>
                      </div>
                    )}
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
