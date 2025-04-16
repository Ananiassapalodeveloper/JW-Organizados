"use client";

import { useState, useEffect } from "react";
import axios from "axios";

// Tipo para o grupo
export type Grupo = {
  id: string;
  nome: string;
  descricao: string;
  dirigenteId: string;
  ajudanteId: string;
  dirigente: {
    nome: string;
    estado: string;
  };
  _count: {
    Arrumacao: number;
    membros: number;
  };
};

// Tipo para membro (para uso em seleção de superior)
const MembroBasico ={
  "id": "a3f70f86-85e4-4995-be8f-70667a4b5524",
  "nome": "Abel Gonga",
  "email": "j@gmail.com",
  "createdAt": "2025-03-30T23:36:44.697Z",
  "password": "1234",
  "contacto": "+244989758753",
  "dataNascimento": "2025-03-30T23:00:00.000Z",
  "dataMatricula": "2025-03-30T23:00:00.000Z",
  "dataPublicador": "2025-03-30T23:00:00.000Z",
  "dataBaptismo": "2025-03-30T23:00:00.000Z",
  "dataAuxiliar": "2025-03-30T23:00:00.000Z",
  "dataRegular": null,
  "descricao": "eeeehekhlk",
  "studentsId": null,
  "sexo": "M",
  "estado": "BATIZADO",
  "carreira": "PIONEIRO_AUXILIAR",
  "dadiva": "SERVO_MINISTERIAL",
  "grupoId": "6c41aacd-d03f-4284-b67c-2cc2474bc0da",
  "grupo": {
      "nome": "grupo 1",
      "dirigente": null,
      "ajudante": {
          "nome": "Abel Gonga"
      }
  },
  "servicos": [
      {
          "id": "352a039e-83d3-486b-94fa-6896daab2701",
          "membroId": "a3f70f86-85e4-4995-be8f-70667a4b5524",
          "servico": "CONTAS",
          "posicao": "DIRIGENTE"
      },
      {
          "id": "20b49f79-1c40-4ea9-81d9-a86cbff728e0",
          "membroId": "a3f70f86-85e4-4995-be8f-70667a4b5524",
          "servico": "LITERATURA",
          "posicao": "DIRIGENTE"
      },
      {
          "id": "9abc6146-b810-41dc-9cbb-80c66bacc2ad",
          "membroId": "a3f70f86-85e4-4995-be8f-70667a4b5524",
          "servico": "SOM_AUDIO",
          "posicao": "DIRIGENTE"
      }
  ]
}

export type MembroBasico= typeof MembroBasico

// Hook personalizado para buscar dados do formulário
export function useMembroFormData() {
  const [grupos, setGrupos] = useState<Grupo[]>([]);
  const [membros, setMembros] = useState<MembroBasico[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        // Buscar grupos e membros em paralelo
        const [gruposResponse, membrosResponse] = await Promise.all([
          axios.get("/api/grupos"),
          axios.get("/api/member2/basico"), // Endpoint para buscar apenas id e nome dos membros
        ]);

        setGrupos(gruposResponse.data);
        setMembros(membrosResponse.data);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Erro ao carregar dados")
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { grupos, membros, isLoading, error };
}

// Instância do axios para uso em toda a aplicação
export const api = axios.create({
  baseURL: "/api/",
  headers: {
    "Content-Type": "application/json",
  },
});
