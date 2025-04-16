"use client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader } from "lucide-react";
import { MeetingDataRegisterDesignation } from "@/components/MeetingDataRegisterDesignation";
import { DesignationType } from "@/types/TypeDesiganationView";
import { useFetch } from "@/hooks/useFetch";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { formatDateRangeLong } from "@/lib/formatDateRange";



export function MeetingTypePage() {

  const {
    data: designations,
    error,
    isLoading,
  } = useFetch<DesignationType>(`reunioes_date`);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <div className="flex flex-col items-center gap-2">
          <Loader className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Carregando designações...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-destructive">Erro</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Houve um erro ao carregar as designações. Tente novamente.</p>
            <Button className="mt-4" variant="outline" asChild>
              <Link href="/main">Voltar ao início</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <MeetingDataRegisterDesignation
        id={designations?.id}
        params={{
          id: `${formatDateRangeLong(
            designations?.from ?? new Date().toDateString(),
            designations?.to ?? new Date().toDateString(),
            {
              showMonthAsText: true,
            }
          )}`,
        }}
        mesId={designations?.mes.id}
      />
    </div>
  );
}
