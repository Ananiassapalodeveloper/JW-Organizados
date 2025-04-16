"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

import { estados,posicoes, Dadiva,carreira,SEXO} from "../../app/main/membros/data/data"
import { memberType } from "../../app/main/membros/data/schema"
import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"

export const columns: ColumnDef<memberType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "nome",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nome" />
    ),
    cell: ({ row }) => {
      const label = posicoes.find((label) => label.value === row.original.grupo)

      return (
        <div className="flex space-x-2">
          {label && <Badge variant="outline">{label.label}</Badge>}
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("nome")}
          </span>
        </div>
      )
    },
  },

  {
    accessorKey: "estado",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Estado" />
    ),
    cell: ({ row }) => {
      const estado = estados.find(
        (estado) => estado.value === row.getValue("estado")
      )

      if (!estado) {
        return null
      }

      return (
        <div className="flex w-[100px] items-center">
          {estado.icon && (
            <estado.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{estado.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },

  {
    accessorKey: "dadiva",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Dádiva" />
    ),
    cell: ({ row }) => {
      const privilegio = Dadiva.find(
        (priority) => priority.value === row.getValue("dadiva")
      )

      if (!privilegio) {
        return null
      }

      return (
        <div className="flex items-center">
          <span>{privilegio.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },

  {
    accessorKey: "grupo",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Grupo" />
    ),
    cell: ({ row }) => {
       
      if (!row.getValue("grupo")) {
        return null
      }

      return (
        <div className="flex items-center">
          {/* {funcao.icon && (
            <funcao.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )} */}
          <span>{row.getValue("grupo")}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },

  {
    accessorKey: "carreira",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Carreiras" />
    ),
    cell: ({ row }) => {
      const carrer = carreira.find(
        (priority) => priority.value === row.getValue("carreira")
      )

      if (!carrer) {
        return null
      }

      return (
        <div className="flex items-center">
          {/* {funcao.icon && (
            <funcao.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )} */}
          <span>{carrer.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },

  {
    accessorKey: "sexo",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sexo" />
    ),
    cell: ({ row }) => {
      const label = SEXO.find((label) => label.value === row.original.sexo)

      return (
        <div className="flex space-x-2">
          {label && <Badge variant="outline">{label.label}</Badge>}
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("generos")}
          </span>
        </div>
      )
    },
  },

  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
