import { parse, isWithinInterval } from "date-fns";

// Função que verifica se a data actual está dentro intervalo
export function isWithinWeek(startDate: string, endDate: string): boolean {
  try {
    const CurrentDate = new Date();
    CurrentDate.setHours(0, 0, 0, 0);
    const start = parse(startDate, "dd/MM/yyyy", new Date());
    const end = parse(endDate, "dd/MM/yyyy", new Date());
    const Interval = { start, end };
    return isWithinInterval(CurrentDate, Interval);
  } catch (error) {
    console.error("Erro ao verificar o intervalo:", error);
    return false;
  }
}
