// Definição dos tipos para o componente
export interface FamilyMember {
    name: string
    role: string
    qtds: number
  }
  
  export type FeedbackType = {
    message: string
    type: "success" | "error" | "info" | ""
  }
  
  export interface PersonSelectorProps {
    role: string
    name: string
    onSelect: (name: string) => void
    openState: boolean
    setOpenState: (open: boolean) => void
    availableMembers: FamilyMember[]
  }