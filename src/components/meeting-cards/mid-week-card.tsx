import { DesignationCard } from "./designation-card"
import { Designations, setThemeColor } from "@/app/main/(dashboard)/components/Meetingype"


type MidWeekCardProps = {
  weekRange?: string
  className?: string
}



export function MidWeekDesignationCard({ weekRange = "10 A 16 DE FEVEREIRO", className }: MidWeekCardProps) {
  return (
    <DesignationCard
      title="Programa de Designações - Meio de Semana"
      description={`Designações para a semana ${weekRange}`}
      designations={Designations}
      colorFn={setThemeColor}
      className={className}
    />
  )
}

