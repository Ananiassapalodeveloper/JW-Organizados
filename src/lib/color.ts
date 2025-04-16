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

  export function SetThemeColor(index: number): string {
    const color = [
      "bg-green-500/10 text-green-500",
      "bg-blue-500/10 text-blue-500",
      "bg-yellow-500/10 text-yellow-500",
      "bg-red-500/10 text-red-500",
    ];
    return color[index % color.length];
  }
  