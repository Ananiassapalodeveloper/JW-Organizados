
import Header from "@/components/header";

import { ViewerActualDesigantion } from "@/components/DesignationView/ViewerActualDesigantion";
import ActionSearchBar from "@/components/action-search-bar";

export default function DesignacoesPage() {

  return (
    <>
      <Header />
      <main className="flex container flex-col mx-auto px-4 py-10 space-y-8 mt-[84px] w-full">
        {/* Page Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Designações</h1>
          <p className="text-muted-foreground">
            Visualize as designações das reuniões da semana
          </p>
        </div>

        <ViewerActualDesigantion />
      </main>
    </>
  );
}
