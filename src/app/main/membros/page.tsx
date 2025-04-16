/* eslint-disable @typescript-eslint/no-unused-vars */
import { Metadata } from "next";
import { MEMBROS } from "./membros";

export const metadata: Metadata = {
  title: "Membros da congregação",
  description: "Os membros que constituem o corpo",
};

export default async function CongregationsMembers() {
  return (
    <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Bem-Vindo de volta!
          </h2>
          <p className="text-muted-foreground">
            Eis as listas de estudantes da congregação PRAÇA NOVA 3!
          </p>
        </div>
      </div>
      <MEMBROS/>
    </div>
  );
}
