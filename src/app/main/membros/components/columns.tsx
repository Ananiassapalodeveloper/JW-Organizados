"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

import { estados,posicoes,privilegioServicos,carreiras,funcoes,generos} from "../data/data"
import { memberType } from "../data/schema"
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
      const label = posicoes.find((label) => label.value === row.original.posicoes)

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
    accessorKey: "estados",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Estado" />
    ),
    cell: ({ row }) => {
      const estado = estados.find(
        (estado) => estado.value === row.getValue("estados")
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
    accessorKey: "privilegioServicos",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Privilégio de serviço" />
    ),
    cell: ({ row }) => {
      const privilegio = privilegioServicos.find(
        (priority) => priority.value === row.getValue("privilegioServicos")
      )

      if (!privilegio) {
        return null
      }

      return (
        <div className="flex items-center">
          {privilegio.icon && (
            <privilegio.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{privilegio.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },

  {
    accessorKey: "funcoes",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Função" />
    ),
    cell: ({ row }) => {
      const funcao = funcoes.find(
        (priority) => priority.value === row.getValue("funcoes")
      )

      if (!funcao) {
        return null
      }

      return (
        <div className="flex items-center">
          {/* {funcao.icon && (
            <funcao.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )} */}
          <span>{funcao.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },

  {
    accessorKey: "carreiras",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Carreiras" />
    ),
    cell: ({ row }) => {
      const carreira = carreiras.find(
        (priority) => priority.value === row.getValue("carreiras")
      )

      if (!carreira) {
        return null
      }

      return (
        <div className="flex items-center">
          {/* {funcao.icon && (
            <funcao.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )} */}
          <span>{carreira.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },

  {
    accessorKey: "generos",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sexo" />
    ),
    cell: ({ row }) => {
      const label = generos.find((label) => label.value === row.original.generos)

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
