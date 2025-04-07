import { addDays, differenceInDays, parseISO } from "date-fns";

// Função para dividir o intervalo de datas em exatamente 4 períodos de 7 dias
export function gerarQuatroIntervalos(from: string, to: string) {
  const startDate = parseISO(from);
  const endDate = parseISO(to);
  const totalDias = differenceInDays(endDate, startDate) + 1;

  // Validação: O intervalo deve ser exatamente 4 semanas (28 dias)
  if (totalDias !== 28) {
    throw new Error(
      "O intervalo de datas deve ser exatamente de 4 semanas (28 dias)."
    );
  }

  

  const intervals = [];
  let currentDate = startDate;

  for (let i = 0; i < 4; i++) {
    const fromDate = currentDate;
    const toDate = addDays(fromDate, 6); // 7 dias depois
    intervals.push({ from: fromDate, to: toDate });
    currentDate = addDays(toDate, 1);
  }

  return intervals;
}