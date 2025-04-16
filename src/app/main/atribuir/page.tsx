"use client"

import type React from "react"

import { useMemo, useState, useCallback } from "react"
import Link from "next/link"
import {
  Calendar,
  CalendarPlus,
  ChevronRight,
  CircleCheck,
  Clock,
  Loader2,
  AlertTriangle,
  CalendarIcon,
  ArrowUpDown,
  Search,
} from "lucide-react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

import { CardRegisterYearMonths } from "./components/CardRegisterYearMonths"
import { SetThemeColor } from "@/lib/color"
import { useFetch } from "@/hooks/useFetch"
import { classifyMonths } from "@/lib/isActual"
import { generateSlug } from "@/lib/slugUtils"
import { cn } from "@/lib/utils"

// Types
type ReuniaoDate = {
  id: string
  data?: string
}

type Mes = {
  id: string
  mes: number
  descricao: string
  anoId: string
  ReunioesDates: ReuniaoDate[]
}

type Ano = {
  id: string
  ano: number
  descricao: string
  meses: Mes[]
}

type AnosArray = Ano[]

type MonthStatus = "decorrendo" | "realizado" | "naoInicializado"

// Status configuration for visual styling
const statusConfig: Record<MonthStatus, { label: string; color: string; icon: React.ReactNode }> = {
  decorrendo: {
    label: "Mês Atual",
    color: "bg-green-500/10 text-green-600 border-green-500/50",
    icon: <Clock className="h-4 w-4" />,
  },
  realizado: {
    label: "Realizado",
    color: "bg-blue-500/10 text-blue-600 border-blue-500/50",
    icon: <CircleCheck className="h-4 w-4" />,
  },
  naoInicializado: {
    label: "Não Inicializado",
    color: "bg-gray-500/10 text-gray-600 border-gray-500/50",
    icon: <Calendar className="h-4 w-4" />,
  },
}

// Separate loading component for better code splitting
function DashboardSkeleton() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-10 w-[250px]" />
          <Skeleton className="h-10 w-[120px]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array(8)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} className="h-[180px] w-full rounded-lg" />
            ))}
        </div>
      </div>
    </div>
  )
}

