export function changeColorStatus(status: string): string {
    const statusColorMap: Record<string, string> = {
      "não inicializado": "stroke-red-500",
      "feito": "stroke-green-500",
    };
  
    return statusColorMap[status] ?? "stroke-yellow-500";
  }
  