import { DesignationCard } from "./designation-card"
import { Designations1, setThemeColor } from "@/app/main/(dashboard)/components/Meetingype"

type WeekendCardProps = {
  weekRange?: string
  className?: string
}

export function WeekendDesignationCard({ weekRange = "10 A 16 DE FEVEREIRO", className }: WeekendCardProps) {
  return (
    <DesignationCard
      title="Programa de Designações - Fim de Semana"
      description={`Designações para a semana ${weekRange}`}
      designations={Designations1} // Replace with weekend designations data
      colorFn={setThemeColor}
      className={className}
    />
  )
}

