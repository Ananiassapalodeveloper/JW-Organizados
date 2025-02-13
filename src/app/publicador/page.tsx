"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BookOpen, Users, BookMarked, ClipboardList, UserPlus, CheckCircle2 } from "lucide-react"

export default function PublicadorPage() {
  const [activeTab, setActiveTab] = useState("estudantes")

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Painel do Publicador</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <TabsTrigger value="estudantes" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Estudantes
          </TabsTrigger>
          <TabsTrigger value="pregacao" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Pregação
          </TabsTrigger>
          <TabsTrigger value="estudo-pessoal" className="flex items-center gap-2">
            <BookMarked className="h-4 w-4" />
            Estudo Pessoal
          </TabsTrigger>
          <TabsTrigger value="designacoes" className="flex items-center gap-2">
            <ClipboardList className="h-4 w-4" />
            Designações
          </TabsTrigger>
        </TabsList>

        <TabsContent value="estudantes">
          <GerenciamentoEstudantes />
        </TabsContent>

        <TabsContent value="pregacao">
          <GestaoPregacao />
        </TabsContent>

        <TabsContent value="estudo-pessoal">
          <EstudoPessoal />
        </TabsContent>

        <TabsContent value="designacoes">
          <Designacoes />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function GerenciamentoEstudantes() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Adicionar Novo Estudante</CardTitle>
          <CardDescription>Cadastre os dados do seu estudante</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome Completo</Label>
              <Input id="nome" placeholder="Nome do estudante" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="idade">Idade</Label>
              <Input id="idade" type="number" placeholder="Idade" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sexo">Sexo</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o sexo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="masculino">Masculino</SelectItem>
                  <SelectItem value="feminino">Feminino</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="endereco">Endereço</Label>
              <Input id="endereco" placeholder="Endereço completo" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="livro">Publicação em Estudo</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Selecione a publicação" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="biblia">O que a Bíblia realmente ensina?</SelectItem>
                <SelectItem value="boas-novas">Boas Notícias</SelectItem>
                <SelectItem value="felicidade">O Segredo da Felicidade Familiar</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="licao">Lição Atual</Label>
            <Input id="licao" type="number" placeholder="Número da lição" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="necessidades">Necessidades e Observações</Label>
            <Textarea
              id="necessidades"
              placeholder="Frequência nas reuniões, hábitos a melhorar, etc."
              className="min-h-[100px]"
            />
          </div>

          <Button className="w-full">
            <UserPlus className="mr-2 h-4 w-4" />
            Cadastrar Estudante
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Meus Estudantes</CardTitle>
          <CardDescription>Lista de estudantes ativos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {["João Silva", "Maria Santos"].map((estudante, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 rounded-lg border"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{estudante}</h3>
                    <p className="text-sm text-muted-foreground">O que a Bíblia realmente ensina? - Lição 5</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Atualizar
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function GestaoPregacao() {
//   const [selectedDate, setSelectedDate] = useState<Date>()

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Cronograma de Pregação</CardTitle>
          <CardDescription>Defina seus horários de pregação</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Dias da Semana</Label>
                {["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"].map((dia) => (
                  <div key={dia} className="flex items-center space-x-2 mt-2">
                    <input type="checkbox" id={dia} className="rounded border-gray-300" />
                    <Label htmlFor={dia}>{dia}</Label>
                  </div>
                ))}
              </div>
              <div>
                <Label>Modalidades de Pregação</Label>
                <div className="space-y-2 mt-2">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="casa-em-casa" className="rounded border-gray-300" />
                    <Label htmlFor="casa-em-casa">Casa em Casa</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="informal" className="rounded border-gray-300" />
                    <Label htmlFor="informal">Testemunho Informal</Label>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Horários</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input type="time" placeholder="Horário de início" />
                <Input type="time" placeholder="Horário de término" />
              </div>
            </div>

            <Button className="w-full">
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Salvar Cronograma
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function EstudoPessoal() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestão de Estudo Pessoal</CardTitle>
        <CardDescription>Organize seu estudo pessoal</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Dia Principal de Estudo</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o dia" />
              </SelectTrigger>
              <SelectContent>
                {["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"].map((dia) => (
                  <SelectItem key={dia} value={dia.toLowerCase()}>
                    {dia}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Dia Alternativo</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o dia alternativo" />
              </SelectTrigger>
              <SelectContent>
                {["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"].map((dia) => (
                  <SelectItem key={dia} value={dia.toLowerCase()}>
                    {dia}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Tema de Estudo</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o tema" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="biblia">Estudo da Bíblia</SelectItem>
              <SelectItem value="sentinela">A Sentinela</SelectItem>
              <SelectItem value="ministerio">Nosso Ministério</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Status do Estudo</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="nao-iniciado">Não Iniciado</SelectItem>
              <SelectItem value="em-andamento">Em Andamento</SelectItem>
              <SelectItem value="concluido">Concluído</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Anotações</Label>
          <Textarea placeholder="Faça suas anotações sobre o estudo..." className="min-h-[100px]" />
        </div>

        <Button className="w-full">
          <BookMarked className="mr-2 h-4 w-4" />
          Salvar Progresso
        </Button>
      </CardContent>
    </Card>
  )
}

function Designacoes() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Minhas Designações</CardTitle>
          <CardDescription>Visualize suas designações e trabalhos voluntários</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-3">Designações Teocráticas</h3>
              <div className="space-y-2">
                {[
                  { tipo: "Oração", data: "15/03/2024", reuniao: "Reunião do Meio de Semana" },
                  { tipo: "Leitura da Bíblia", data: "20/03/2024", reuniao: "Reunião do Fim de Semana" },
                ].map((designacao, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-3 rounded-lg border"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{designacao.tipo}</p>
                        <p className="text-sm text-muted-foreground">{designacao.reuniao}</p>
                        <p className="text-sm text-muted-foreground">{designacao.data}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Ver Detalhes
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Trabalhos Voluntários</h3>
              <div className="space-y-2">
                {[
                  { tipo: "Limpeza do Salão", data: "18/03/2024", horario: "09:00" },
                  { tipo: "Vigia - Assembleia", data: "25/03/2024", horario: "14:00" },
                ].map((trabalho, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-3 rounded-lg border"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{trabalho.tipo}</p>
                        <p className="text-sm text-muted-foreground">
                          {trabalho.data} às {trabalho.horario}
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Confirmar Presença
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

