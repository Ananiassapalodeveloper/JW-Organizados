/* eslint-disable @typescript-eslint/no-unused-vars */
import { Metadata } from "next";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { Members } from "./data/data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: "Membros da congregação",
  description: "Os membros que constituem o corpo",
};
export default async function CongregationsMembers() {
  return (
    <div className="mt-[112px]">
      <Tabs defaultValue="group1" className="">
        <TabsList>
          <TabsTrigger value="group1">Grupo nº 1</TabsTrigger>
          <TabsTrigger value="group2">Grupo nº 2</TabsTrigger>
          <TabsTrigger value="group3">Grupo nº 3</TabsTrigger>
        </TabsList>
        <TabsContent value="group1">
          <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
            <div className="flex items-center justify-between space-y-2">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">
                  Grupo Nº 1
                </h2>
                <h3 className="text-lg font-medium tracking-tight">
                  Dirigente:{" "}
                  {
                    Members.filter(
                      (member) =>
                        member.group === 1 && member.roleGroup === "dirigente"
                    )[0].nome
                  }
                </h3>
                <h3 className="text-lg font-medium tracking-tight">
                  Ajudante:{" "}
                  {
                    Members.filter(
                      (member) =>
                        member.group === 1 && member.roleGroup === "ajudante"
                    )[0].nome
                  }
                </h3>
                <p className="text-muted-foreground">
                  Eis as listas do grupo nº 1
                </p>
              </div>
           
            </div>
            <DataTable
              data={Members.filter((member) => member.group === 1)}
              columns={columns}
            />
          </div>
        </TabsContent>
        <TabsContent value="group2">
          <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
            <div className="flex items-center justify-between space-y-2">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">
                  Grupo Nº 2
                </h2>
                <h3 className="text-lg font-medium tracking-tight">
                  Dirigente:{" "}
                  {
                    Members.filter(
                      (member) =>
                        member.group === 2 && member.roleGroup === "dirigente"
                    )[0].nome
                  }
                </h3>
                <p className="text-muted-foreground">
                  Eis as listas do grupo nº 2
                </p>
              </div>
           
            </div>
            <DataTable
              data={Members.filter((member) => member.group === 1)}
              columns={columns}
            />
          </div>
        </TabsContent>
        <TabsContent value="group3">
          <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
            <div className="flex items-center justify-between space-y-2">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">
                  Grupo Nº 3
                </h2>
                <h3 className="text-lg font-medium tracking-tight">
                  Dirigente:{" "}
                  {
                    Members.filter(
                      (member) =>
                        member.group === 3 && member.roleGroup === "dirigente"
                    )[0].nome
                  }
                </h3>
                <h3 className="text-lg font-medium tracking-tight">
                  Ajudante:{" "}
                  {
                    Members.filter(
                      (member) =>
                        member.group === 3 && member.roleGroup === "ajudante"
                    )[0].nome
                  }
                </h3>
                <p className="text-muted-foreground">
                  Eis as listas do grupo nº 3
                </p>
              </div>
           
            </div>
            <DataTable
              data={Members.filter((member) => member.group === 3)}
              columns={columns}
            />
          </div>
        </TabsContent>
      </Tabs>

    </div>
  );
}
