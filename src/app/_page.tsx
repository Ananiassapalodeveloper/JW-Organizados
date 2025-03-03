import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MetricsCard } from "@/components/metrics-card"
import { StatsChart } from "@/components/stats-chart"
import { VaultTable } from "@/components/vault-table"
import { BarChart3, ChevronDown, Globe, Home, LayoutDashboard, LifeBuoy, Settings, Users, Wallet } from "lucide-react"
// import ComoComecar from "./ComoComecar"
export default function Page() {
  return (
    <div className="min-h-screen dark:bg-[var(--background)] text-white bg-white">
      {/* <ComoComecar/> */}
      <div className="grid lg:grid-cols-[280px_1fr]">
        <aside className="border-r bg-background/50 backdrop-blur">
          <div className="flex h-16 items-center gap-2 border-b px-6">
            {/* <Wallet className="h-6 w-6" /> */}
            <Users className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2" />
            <span className="font-bold">Organizado</span>
          </div>
          <div className="px-4 py-4">
            <Input placeholder="Search" className="bg-background/50" />
          </div>

          <nav className="space-y-2 px-2">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <BarChart3 className="h-4 w-4" />
              Designações
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Globe className="h-4 w-4" />
              Privilégios
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Home className="h-4 w-4" />
              Estudos
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Wallet className="h-4 w-4" />
              Pregação
              <ChevronDown className="ml-auto h-4 w-4" />
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <LifeBuoy className="h-4 w-4" />
              Support
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Settings className="h-4 w-4" />
              Configurações
            </Button>
          </nav>
        </aside>
        <main className="p-6">
          <div className="mb-6 flex items-center justify-between">
            <div className="space-y-1">
              <h1 className="text-2xl font-bold">{`Visão geral `} </h1>
              <div className="text-sm text-muted-foreground">Aug 13, 2023 - Aug 18, 2023</div>
            </div>
            <Button variant="outline" className="gap-2">
              Tema
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <MetricsCard
              title="Total de Publicadores"
              value="AOA 5000"
              change={{ value: "AOA 52", percentage: "+2.1%", isPositive: false }}
            />
            <MetricsCard
              title="Contas"
              value="AOA 54,892"
              change={{ value: "AOA 1,340", percentage: "+13.2%", isPositive: true }}
            />
            <MetricsCard
              title="Dispesas"
              value="AOA 3000"
              change={{ value: "54,08", percentage: "+1.2%", isPositive: false }}
            />
          </div>
          <Card className="mt-6 p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Estatíscticas gerais</h2>
              <div className="flex gap-2">
                <Button size="sm" variant="ghost">
                  Hoje
                </Button>
                <Button size="sm" variant="ghost">
                  Última mês
                </Button>
                <Button size="sm" variant="ghost">
                  Último 2 meses
                </Button>
                <Button size="sm" variant="ghost">
                  Último 3 mês
                </Button>
                <Button size="sm" variant="ghost">
                  Ano
                </Button>
              </div>
            </div>
            <StatsChart />
          </Card>
          <div className="mt-6">
            <VaultTable />
          </div>
        </main>
      </div>
    </div>
  )
}

