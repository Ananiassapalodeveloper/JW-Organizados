export interface FamilyMember {
    name: string
    role: string
    qtds: number
  }
  
  export const Family: FamilyMember[] = [
    // Add your family member data here.  Example:
    { name: "Member 1", role: "Publicador Baptizado", qtds: 10 },
    { name: "Member 2", role: "Publicador Baptizado", qtds: 5 },
    { name: "Member 3", role: "Publicador não Baptizado", qtds: 2 },
    { name: "Member 4", role: "Publicador Baptizado", qtds: 15 },
    { name: "Member 5", role: "Publicador Baptizado", qtds: 8 },
  ]
  
  export const setThemeColor = (index: number): string => {
    const colors = ["text-sky-500", "text-emerald-500", "text-rose-500", "text-yellow-500", "text-indigo-500"] // Add more colors as needed
    return colors[index % colors.length]
  }
  
