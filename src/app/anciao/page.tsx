"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Brush,
  Shield,
  Wrench,
  Headphones,
  Calculator,
  BookOpen,
  MapPin,
  PenTool,
  PlayIcon as Pray,
  Mic,
  Book,
  MessageSquare,
  DollarSign,
  Plus,
  Building2,
  PartyPopper,
} from "lucide-react"

export default function AnciaoPage() {
  const [activeTab, setActiveTab] = useState("trabalhos")

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Painel do Ancião</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          <TabsTrigger value="trabalhos" className="flex items-center gap-2">
            <Brush className="h-4 w-4" />
            Trabalhos Voluntários
          </TabsTrigger>
          <TabsTrigger value="privilegios" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Privilégios
          </TabsTrigger>
          <TabsTrigger value="designacoes" className="flex items-center gap-2">
            <PenTool className="h-4 w-4" />
            Designações
          </TabsTrigger>
        </TabsList>

        <TabsContent value="trabalhos">
          <TrabalhosVoluntarios />
        </TabsContent>

        <TabsContent value="privilegios">
          <Privilegios />
        </TabsContent>

        <TabsContent value="designacoes">
          <Designacoes />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function TrabalhosVoluntarios() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Limpeza e Manutenção</CardTitle>
          <CardDescription>Organize trabalhos de limpeza e manutenção</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Local</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o local" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="salao">Salão do Reino</SelectItem>
                <SelectItem value="assembleia">Salão de Assembleia</SelectItem>
                <SelectItem value="congresso">Salão de Congresso</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Data</Label>
              <Input type="date" />
            </div>
            <div className="space-y-2">
              <Label>Horário</Label>
              <Input type="time" />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Observações</Label>
            <Textarea placeholder="Detalhes sobre o trabalho..." />
          </div>

          <Button className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            Criar Trabalho
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contribuições</CardTitle>
          <CardDescription>Gerenciar necessidades financeiras</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Finalidade</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Selecione a finalidade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="superintendente">Visita do Superintendente</SelectItem>
                <SelectItem value="salao">Salão do Reino</SelectItem>
                <SelectItem value="irmao">Ajuda a um Irmão</SelectItem>
                <SelectItem value="outros">Outros</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Valor Necessário</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="number" className="pl-9" placeholder="0.00" />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Descrição</Label>
            <Textarea placeholder="Detalhes sobre a necessidade..." />
          </div>

          <Button className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            Criar Solicitação
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recreação</CardTitle>
          <CardDescription>Organizar eventos recreativos</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Tipo de Evento</Label>
            <Input placeholder="Nome do evento" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Data</Label>
              <Input type="date" />
            </div>
            <div className="space-y-2">
              <Label>Data Alternativa</Label>
              <Input type="date" />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Local</Label>
            <Input placeholder="Endereço do evento" />
          </div>

          <div className="space-y-2">
            <Label>Necessidades</Label>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="cozinha" />
                <Label htmlFor="cozinha">Cozinha</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="som" />
                <Label htmlFor="som">Som</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="musica" />
                <Label htmlFor="musica">Música</Label>
              </div>
            </div>
          </div>

          <Button className="w-full">
            <PartyPopper className="mr-2 h-4 w-4" />
            Criar Evento
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

function Privilegios() {
  const privilegios = [
    { icon: Wrench, titulo: "Trabalhos Mecânicos", descricao: "Manutenção e reparos" },
    { icon: Headphones, titulo: "Áudio", descricao: "Sistema de som" },
    { icon: Calculator, titulo: "Contas", descricao: "Gestão financeira" },
    { icon: BookOpen, titulo: "Literaturas", descricao: "Gestão de publicações" },
    { icon: MapPin, titulo: "Indicadores", descricao: "Orientação no salão" },
    { icon: Building2, titulo: "Quarto de Banho", descricao: "Manutenção" },
  ]

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {privilegios.map((privilegio, index) => (
        <Dialog key={index}>
          <DialogTrigger asChild>
            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <privilegio.icon className="h-5 w-5 text-primary" />
                  <CardTitle>{privilegio.titulo}</CardTitle>
                </div>
                <CardDescription>{privilegio.descricao}</CardDescription>
              </CardHeader>
            </Card>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Atribuir {privilegio.titulo}</DialogTitle>
              <DialogDescription>Selecione os irmãos para este privilégio</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Responsável Principal</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um irmão" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="joao">João Silva</SelectItem>
                    <SelectItem value="pedro">Pedro Santos</SelectItem>
                    <SelectItem value="jose">José Oliveira</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Ajudantes</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione os ajudantes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="paulo">Paulo Costa</SelectItem>
                    <SelectItem value="lucas">Lucas Ferreira</SelectItem>
                    <SelectItem value="mateus">Mateus Lima</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Observações</Label>
                <Textarea placeholder="Instruções ou observações específicas..." />
              </div>
              <Button className="w-full">Confirmar Atribuição</Button>
            </div>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  )
}

function Designacoes() {
  const designacoes = [
    { icon: Pray, titulo: "Oração Inicial/Final", tipo: "oracao" },
    { icon: Book, titulo: "Leitura da Bíblia", tipo: "leitura" },
    { icon: Mic, titulo: "Discursos", tipo: "discurso" },
    { icon: MessageSquare, titulo: "Apresentações", tipo: "apresentacao" },
    { icon: BookOpen, titulo: "Estudo do Livro", tipo: "estudo" },
  ]

  return (
    <div className="space-y-6">
      {designacoes.map((designacao, index) => (
        <Card key={index}>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <designacao.icon className="h-5 w-5 text-primary" />
              <CardTitle>{designacao.titulo}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Publicador</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um publicador" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="joao">João Silva</SelectItem>
                      <SelectItem value="maria">Maria Santos</SelectItem>
                      <SelectItem value="pedro">Pedro Oliveira</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Data</Label>
                  <Input type="date" />
                </div>

                {designacao.tipo === "discurso" && (
                  <div className="space-y-2">
                    <Label>Tipo de Discurso</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="perolas">Pérolas Espirituais</SelectItem>
                        <SelectItem value="necessidades">Necessidades Locais</SelectItem>
                        <SelectItem value="outros">Outros</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {designacao.tipo === "apresentacao" && (
                  <div className="space-y-2">
                    <Label>Tipo de Apresentação</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="interesse">Cultivar Interesse</SelectItem>
                        <SelectItem value="conversa">Iniciar Conversa</SelectItem>
                        <SelectItem value="crenca">Explicar Crença</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label>Observações</Label>
                <Textarea placeholder="Instruções ou observações específicas..." />
              </div>

              <Button className="w-full sm:w-auto">
                <Plus className="mr-2 h-4 w-4" />
                Atribuir Designação
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

