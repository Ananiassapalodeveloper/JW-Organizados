import useSWR from "swr";
import { api } from "@/hooks/use-membro-form-data";

const fetcher = <T>(url: string) => api.get<T>(url).then((res) => res.data);

export function useFetch<T>(url: string) {
  const { data, error, isLoading, mutate } = useSWR<T>(url, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate, // Para revalidar os dados manualmente
  };
}
