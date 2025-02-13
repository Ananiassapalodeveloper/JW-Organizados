import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  CheckCircle,
  Circle,
  CircleOff,
  HelpCircle,
  Timer,
} from "lucide-react"

export const labels = [
  {
    value: "bug",
    label: "Ajudante",
  },
  {
    value: "feature",
    label: "Presidente",
  },
  {
    value: "documentation",
    label: "Voluntário",
  },
]

export const statuses = [
  {
    value: "canceled",
    label: "Matricalado",
    icon: CircleOff,
  },
  {
    value: "backlog",
    label: "Associado",
    icon: HelpCircle,
  },
  {
    value: "todo",
    label: "Baptizado",
    icon: Circle,
  },
  {
    value: "in progress",
    label: "Auxiliar",
    icon: Timer,
  },
  {
    value: "done",
    label: "Regular",
    icon: CheckCircle,
  }
]

export const priorities = [
  {
    label: "Som",
    value: "low",
    icon: ArrowDown,
  },
  {
    label: "Contas",
    value: "medium",
    icon: ArrowRight,
  },
  {
    label: "Literatura",
    value: "high",
    icon: ArrowUp,
  },
]
