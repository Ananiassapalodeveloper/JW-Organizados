"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";

interface Member {
  id: string;
  nome: string;
  posicao?: string;
  estado?: string;
  privilegioServico?: string;
  genero: string;
  carreira?: string;
  funcao?: string;
}

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    async function fetchMembers() {
      try {
        const response = await api.get("/members");
        setMembers(response.data);
      } catch (error) {
        console.error("Erro ao buscar membros", error);
      }
    }
    fetchMembers();
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold">Lista de Membros</h1>
      <ul>
        {members.map((member) => (
          <li key={member.id} className="p-2 border-b">
            {member.nome} - {member.posicao || "Sem posição"}
          </li>
        ))}
      </ul>
    </div>
  );
}
