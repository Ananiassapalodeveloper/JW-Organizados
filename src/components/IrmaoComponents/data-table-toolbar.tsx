"use client"

import { Table } from "@tanstack/react-table"
import { X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTableViewOptions } from "./data-table-view-options" 

import { carreira, Dadiva, estados,Grupos,SEXO } from "../../app/main/membros/data/data"
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
        {table.getColumn("estado") && (
          <DataTableFacetedFilter
            column={table.getColumn("estado")}
            title="Estado"
            options={estados}
          />
        )}
        {table.getColumn("dadiva") && (
          <DataTableFacetedFilter
            column={table.getColumn("dadiva")}
            title="Dádiva"
            options={Dadiva}
          />
        )}
         {table.getColumn("sexo") && (
          <DataTableFacetedFilter
            column={table.getColumn("sexo")}
            title="Género"
            options={SEXO}
          />
        )}
         {table.getColumn("carreira") && (
          <DataTableFacetedFilter
            column={table.getColumn("carreira")}
            title="Carreiras"
            options={carreira}
          />
        )}
        {table.getColumn("grupo") && (
          <DataTableFacetedFilter
            column={table.getColumn("grupo")}
            title="Grupos"
            options={Grupos}
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
