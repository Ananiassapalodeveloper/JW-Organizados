"use client";
import { CalendarRange } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { DesignationType } from "@/types/TypeDesiganationView";
import { formatDateRangeLong } from "@/lib/formatDateRange";

export function CurrentWeekBanner({ Date }: { Date: DesignationType }) {


  return (
    <Card className="bg-muted/50">
      <CardContent className="flex items-center gap-3 py-3">
        <CalendarRange className="h-5 w-5 text-primary" />
        <span className="font-medium">
          Semana atual:{" "}
          {formatDateRangeLong(
            Date?.from,
            Date?.to,
            {
              showMonthAsText: true,
            }
          )}
        </span>
      </CardContent>
    </Card>
  );
}
