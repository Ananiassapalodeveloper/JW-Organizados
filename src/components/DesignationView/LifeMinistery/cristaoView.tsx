import { Badge } from "../../ui/badge";
import { Separator } from "../../ui/separator";
import { Estado } from "@/services/Estado.data";
import { SetThemeColor } from "@/lib/color";
import { cn } from "@/lib/utils";
import { CristaoValueType } from "@/services/cristaoData/data";
import { DesignationType } from "@/types/TypeDesiganationView";
import { PartesFinaisView } from "./PartesFinaisView";

export function CristaoView({ Date: CristaoData }: { Date: DesignationType }) {
 

  return (
    <div className="grid gap-4">
      <div className="space-y-4 p-4">
        <Badge
          variant="outline"
          className={cn(
            "px-3 py-1 text-base font-medium uppercase",
            SetThemeColor(3)
          )}
        >
          Viver como cristão
        </Badge>
        <div className={"grid gap-3"}>
          {CristaoData?.Cristao && CristaoData.Cristao.length > 0 ? (
            CristaoData.Cristao.map((des) => {
              const cristaoInfo = CristaoValueType?.find(
                (m) => m?.value === des?.name
              );
              const dirigenteEstado = Estado?.find(
                (e) => e?.value === des?.membro?.estado
              );
              const leitorEstado = Estado?.find(
                (e) => e?.value === des?.LeitorEstudoBiblico?.estado
              );

              const dirigenteSuplenteEstado = Estado?.find(
                (e) => e?.value === des?.suplenteMembro?.estado
              );
              const leitorSuplenteEstado = Estado?.find(
                (e) => e?.value === des?.LeitorSuplenteEstudoBiblico?.estado
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
                          {cristaoInfo?.name || des?.name}
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
                            {dirigenteSuplenteEstado?.name ||
                              des?.suplenteMembro?.estado}
                          </p>
                        </div>
                      </div>

                      {des.name === "estudoBiblico" && (
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div className="space-y-1">
                            <h4 className="font-medium text-xs text-muted-foreground">
                              Leitor
                            </h4>
                            <p className="font-medium">
                              {des?.LeitorEstudoBiblico?.nome}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {leitorEstado?.name ||
                                des?.LeitorEstudoBiblico?.estado}
                            </p>
                          </div>

                          <div className="space-y-1">
                            <h4 className="font-medium text-xs text-muted-foreground">
                              Leitor suplente
                            </h4>
                            <p className="font-medium">
                              {des?.LeitorSuplenteEstudoBiblico?.nome}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {leitorSuplenteEstado?.name ||
                                des?.LeitorSuplenteEstudoBiblico?.estado}
                            </p>
                          </div>
                        </div>
                      )}

                      <Separator />
                      {/* {tema} */}
                      {des.name !== "estudoBiblico" && (
                        <div className="flex flex-col text-xs space-y-1 text-muted-foreground">
                          <span>
                            Tema:{" "}
                            <Badge
                              className={cn("rounded-full ")}
                              variant={"outline"}
                            >
                              {des.tema}
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
      <PartesFinaisView Date={CristaoData.PartesFinais} />
    </div>
  );
}
