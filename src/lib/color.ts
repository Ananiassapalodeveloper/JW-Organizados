export function changeColorStatus(status: string): string {
    const statusColorMap: Record<string, string> = {
      "não inicializado": "stroke-red-500",
      "feito": "stroke-green-500",
    };
  
    return statusColorMap[status] ?? "stroke-yellow-500";
  }

  export function changeColorservo(index: number): string {
    const color = [
      "stroke-red-500",
      "stroke-yellow-500",
      "stroke-green-500",
      "stroke-blue-500",
      "stroke-pink-500",
    ];
   
     return color[index%color.length];
  }
  