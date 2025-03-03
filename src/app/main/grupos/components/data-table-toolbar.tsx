"use client"

import { Table } from "@tanstack/react-table"
import { X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTableViewOptions } from "@/app/tasks/components/data-table-view-options"

import { privilegioServicos,estados,generos,carreiras,funcoes,posicoes } from "../data/data"
import { DataTableFacetedFilter } from "./data-table-faceted-filter"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Pesquisar membros..."
          value={(table.getColumn("nome")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("nome")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("estados") && (
          <DataTableFacetedFilter
            column={table.getColumn("estados")}
            title="Estado"
            options={estados}
          />
        )}
        {table.getColumn("privilegioServicos") && (
          <DataTableFacetedFilter
            column={table.getColumn("privilegioServicos")}
            title="Privilégio de serviço"
            options={privilegioServicos}
          />
        )}
         {table.getColumn("generos") && (
          <DataTableFacetedFilter
            column={table.getColumn("generos")}
            title="Género"
            options={generos}
          />
        )}
         {table.getColumn("carreiras") && (
          <DataTableFacetedFilter
            column={table.getColumn("carreiras")}
            title="Carreiras"
            options={carreiras}
          />
        )}
         {table.getColumn("posicoes") && (
          <DataTableFacetedFilter
            column={table.getColumn("posicoes")}
            title="Posicões"
            options={posicoes}
          />
        )}
         {table.getColumn("funcoes") && (
          <DataTableFacetedFilter
            column={table.getColumn("funcoes")}
            title="Funcões"
            options={funcoes}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}
