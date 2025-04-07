import { CalendarDays, User, Users } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

// Define proper types for our data
type Brother = {
  name?: string
  role?: string
  morador?: string
  publicador?: string
}

type Designation = {
  name: string
  brother: ReadonlyArray<Brother> | Brother[]
}

type DesignationCategory = {
  name: string
  designation: ReadonlyArray<Designation> | Designation[]
}

type DesignationCardProps = {
  title: string
  description: string
  designations: ReadonlyArray<DesignationCategory> | DesignationCategory[]
  colorFn: (index: number) => string
  className?: string
}

export function DesignationCard({ title, description, designations, colorFn, className }: DesignationCardProps) {
  if (!designations || designations.length === 0) {
    return (
      <Card className={cn("col-span-3", className)}>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-10 text-muted-foreground">
          <div className="text-center">
            <CalendarDays className="mx-auto h-12 w-12 mb-4 opacity-50" />
            <h3 className="text-lg font-medium mb-2">Nenhuma designação disponível</h3>
            <p>Não há designações registradas para este período.</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={cn("col-span-3", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {designations.map((category, categoryIndex) => (
            <div key={category.name} className="space-y-4">
              <Badge variant="outline" className={cn("px-3 py-1 text-base font-medium", colorFn(categoryIndex))}>
                {category.name}
              </Badge>

              <div className="space-y-4">
                {category.designation.map((item) => (
                  <div key={item.name} className="rounded-lg border p-4 bg-card">
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <h3 className="font-semibold text-base mb-2 cursor-help underline decoration-dotted underline-offset-4">
                          {item.name}
                        </h3>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-80">
                        <div className="flex flex-col space-y-2">
                          <div className="flex items-center space-x-2">
                            <Users className="h-4 w-4 opacity-70" />
                            <h4 className="text-sm font-semibold">{item.name}</h4>
                          </div>
                          <Separator />
                          <div className="space-y-2">
                            <h5 className="text-xs text-muted-foreground">Responsáveis:</h5>
                            {item.brother.map((bro, idx) => (
                              <div key={idx} className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarFallback className="bg-primary/10 text-primary">
                                    {getBrotherInitials(bro)}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="space-y-0.5">
                                  <p className="text-sm font-medium">{getBrotherName(bro)}</p>
                                  {bro.role && <p className="text-xs text-muted-foreground">{bro.role}</p>}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </HoverCardContent>
                    </HoverCard>

                    <ul className="space-y-2 mt-2">
                      {item.brother.map((bro, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm">
                          <User className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
                          <span>
                            {bro.role ? (
                              <span>
                                <span className="font-medium">{bro.role}:</span> {getBrotherName(bro)}
                              </span>
                            ) : (
                              getBrotherName(bro)
                            )}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

// Helper functions to handle different brother data structures
function getBrotherName(brother: Brother): string {
  if ("name" in brother && brother.name) {
    return brother.name
  }
  if ("morador" in brother && "publicador" in brother) {
    return `${brother.morador} | ${brother.publicador}`
  }
  return "Nome não disponível"
}

function getBrotherInitials(brother: Brother): string {
  const name = "name" in brother && brother.name ? brother.name : "morador" in brother ? brother.morador : ""

  if (!name) return "?"

  const parts = name.split(" ")
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

