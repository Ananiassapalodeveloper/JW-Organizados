import useSWR from "swr";
import { api } from "@/hooks/use-membro-form-data";

const fetcher = <T>(url: string) => api.get<T>(url).then((res) => res.data);

export function useFetch<T>(url: string) {
  const { data, error, isLoading, mutate } = useSWR<T>(url, fetcher, 
  //   {
  //   revalidateOnFocus: false,   // não refaz fetch ao voltar pro tab
  //   dedupingInterval: 10000,    // evita fetch duplicado em 10s
  // }
);

  return {
    data,
    error,
    isLoading,
    mutate, // Para revalidar os dados manualmente
  };
}

