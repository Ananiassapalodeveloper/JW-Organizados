import { Badge } from "../../ui/badge";
import { Separator } from "../../ui/separator";
import { MinisterioType } from "@/services/MinisterioData/data";
import { Estado } from "@/services/Estado.data";
import { cn } from "@/lib/utils";
import { SetThemeColor } from "@/lib/color";
import { DesignationType } from "@/types/TypeDesiganationView";


export function MinisterioView({
  Date: MinisterioData,
}: {
  Date: DesignationType;
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
        Faça o seu melhor na pregação
      </Badge>
      <div className={"grid gap-3"}>
        {MinisterioData?.Ministerio && MinisterioData.Ministerio.length > 0 ? (
          MinisterioData.Ministerio.map((des) => {
            const ministerioInfo = MinisterioType?.find(
              (m) => m?.value === des?.name
            );
            const dirigenteEstado = Estado?.find(
              (e) => e?.value === des?.membroDirigente?.estado
            );
            const moradorEstado = Estado?.find(
              (e) => e?.value === des?.membroMorador?.estado
            );

            const dirigenteSuplenteEstado = Estado?.find(
              (e) => e?.value === des?.suplenteMembroDirigente?.estado
            );
            const moradorSuplenteEstado = Estado?.find(
              (e) => e?.value === des?.suplenteMembroMorador?.estado
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
                        {ministerioInfo?.name || des.name}
                      </Badge>
                    </div>

                    {!["discurso", "explicarCrenca"].includes(des.name) ? (
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="space-y-1">
                          <h4 className="font-medium text-xs text-muted-foreground">
                            Dirigente
                          </h4>
                          <p className="font-medium">
                            {des.membroDirigente.nome}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {dirigenteEstado?.name ||
                              des.membroDirigente.estado}
                          </p>
                        </div>

                        <div className="space-y-1">
                          <h4 className="font-medium text-xs text-muted-foreground">
                            Morador
                          </h4>
                          <p className="font-medium">
                            {des?.membroMorador?.nome}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {moradorEstado?.name || des?.membroMorador?.estado}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="space-y-1">
                          <h4 className="font-medium text-xs text-muted-foreground">
                            Orador
                          </h4>
                          <p className="font-medium">
                            {des.membroDirigente.nome}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {dirigenteEstado?.name ||
                              des.membroDirigente.estado}
                          </p>
                        </div>

                        <div className="space-y-1">
                          <h4 className="font-medium text-xs text-muted-foreground">
                            Orador suplente
                          </h4>
                          <p className="font-medium">
                            {des.suplenteMembroDirigente.nome}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {dirigenteSuplenteEstado?.name ||
                              des.suplenteMembroDirigente.estado}
                          </p>
                        </div>
                      </div>
                    )}

                    <Separator />

                    {!["discurso", "explicarCrenca"].includes(des.name) && (
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="space-y-1">
                          <h4 className="font-medium text-xs text-muted-foreground">
                            Dirigente suplente
                          </h4>
                          <p className="font-medium">
                            {des.suplenteMembroDirigente.nome}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {dirigenteSuplenteEstado?.name ||
                              des.suplenteMembroDirigente.estado}
                          </p>
                        </div>

                        <div className="space-y-1">
                          <h4 className="font-medium text-xs text-muted-foreground">
                            Morador suplente
                          </h4>
                          <p className="font-medium">
                            {des?.suplenteMembroMorador?.nome}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {moradorSuplenteEstado?.name ||
                              des?.suplenteMembroMorador?.estado}
                          </p>
                        </div>
                      </div>
                    )}
                    {!["discurso", "explicarCrenca"].includes(des.name) && (
                      <Separator />
                    )}

                    <div className="flex flex-col text-xs space-y-1 text-muted-foreground">
                      <span>
                        lição de conselho:{" "}
                        <Badge className="rounded-full" variant={"secondary"}>
                          {des?.lessonPoint.split(".")[0]}
                        </Badge>
                      </span>

                      <span
                        className={cn(
                          ["discurso", "explicarCrenca"].includes(des.name) &&
                            "hidden"
                        )}
                      >
                        ponto de conselho:{" "}
                        <Badge className="rounded-full" variant={"destructive"}>
                          {des?.lessonPoint.split(".")[1]}
                        </Badge>
                      </span>
                      <span
                        className={cn(
                          !["discurso", "explicarCrenca"].includes(des.name) &&
                            "hidden"
                        )}
                      >
                        Tema:{" "}
                        <Badge
                          className={cn("rounded-full ")}
                          variant={"outline"}
                        >
                          {des.tema}
                        </Badge>
                      </span>
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
