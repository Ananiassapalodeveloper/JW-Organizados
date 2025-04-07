"use client"

import * as React from "react"
import { addDays, format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { CalendarIcon } from 'lucide-react'
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export interface CalendarDateRangePickerProps extends React.HTMLAttributes<HTMLDivElement> {
  date?: DateRange | undefined;
  setDate?: (date: DateRange | undefined) => void;
}

export function CalendarDateRangePicker({
  className,
  date: externalDate,
  setDate: externalSetDate,
  ...props
}: CalendarDateRangePickerProps) {
  // Use internal state if no external state is provided
  const [internalDate, setInternalDate] = React.useState<DateRange | undefined>({
    from: new Date(2025, 0, 20),
    to: addDays(new Date(2025, 0, 20), 20),
  })
  
  // Use either external or internal state
  const date = externalDate !== undefined ? externalDate : internalDate
  const setDate = (newDate: DateRange | undefined) => {
    if (externalSetDate) {
      externalSetDate(newDate)
    } else {
      setInternalDate(newDate)
    }
  }

  return (
    <div className={cn("grid gap-2", className)} {...props}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[260px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "dd/MM/yyyy", { locale: ptBR })} -{" "}
                  {format(date.to, "dd/MM/yyyy", { locale: ptBR })}
                </>
              ) : (
                format(date.from, "dd/MM/yyyy", { locale: ptBR })
              )
            ) : (
              <span>Selecione a semana</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
            locale={ptBR}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