// Separate error component
function DashboardError({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="container mx-auto py-8">
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="text-red-600 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Erro ao carregar dados
          </CardTitle>
          <CardDescription>
            Não foi possível carregar as designações. Por favor, tente novamente mais tarde.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button onClick={onRetry} variant="outline" className="gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Tentar novamente
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

// Empty state component
function EmptyState({ onAddPeriod }: { onAddPeriod: () => void }) {
  return (
    <Card className="border-dashed">
      <CardContent className="flex flex-col items-center justify-center py-12 text-center">
        <CalendarIcon className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium mb-2">Nenhum resultado encontrado</h3>
        <p className="text-muted-foreground max-w-md mb-6">
          Não encontramos nenhum ano ou mês correspondente à sua busca. Tente outros termos ou adicione um novo período.
        </p>
        <Button onClick={onAddPeriod}>Adicionar Período</Button>
      </CardContent>
    </Card>
  )
}

// Month card component to reduce main component complexity
function MonthCard({
  month,
  year,
  status,
  statusConfig,
}: {
  month: Mes
  year: Ano
  status: MonthStatus
  statusConfig: Record<MonthStatus, { label: string; color: string; icon: React.ReactNode }>
}) {
  const isCompleted = month.ReunioesDates.length > 0
  // Add a fallback to prevent undefined errors
  const config = statusConfig[status as MonthStatus] || statusConfig.naoInicializado

  return (
    <Link
      href={`/main/atribuir/${generateSlug(year.ano, month.descricao, month.id)}`}
      className="block transition-transform hover:scale-[1.02] focus:scale-[1.02] focus:outline-none"
    >
      <Card
        className={cn(
          "border overflow-hidden h-full transition-all",
          status === "decorrendo" && "ring-2 ring-green-500 shadow-md",
        )}
      >
        <CardHeader className={cn("pb-2", config.color)}>
          <div className="flex justify-between items-start">
            <Badge variant="outline" className="gap-1 font-normal">
              {config.icon}
              {config.label}
            </Badge>
            {isCompleted && (
              <Badge variant="secondary" className="gap-1">
                <CircleCheck className="h-3 w-3" />
                Designações
              </Badge>
            )}
          </div>
        </CardHeader>

        <CardContent className="pt-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-2xl font-bold mb-1">{month.descricao}</h3>
              <p className="text-sm text-muted-foreground">
                {month.ReunioesDates.length} {month.ReunioesDates.length === 1 ? "período" : "períodos"}
              </p>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

// Month list item component
function MonthListItem({
  month,
  year,
  status,
  statusConfig,
}: {
  month: Mes
  year: Ano
  status: MonthStatus
  statusConfig: Record<MonthStatus, { label: string; color: string; icon: React.ReactNode }>
}) {
  const isCompleted = month.ReunioesDates.length > 0
  // Add a fallback to prevent undefined errors
  const config = statusConfig[status as MonthStatus] || statusConfig.naoInicializado

  return (
    <Link href={`/main/atribuir/${generateSlug(year.ano, month.descricao, month.id)}`} className="block">
      <div
        className={cn(
          "flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors",
          status === "decorrendo" && "border-green-500 bg-green-50/50",
        )}
      >
        <div className="flex items-center gap-3">
          <div className={cn("w-10 h-10 rounded-full flex items-center justify-center", config.color)}>
            {config.icon}
          </div>
          <div>
            <h3 className="font-medium">{month.descricao}</h3>
            <p className="text-sm text-muted-foreground">
              {month.ReunioesDates.length} {month.ReunioesDates.length === 1 ? "período" : "períodos"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isCompleted && (
            <Badge variant="outline" className="gap-1">
              <CircleCheck className="h-3 w-3" />
              Designações
            </Badge>
          )}
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </div>
      </div>
    </Link>
  )
}

export default function DashboardPage() {
  const { data, error, isLoading, mutate } = useFetch<AnosArray>("ano")
  const [searchTerm, setSearchTerm] = useState("")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Get current year for default accordion selection
  const currentYear = new Date().getFullYear()

  // Memoize the default year index to avoid recalculation
  const defaultYearIndex = useMemo(() => {
    return data?.findIndex((e) => e.ano === currentYear) ?? 0
  }, [data, currentYear])

  // Debounced search handler
  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    // Use a simple debounce to avoid excessive re-renders
    const timeoutId = setTimeout(() => {
      setSearchTerm(value)
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [])

  // Memoize filtered and sorted data
  const processedData = useMemo(() => {
    if (!data) return []

    // First filter by search term
    let filtered = data
    if (searchTerm) {
      filtered = data.filter(
        (year) =>
          year.ano.toString().includes(searchTerm) ||
          year.meses.some((month) => month.descricao.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    // Then sort by year
    return [...filtered].sort((a, b) => {
      return sortOrder === "asc" ? a.ano - b.ano : b.ano - a.ano
    })
  }, [data, searchTerm, sortOrder])

  // Toggle sort order
  const toggleSortOrder = useCallback(() => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
  }, [])

  // Handle successful form submission
  const handleFormSuccess = useCallback(() => {
    mutate()
    setIsDialogOpen(false)
  }, [mutate])

  // Loading states
  if (isLoading) {
    return <DashboardSkeleton />
  }

  // Error state
  if (error) {
    return <DashboardError onRetry={() => mutate()} />
  }

  return (
    <div className="container mx-auto py-8">
      <div className="space-y-6">
        {/* Header with search and actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Designações</h1>
            <p className="text-muted-foreground mt-1">Gerencie as designações por ano e mês</p>
          </div>

          <div className="flex items-center gap-2">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <CalendarPlus className="h-4 w-4" />
                  Adicionar Período
                </Button>
              </DialogTrigger>
              <DialogContent>
                <CardRegisterYearMonths onSuccess={handleFormSuccess} />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Filters and controls */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-muted/40 p-4 rounded-lg border">
          <div className="relative w-full sm:w-auto">
            <Input
              placeholder="Buscar por ano ou mês..."
              defaultValue={searchTerm}
              onChange={handleSearch}
              className="pl-10 w-full sm:w-[300px]"
              aria-label="Buscar por ano ou mês"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleSortOrder}
              className="gap-1"
              aria-label={`Ordenar por ${sortOrder === "asc" ? "mais recente" : "mais antigo"}`}
            >
              <ArrowUpDown className="h-4 w-4" />
              {sortOrder === "asc" ? "Mais recente" : "Mais antigo"}
            </Button>

            <Tabs defaultValue={viewMode} onValueChange={(v) => setViewMode(v as "grid" | "list")}>
              <TabsList className="h-9">
                <TabsTrigger value="grid" className="px-3" aria-label="Visualização em grade">
                  <div className="grid grid-cols-2 gap-0.5 h-4 w-4">
                    <div className="bg-current rounded-sm" />
                    <div className="bg-current rounded-sm" />
                    <div className="bg-current rounded-sm" />
                    <div className="bg-current rounded-sm" />
                  </div>
                </TabsTrigger>
                <TabsTrigger value="list" className="px-3" aria-label="Visualização em lista">
                  <div className="flex flex-col gap-0.5 h-4 w-4 justify-center">
                    <div className="h-0.5 bg-current rounded-full" />
                    <div className="h-0.5 bg-current rounded-full" />
                    <div className="h-0.5 bg-current rounded-full" />
                  </div>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* No results state */}
        {processedData.length === 0 && <EmptyState onAddPeriod={() => setIsDialogOpen(true)} />}

        {/* Years accordion */}
        {processedData.length > 0 && (
          <Accordion
            type="single"
            collapsible
            className="w-full"
            defaultValue={defaultYearIndex !== -1 ? `item-${defaultYearIndex}` : undefined}
          >
            {processedData.map((year, yearIndex) => {
              // Classify months by status (current, past, future)
              const classifiedMonths = classifyMonths(
                year.ano,
                year.meses.map((m) => m.mes),
              )

              return (
                <AccordionItem
                  value={`item-${yearIndex}`}
                  key={year.id}
                  className="border rounded-lg mb-4 overflow-hidden"
                >
                  <AccordionTrigger className="px-4 py-3 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-3 text-left">
                      <Badge variant="outline" className={cn("rounded-full", SetThemeColor(yearIndex % 5))}>
                        {year.ano}
                      </Badge>
                      <span className="font-medium">Designações do Ano {year.ano}</span>
                      <Badge variant="secondary" className="ml-2">
                        {year.meses.length} {year.meses.length === 1 ? "mês" : "meses"}
                      </Badge>
                    </div>
                  </AccordionTrigger>

                  <AccordionContent className="pt-4 pb-6 px-4">
                    {viewMode === "grid" ? (
                      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {year.meses.map((month, monthIndex) => {
                          // Ensure status is one of the valid MonthStatus values
                          const monthStatus = classifiedMonths[monthIndex]?.status || "naoInicializado"
                          return (
                            <MonthCard
                              key={month.id}
                              month={month}
                              year={year}
                              status={monthStatus as MonthStatus}
                              statusConfig={statusConfig}
                            />
                          )
                        })}
                      </div>
                    ) : (
                      <ScrollArea className="h-[400px] pr-4">
                        <div className="space-y-2">
                          {year.meses.map((month, monthIndex) => {
                            // Ensure status is one of the valid MonthStatus values
                            const monthStatus = classifiedMonths[monthIndex]?.status || "naoInicializado"
                            return (
                              <MonthListItem
                                key={month.id}
                                month={month}
                                year={year}
                                status={monthStatus as MonthStatus}
                                statusConfig={statusConfig}
                              />
                            )
                          })}
                        </div>
                      </ScrollArea>
                    )}
                  </AccordionContent>
                </AccordionItem>
              )
            })}
          </Accordion>
        )}
      </div>
    </div>
  )
}

