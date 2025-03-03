/* eslint-disable @typescript-eslint/no-unused-vars */
import { promises as fs } from "node:fs"
import path from "node:path"
import { Metadata } from "next"
import Image from "next/image"
import { z } from "zod"

import { columns } from "./components/columns"
import { DataTable } from "./components/data-table"
import { UserNav } from "./components/user-nav"
import { taskSchema } from "./data/schema"
import { tasks } from "./data/seed"

export const metadata: Metadata = {
  title: "Irmãos",
  description: "Matriculado, Assossiado e toda fartenidade de irmão",
}



export default async function TaskPage() {

  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/tasks-light.png"
          width={1280}
          height={998}
          alt="Playground"
          className="block dark:hidden"
        />
        <Image
          src="/examples/tasks-dark.png"
          width={1280}
          height={998}
          alt="Playground"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Bem-Vindo de volta!</h2>
            <p className="text-muted-foreground">
              Eis as listas de estudantes da congregação PRAÇA NOVA 3!
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <UserNav />
          </div>
        </div>
        <DataTable data={tasks} columns={columns} />
      </div>
    </>
  )
}
