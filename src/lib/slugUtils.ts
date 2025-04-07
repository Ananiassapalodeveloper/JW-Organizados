const monthMap: Record<string, string> = {
    janeiro: "Janeiro",
    fevereiro: "Fevereiro",
    marco: "Março",
    abril: "Abril",
    maio: "Maio",
    junho: "Junho",
    julho: "Julho",
    agosto: "Agosto",
    setembro: "Setembro",
    outubro: "Outubro",
    novembro: "Novembro",
    dezembro: "Dezembro",
  };
  
  export function generateSlug(ano: number, mes: string, id: string): string {
    const mesFormatado = removeDiacritics(mes.toLowerCase());
    return `${ano}-${mesFormatado}-${id}`;
  }
  
  export function parseSlug(slug: string) {
    const match = slug?.match(/^(\d{4})-([a-z-]+)-([a-f0-9\-]+)$/);
    if (!match) return null;
  
    return {
      ano: parseInt(match[1], 10),
      mes: monthMap[match[2]] || match[2], // Converte de volta
      id: match[3],
    };
  }
  
  export function removeDiacritics(text: string): string {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
  