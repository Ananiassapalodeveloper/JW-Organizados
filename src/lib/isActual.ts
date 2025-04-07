import { getYear, getMonth } from "date-fns";

export type MonthStatus = "realizado" | "decorrendo" | "não inicializado";

export function classifyMonths(year: number, months: number[]) {
  const now = new Date();
  const currentYear = getYear(now);
  const currentMonth = getMonth(now) + 1;

  return months.map((mes) => {
    let status: MonthStatus;

    if (year < currentYear || (year === currentYear && mes < currentMonth)) {
      status = "realizado";
    } else if (year === currentYear && mes === currentMonth) {
      status = "decorrendo";
    } else {
      status = "não inicializado";
    }

    return { mes, status };
  });
}
