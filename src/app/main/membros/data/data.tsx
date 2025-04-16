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

export const posicoes = [
  {
    value: "AJUDANTE",
    label: "Ajudante",
  },
  {
    value: "DIRIGENTE",
    label: "servo",
  }
]



export const estados = [
  {
    value: "MATRICULADO",
    label: "Matricalado",
    icon: CircleOff
  },
  {
    value: "ASSOCIADO",
    label: "Associado",
    icon: HelpCircle,
  },
  {
    value: "BATIZADO",
    label: "Baptizado",
    icon: Circle,
  }
]

export const carreira = [
  {
    value: "PIONEIRO_AUXILIAR",
    label: "Auxiliar",
    icon: Timer
  },
  {
    value: "PIONEIRO_REGULAR",
    label: "Regular",
    icon: CheckCircle,
  }
]

export const Grupos = [
  {
    value: "grupo 1",
    label: "Grupo 1",
  },
  {
    value: "grupo 2",
    label: "Grupo 2",
  },
  {
    value: "grupo 3",
    label: "Grupo 3",
  }
]

export const Dadiva = [
  {
    value: "ANCIAO",
    label: "Ancião"
  },
  {
    value: "SERVO_MINISTERIAL",
    label: "Servo Ministerial",
  }
]

export const privilegioServicos = [
  {
    label: "Contas",
    value: "CONTAS",
    icon: ArrowDown
  },
  {
    label: "Literatura",
    value: "LITERATURA",
    icon: ArrowRight,

  },
  {
    label: "Território",
    value: "TERRITORIO",
    icon: ArrowUp
  },
  {
    label: "Manutenção",
    value: "MANUTENCAO",
    icon: ArrowRight
  },
  {
    label: "Som",
    value: "SOM_AUDIO",
    icon: ArrowUp,
  },
]

export const SEXO = [
  {
    label: "M",
    value: "M",
  },
  {
    label: "F",
    value: "F",
  },
]




export const Members = [
  {
    id: `Member${Math.floor(Math.random() * 200) + 1}`,
    posicoes: "ajudante",
    estados: "baptizado",
    privilegioServicos: "contas",
    generos: "m",
    carreiras: "",
    funcoes: "anciao",

    nome: "Ernesto Nhanga",

    email: "ErnestoNhanga@example.com",
    subject: "Re: Relatório",
    text: "Dirigi 5 estudos bíblicos.\n\n Fiz 100h na pregação.\n\n Modalidades como pregação de casa em casa, carrinho, carta e testemunho informal\n\n Foi realmente muito produtivo",
    date: "2025-10-22T10:30:00",
    read: true,
    labels: ["carrinho", "informal"]
  },
  {
    id: `${Math.floor(Math.random() * 200) + 1}`,
    posicoes: "ajudante",
    estados: "baptizado",
    privilegioServicos: "manutencao",
    generos: "m",
    carreiras: "auxilair",
    funcoes: "anciao",

    nome: "André Vinho",

    email: "@example.com",
    subject: "Re: Relatório",
    text: "Dirigi 5 estudos bíblicos.\n\n Fiz 100h na pregação.\n\n Modalidades como pregação de casa em casa, carrinho, carta e testemunho informal\n\n Foi realmente muito produtivo",
    date: "2023-10-22T10:30:00",
    read: true,
    labels: ["carrinho", "informal"]
  },
  {
    generos: "m",
    carreiras: "",

    nome: "Nguza Dala",
    id: `${Math.floor(Math.random() * 200) + 1}`,
    estados: "baptizado",
    posicoes: "ajudante",
    privilegioServicos: "manutencao",
    funcoes: "anciao",


    email: "@example.com",
    subject: "Re: Relatório",
    text: "Dirigi 5 estudos bíblicos.\n\n Fiz 100h na pregação.\n\n Modalidades como pregação de casa em casa, carrinho, carta e testemunho informal\n\n Foi realmente muito produtivo",
    date: "2023-10-22T10:30:00",
    read: true,
    labels: ["carrinho", "informal"]
  },
  {
    id: `${Math.floor(Math.random() * 200) + 1}`,
    posicoes: "ajudante",
    estados: "baptizado",
    privilegioServicos: "manutencao",
    generos: "m",
    carreiras: "auxliar",

    nome: "Leonildo Cabila",

    email: "@example.com",
    subject: "Re: Relatório",
    text: "Dirigi 5 estudos bíblicos.\n\n Fiz 100h na pregação.\n\n Modalidades como pregação de casa em casa, carrinho, carta e testemunho informal\n\n Foi realmente muito produtivo",
    date: "2023-10-22T10:30:00",
    read: false,
    labels: ["carrinho", "informal"]
  },
  {
    id: `${Math.floor(Math.random() * 200) + 1}`,
    posicoes: "ajudante",
    estados: "baptizado",
    privilegioServicos: "territorio",
    generos: "m",
    carreiras: "auxiliar",
    funcoes: "",

    nome: "Teodor Upale",

    email: "@example.com",
    subject: "Re: Relatório",
    text: "Dirigi 5 estudos bíblicos.\n\n Fiz 100h na pregação.\n\n Modalidades como pregação de casa em casa, carrinho, carta e testemunho informal\n\n Foi realmente muito produtivo",
    date: "2023-10-22T10:30:00",
    read: true,
    labels: ["carrinho", "informal"]
  },
  {
    id: `${Math.floor(Math.random() * 200) + 1}`,
    posicoes: "",
    estados: "baptizado",
    privilegioServicos: "",
    generos: "m",
    carreiras: "",
    funcoes: "",

    nome: "Domingos Crusso",

    email: "@example.com",
    subject: "Re: Relatório",
    text: "Dirigi 5 estudos bíblicos.\n\n Fiz 100h na pregação.\n\n Modalidades como pregação de casa em casa, carrinho, carta e testemunho informal\n\n Foi realmente muito produtivo",
    date: "2023-10-22T10:30:00",
    read: false,
    labels: ["carrinho", "informal"]
  },
  {
    id: `${Math.floor(Math.random() * 200) + 1}`,
    posicoes: "servo",
    estados: "baptizado",
    privilegioServicos: "manutencao",
    generos: "m",
    carreiras: "auxiliar",
    funcoes: "",

    nome: "Victoriano Domingos",

    email: "@example.com",
    subject: "Re: Relatório",
    text: "Dirigi 5 estudos bíblicos.\n\n Fiz 100h na pregação.\n\n Modalidades como pregação de casa em casa, carrinho, carta e testemunho informal\n\n Foi realmente muito produtivo",
    date: "2023-10-22T10:30:00",
    read: false,
    labels: ["carrinho", "informal"]
  },
  {
    id: `${Math.floor(Math.random() * 200) + 1}`,
    posicoes: "servo",
    estados: "servo",
    privilegioServicos: "contas",
    generos: "m",
    carreiras: "auxiliar",
    funcoes: "servo",

    nome: "Abel Gonga",

    email: "@example.com",
    subject: "Re: Relatório",
    text: "Dirigi 5 estudos bíblicos.\n\n Fiz 100h na pregação.\n\n Modalidades como pregação de casa em casa, carrinho, carta e testemunho informal\n\n Foi realmente muito produtivo",
    date: "2023-10-22T10:30:00",
    read: false,
    labels: ["carrinho", "informal"]
  },
  {
    id: `${Math.floor(Math.random() * 200) + 1}`,
    posicoes: "",
    estados: "associado",
    privilegioServicos: "",
    generos: "m",
    carreiras: "",
    funcoes: "",

    nome: "Carlos Ernesto",

    email: "@example.com",
    subject: "Re: Relatório",
    text: "Dirigi 5 estudos bíblicos.\n\n Fiz 100h na pregação.\n\n Modalidades como pregação de casa em casa, carrinho, carta e testemunho informal\n\n Foi realmente muito produtivo",
    date: "2023-10-22T10:30:00",
    read: false,
    labels: ["carrinho", "informal"]
  },
  {
    id: `${Math.floor(Math.random() * 200) + 1}`,
    posicoes: "ajudante",
    estados: "baptizado",
    privilegioServicos: "som",
    generos: "m",
    carreiras: "auxiliar",
    funcoes: "",

    nome: "Fernandes Joaquim",

    email: "@example.com",
    subject: "Re: Relatório",
    text: "Dirigi 5 estudos bíblicos.\n\n Fiz 100h na pregação.\n\n Modalidades como pregação de casa em casa, carrinho, carta e testemunho informal\n\n Foi realmente muito produtivo",
    date: "2023-10-22T10:30:00",
    read: true,
    labels: ["carrinho", "informal"]
  },
  {
    id: `${Math.floor(Math.random() * 200) + 1}`,
    posicoes: "",
    estados: "associado",
    privilegioServicos: "",
    generos: "m",
    carreiras: "",
    funcoes: "",

    nome: "Jeovane Ernesto",

    email: "@example.com",
    subject: "Re: Relatório",
    text: "Dirigi 5 estudos bíblicos.\n\n Fiz 100h na pregação.\n\n Modalidades como pregação de casa em casa, carrinho, carta e testemunho informal\n\n Foi realmente muito produtivo",
    date: "2023-10-22T10:30:00",
    read: false,
    labels: ["carrinho", "informal"]
  },
  {
    id: `${Math.floor(Math.random() * 200) + 1}`,
    posicoes: "servo",
    estados: "baptizado",
    privilegioServicos: "territorio",
    generos: "m",
    carreiras: "regular",
    funcoes: "",

    nome: "Joaquim Maquengo",

    email: "@example.com",
    subject: "Re: Relatório",
    text: "Dirigi 5 estudos bíblicos.\n\n Fiz 100h na pregação.\n\n Modalidades como pregação de casa em casa, carrinho, carta e testemunho informal\n\n Foi realmente muito produtivo",
    date: "2023-10-22T10:30:00",
    read: true,
    labels: ["carrinho", "informal"]
  },
  {
    generos: "m",
    carreiras: "auxiliar",
    funcoes: "anciao",

    nome: "Valentim Quiluluta",
    id: `${Math.floor(Math.random() * 200) + 1}`,
    posicoes: "ajudante",
    estados: "anciao",
    privilegioServicos: "contas",

    email: "@example.com",
    subject: "Re: Relatório",
    text: "Dirigi 5 estudos bíblicos.\n\n Fiz 100h na pregação.\n\n Modalidades como pregação de casa em casa, carrinho, carta e testemunho informal\n\n Foi realmente muito produtivo",
    date: "2023-10-22T10:30:00",
    read: false,
    labels: ["carrinho", "informal"]
  },
  {
    generos: "m",
    carreiras: "auxiliar",
    funcoes: "anciao",

    nome: "Milton António",
    id: `${Math.floor(Math.random() * 200) + 1}`,
    posicoes: "ajudante",
    estados: "baptizado",
    privilegioServicos: "som",

    email: "@example.com",
    subject: "Re: Relatório",
    text: "Dirigi 5 estudos bíblicos.\n\n Fiz 100h na pregação.\n\n Modalidades como pregação de casa em casa, carrinho, carta e testemunho informal\n\n Foi realmente muito produtivo",
    date: "2023-10-22T10:30:00",
    read: false,
    labels: ["carrinho", "informal"]
  },
  {
    generos: "m",
    carreiras: "",
    funcoes: "",

    nome: "Adão Canda",
    id: `${Math.floor(Math.random() * 200) + 1}`,
    posicoes: "ajudante",
    estados: "baptizado",
    privilegioServicos: "literatura",

    email: "@example.com",
    subject: "Re: Relatório",
    text: "Dirigi 5 estudos bíblicos.\n\n Fiz 100h na pregação.\n\n Modalidades como pregação de casa em casa, carrinho, carta e testemunho informal\n\n Foi realmente muito produtivo",
    date: "2023-10-22T10:30:00",
    read: true,
    labels: ["carrinho", "informal"]
  },
  {
    generos: "m",
    carreiras: "auxiliar",
    funcoes: "",

    nome: "Ananias Sapalo",
    id: `${Math.floor(Math.random() * 200) + 1}`,
    posicoes: "ajudante",
    estados: "baptizado",
    privilegioServicos: "conta",

    email: "@example.com",
    subject: "Re: Relatório",
    text: "Dirigi 5 estudos bíblicos.\n\n Fiz 100h na pregação.\n\n Modalidades como pregação de casa em casa, carrinho, carta e testemunho informal\n\n Foi realmente muito produtivo",
    date: "2023-10-22T10:30:00",
    read: true,
    labels: ["carrinho", "informal"]
  },
  {
    generos: "m",
    carreiras: "auxilair",
    funcoes: "",

    nome: "Eduardo Macoxi",
    id: `${Math.floor(Math.random() * 200) + 1}`,
    posicoes: "ajudante",
    estados: "baptizado",
    privilegioServicos: "literatura",

    email: "@example.com",
    subject: "Re: Relatório",
    text: "Dirigi 5 estudos bíblicos.\n\n Fiz 100h na pregação.\n\n Modalidades como pregação de casa em casa, carrinho, carta e testemunho informal\n\n Foi realmente muito produtivo",
    date: "2023-10-22T10:30:00",
    read: false,
    labels: ["carrinho", "informal"]
  },
  {
    generos: "m",
    carreiras: "",
    funcoes: "",

    nome: "Manuel Tomás",
    id: `${Math.floor(Math.random() * 200) + 1}`,
    posicoes: "",
    estados: "Publicador não Baptizado",
    privilegioServicos: "",

    email: "@example.com",
    subject: "Re: Relatório",
    text: "Dirigi 5 estudos bíblicos.\n\n Fiz 100h na pregação.\n\n Modalidades como pregação de casa em casa, carrinho, carta e testemunho informal\n\n Foi realmente muito produtivo",
    date: "2023-10-22T10:30:00",
    read: false,
    labels: ["carrinho", "informal"]
  },
  {
    generos: "m",
    carreiras: "auxiliar",
    funcoes: "",

    nome: "Walter Macoxi",
    id: `${Math.floor(Math.random() * 200) + 1}`,
    posicoes: "ajudante",
    estados: "baptizado",
    privilegioServicos: "som",

    email: "@example.com",
    subject: "Re: Relatório",
    text: "Dirigi 5 estudos bíblicos.\n\n Fiz 100h na pregação.\n\n Modalidades como pregação de casa em casa, carrinho, carta e testemunho informal\n\n Foi realmente muito produtivo",
    date: "2023-10-22T10:30:00",
    read: false,
    labels: ["carrinho", "informal"]
  },
  {
    id: `${Math.floor(Math.random() * 200) + 1}`,
    estados: "baptizado",
    generos: "f",
    carreiras: "auxiliar",

    nome: "Elisa Pessoa",

    email: "@example.com",
    subject: "Re: Relatório",
    text: "Dirigi 5 estudos bíblicos.\n\n Fiz 100h na pregação.\n\n Modalidades como pregação de casa em casa, carrinho, carta e testemunho informal\n\n Foi realmente muito produtivo",
    date: "2023-10-22T10:30:00",
    read: false,
    labels: ["carrinho", "informal"]
  },
  {
    generos: "f",

    nome: "Emília Sampaio",
    id: `${Math.floor(Math.random() * 200) + 1}`,
    estados: "baptizado",

    email: "@example.com",
    subject: "Re: Relatório",
    text: "Dirigi 5 estudos bíblicos.\n\n Fiz 100h na pregação.\n\n Modalidades como pregação de casa em casa, carrinho, carta e testemunho informal\n\n Foi realmente muito produtivo",
    date: "2023-10-22T10:30:00",
    read: true,
    labels: ["carrinho", "informal"]
  },
  {
    generos: "f",

    nome: "Fátima Zangui",
    id: `${Math.floor(Math.random() * 200) + 1}`,
    estados: "baptizado",

    email: "@example.com",
    subject: "Re: Relatório",
    text: "Dirigi 5 estudos bíblicos.\n\n Fiz 100h na pregação.\n\n Modalidades como pregação de casa em casa, carrinho, carta e testemunho informal\n\n Foi realmente muito produtivo",
    date: "2023-10-22T10:30:00",
    read: true,
    labels: ["carrinho", "informal"]
  },
  {
    generos: "f",

    nome: "Joana Balanga",
    id: `${Math.floor(Math.random() * 200) + 1}`,
    estados: "baptizado",

    email: "@example.com",
    subject: "Re: Relatório",
    text: "Dirigi 5 estudos bíblicos.\n\n Fiz 100h na pregação.\n\n Modalidades como pregação de casa em casa, carrinho, carta e testemunho informal\n\n Foi realmente muito produtivo",
    date: "2023-10-22T10:30:00",
    read: true,
    labels: ["carrinho", "informal"]
  },
  {
    generos: "f",
    carreiras: "regular",

    nome: "Leusia Fina",
    id: `${Math.floor(Math.random() * 200) + 1}`,
    estados: "baptizado",

    email: "@example.com",
    subject: "Re: Relatório",
    text: "Dirigi 5 estudos bíblicos.\n\n Fiz 100h na pregação.\n\n Modalidades como pregação de casa em casa, carrinho, carta e testemunho informal\n\n Foi realmente muito produtivo",
    date: "2023-10-22T10:30:00",
    read: true,
    labels: ["carrinho", "informal"]
  },
  {
    generos: "f",
    carreiras: "regular",

    nome: "Madalena Manuel",
    id: `${Math.floor(Math.random() * 200) + 1}`,
    estados: "baptizado",

    email: "@example.com",
    subject: "Re: Relatório",
    text: "Dirigi 5 estudos bíblicos.\n\n Fiz 100h na pregação.\n\n Modalidades como pregação de casa em casa, carrinho, carta e testemunho informal\n\n Foi realmente muito produtivo",
    date: "2023-10-22T10:30:00",
    read: true,
    labels: ["carrinho", "informal"]
  },
  {
    generos: "f",
    carreiras: "auxiliar",

    nome: "Marcelina Quisssunda",
    id: `${Math.floor(Math.random() * 200) + 1}`,
    estados: "baptizado",

    email: "@example.com",
    subject: "Re: Relatório",
    text: "Dirigi 5 estudos bíblicos.\n\n Fiz 100h na pregação.\n\n Modalidades como pregação de casa em casa, carrinho, carta e testemunho informal\n\n Foi realmente muito produtivo",
    date: "2023-10-22T10:30:00",
    read: true,
    labels: ["carrinho", "informal"]
  },
  {
    generos: "f",
    carreiras: "regular",

    nome: "Neusa António",
    id: `${Math.floor(Math.random() * 200) + 1}`,
    estados: "baptizado",

    email: "@example.com",
    subject: "Re: Relatório",
    text: "Dirigi 5 estudos bíblicos.\n\n Fiz 100h na pregação.\n\n Modalidades como pregação de casa em casa, carrinho, carta e testemunho informal\n\n Foi realmente muito produtivo",
    date: "2023-10-22T10:30:00",
    read: true,
    labels: ["carrinho", "informal"]
  },
  {
    generos: "f",
    carreiras: "",

    nome: "Teresa Eduardo",
    id: `${Math.floor(Math.random() * 200) + 1}`,
    estados: "baptizado",

    email: "@example.com",
    subject: "Re: Relatório",
    text: "Dirigi 5 estudos bíblicos.\n\n Fiz 100h na pregação.\n\n Modalidades como pregação de casa em casa, carrinho, carta e testemunho informal\n\n Foi realmente muito produtivo",
    date: "2023-10-22T10:30:00",
    read: true,
    labels: ["carrinho", "informal"]
  },
  {
    id: `${Math.floor(Math.random() * 200) + 1}`,
    estados: "baptizado",
    generos: "f",
    carreiras: "regular",

    nome: "Jucelma Fernandes",

    email: "@example.com",
    subject: "Re: Relatório",
    text: "Dirigi 5 estudos bíblicos.\n\n Fiz 100h na pregação.\n\n Modalidades como pregação de casa em casa, carrinho, carta e testemunho informal\n\n Foi realmente muito produtivo",
    date: "2023-10-22T10:30:00",
    read: true,
    labels: ["carrinho", "informal"]
  },
  {
    id: `${Math.floor(Math.random() * 200) + 1}`,
    estados: "baptizado",
    generos: "f",
    carreiras: "auxiliar",

    nome: "Laurinda Fernandes",

    email: "@example.com",
    subject: "Re: Relatório",
    text: "Dirigi 5 estudos bíblicos.\n\n Fiz 100h na pregação.\n\n Modalidades como pregação de casa em casa, carrinho, carta e testemunho informal\n\n Foi realmente muito produtivo",
    date: "2023-10-22T10:30:00",
    read: true,
    labels: ["carrinho", "informal"]
  },
  {
    id: `${Math.floor(Math.random() * 200) + 1}`,
    estados: "associada",
    generos: "f",

    nome: "Maria de Fátima",

    email: "@example.com",
    subject: "Re: Relatório",
    text: "Dirigi 5 estudos bíblicos.\n\n Fiz 100h na pregação.\n\n Modalidades como pregação de casa em casa, carrinho, carta e testemunho informal\n\n Foi realmente muito produtivo",
    date: "2023-10-22T10:30:00",
    read: true,
    labels: ["carrinho", "informal"]
  },
  {
    id: `${Math.floor(Math.random() * 200) + 1}`,
    estados: "baptizado",
    generos: "f",

    nome: "Maria Romão",

    email: "@example.com",
    subject: "Re: Relatório",
    text: "Dirigi 5 estudos bíblicos.\n\n Fiz 100h na pregação.\n\n Modalidades como pregação de casa em casa, carrinho, carta e testemunho informal\n\n Foi realmente muito produtivo",
    date: "2023-10-22T10:30:00",
    read: true,
    labels: ["carrinho", "informal"]
  },
  {
    id: `${Math.floor(Math.random() * 200) + 1}`,
    estados: "associada",
    generos: "f",
    carreiras: "",

    nome: "Noémia José",

    email: "@example.com",
    subject: "Re: Relatório",
    text: "Dirigi 5 estudos bíblicos.\n\n Fiz 100h na pregação.\n\n Modalidades como pregação de casa em casa, carrinho, carta e testemunho informal\n\n Foi realmente muito produtivo",
    date: "2023-10-22T10:30:00",
    read: true,
    labels: ["carrinho", "informal"]
  },
  {
    id: `${Math.floor(Math.random() * 200) + 1}`,
    estados: "baptizado",
    generos: "f",

    nome: "Rosa Crusso",

    email: "@example.com",
    subject: "Re: Relatório",
    text: "Dirigi 5 estudos bíblicos.\n\n Fiz 100h na pregação.\n\n Modalidades como pregação de casa em casa, carrinho, carta e testemunho informal\n\n Foi realmente muito produtivo",
    date: "2023-10-22T10:30:00",
    read: true,
    labels: ["carrinho", "informal"]
  },
  {
    id: `${Math.floor(Math.random() * 200) + 1}`,
    estados: "baptizado",
    generos: "f",
    carreiras: "auxilair",

    nome: "Suzeth Nhanga",

    email: "@example.com",
    subject: "Re: Relatório",
    text: "Dirigi 5 estudos bíblicos.\n\n Fiz 100h na pregação.\n\n Modalidades como pregação de casa em casa, carrinho, carta e testemunho informal\n\n Foi realmente muito produtivo",
    date: "2023-10-22T10:30:00",
    read: true,
    labels: ["carrinho", "informal"]
  },
  {
    id: `${Math.floor(Math.random() * 200) + 1}`,
    estados: "baptizado",
    generos: "f",

    nome: "Teresa Osório",

    email: "@example.com",
    subject: "Re: Relatório",
    text: "Dirigi 5 estudos bíblicos.\n\n Fiz 100h na pregação.\n\n Modalidades como pregação de casa em casa, carrinho, carta e testemunho informal\n\n Foi realmente muito produtivo",
    date: "2023-10-22T10:30:00",
    read: true,
    labels: ["carrinho", "informal"]
  },
  {
    id: `${Math.floor(Math.random() * 200) + 1}`,
    estados: "associado",
    generos: "f",
    carreiras: "",

    nome: "Vanda Osório",

    email: "@example.com",
    subject: "Re: Relatório",
    text: "Dirigi 5 estudos bíblicos.\n\n Fiz 100h na pregação.\n\n Modalidades como pregação de casa em casa, carrinho, carta e testemunho informal\n\n Foi realmente muito produtivo",
    date: "2023-10-22T10:30:00",
    read: true,
    labels: ["carrinho", "informal"]
  },
  {
    id: `${Math.floor(Math.random() * 200) + 1}`,
    estados: "baptizado",
    generos: "f",
    carreiras: "auxiliar",

    nome: "Isabel Manuel",

    email: "@example.com",
    subject: "Re: Relatório",
    text: "Dirigi 5 estudos bíblicos.\n\n Fiz 100h na pregação.\n\n Modalidades como pregação de casa em casa, carrinho, carta e testemunho informal\n\n Foi realmente muito produtivo",
    date: "2023-10-22T10:30:00",
    read: true,
    labels: ["carrinho", "informal"]
  },
  {
    generos: "f",

    nome: "Adelina Francisco",
    id: `${Math.floor(Math.random() * 200) + 1}`,
    estados: "baptizado",

    email: "@example.com",
    subject: "Re: Relatório",
    text: "Dirigi 5 estudos bíblicos.\n\n Fiz 100h na pregação.\n\n Modalidades como pregação de casa em casa, carrinho, carta e testemunho informal\n\n Foi realmente muito produtivo",
    date: "2023-10-22T10:30:00",
    read: true,
    labels: ["carrinho", "informal"]
  },
  {
    generos: "f",
    carreiras: "associado",

    nome: "Armanda Álvaro",
    id: `${Math.floor(Math.random() * 200) + 1}`,
    estados: "baptizado",

    email: "@example.com",
    subject: "Re: Relatório",
    text: "Dirigi 5 estudos bíblicos.\n\n Fiz 100h na pregação.\n\n Modalidades como pregação de casa em casa, carrinho, carta e testemunho informal\n\n Foi realmente muito produtivo",
    date: "2023-10-22T10:30:00",
    read: true,
    labels: ["carrinho", "informal"]
  },
  {
    generos: "f",
    carreiras: "regular",

    nome: "Cátia Cabonda",
    id: `${Math.floor(Math.random() * 200) + 1}`,
    estados: "baptizado",

    email: "@example.com",
    subject: "Re: Relatório",
    text: "Dirigi 5 estudos bíblicos.\n\n Fiz 100h na pregação.\n\n Modalidades como pregação de casa em casa, carrinho, carta e testemunho informal\n\n Foi realmente muito produtivo",
    date: "2023-10-22T10:30:00",
    read: true,
    labels: ["carrinho", "informal"]
  },
  {
    generos: "f",

    nome: "Conceição Manuel",
    id: `${Math.floor(Math.random() * 200) + 1}`,
    estados: "baptizado",

    email: "@example.com",
    subject: "Re: Relatório",
    text: "Dirigi 5 estudos bíblicos.\n\n Fiz 100h na pregação.\n\n Modalidades como pregação de casa em casa, carrinho, carta e testemunho informal\n\n Foi realmente muito produtivo",
    date: "2023-10-22T10:30:00",
    read: true,
    labels: ["carrinho", "informal"]
  },
  {
    generos: "f",

    nome: "Ducelina Macana",
    id: `${Math.floor(Math.random() * 200) + 1}`,
    estados: "associado",

    email: "@example.com",
    subject: "Re: Relatório",
    text: "Dirigi 5 estudos bíblicos.\n\n Fiz 100h na pregação.\n\n Modalidades como pregação de casa em casa, carrinho, carta e testemunho informal\n\n Foi realmente muito produtivo",
    date: "2023-10-22T10:30:00",
    read: true,
    labels: ["carrinho", "informal"]
  },
  {
    generos: "f",
    carreiras: "regular",

    nome: "Josefina Catala",
    id: `${Math.floor(Math.random() * 200) + 1}`,
    estados: "baptizado",

    email: "@example.com",
    subject: "Re: Relatório",
    text: "Dirigi 5 estudos bíblicos.\n\n Fiz 100h na pregação.\n\n Modalidades como pregação de casa em casa, carrinho, carta e testemunho informal\n\n Foi realmente muito produtivo",
    date: "2023-10-22T10:30:00",
    read: true,
    labels: ["carrinho", "informal"]
  },
  {
    generos: "f",

    nome: "Julieta Manuel",
    id: `${Math.floor(Math.random() * 200) + 1}`,
    estados: "baptizado",

    email: "@example.com",
    subject: "Re: Relatório",
    text: "Dirigi 5 estudos bíblicos.\n\n Fiz 100h na pregação.\n\n Modalidades como pregação de casa em casa, carrinho, carta e testemunho informal\n\n Foi realmente muito produtivo",
    date: "2023-10-22T10:30:00",
    read: true,
    labels: ["carrinho", "informal"]
  },
  {
    generos: "f",

    nome: "Maria Fernandes",
    id: `${Math.floor(Math.random() * 200) + 1}`,
    estados: "baptizado",

    email: "@example.com",
    subject: "Re: Relatório",
    text: "Dirigi 5 estudos bíblicos.\n\n Fiz 100h na pregação.\n\n Modalidades como pregação de casa em casa, carrinho, carta e testemunho informal\n\n Foi realmente muito produtivo",
    date: "2023-10-22T10:30:00",
    read: true,
    labels: ["carrinho", "informal"]
  },
  {
    generos: "f",
    carreiras: "regular",

    nome: "Mariete Vinho",
    id: `${Math.floor(Math.random() * 200) + 1}`,
    estados: "baptizado",

    email: "@example.com",
    subject: "Re: Relatório",
    text: "Dirigi 5 estudos bíblicos.\n\n Fiz 100h na pregação.\n\n Modalidades como pregação de casa em casa, carrinho, carta e testemunho informal\n\n Foi realmente muito produtivo",
    date: "2023-10-22T10:30:00",
    read: true,
    labels: ["carrinho", "informal"]
  },
  {
    generos: "f",

    nome: "Maura Cambongo",
    id: `${Math.floor(Math.random() * 200) + 1}`,
    estados: "associado",

    email: "@example.com",
    subject: "Re: Relatório",
    text: "Dirigi 5 estudos bíblicos.\n\n Fiz 100h na pregação.\n\n Modalidades como pregação de casa em casa, carrinho, carta e testemunho informal\n\n Foi realmente muito produtivo",
    date: "2023-10-22T10:30:00",
    read: true,
    labels: ["carrinho", "informal"]
  },
  {
    generos: "f",

    nome: "Minesa Diamantino",
    id: `${Math.floor(Math.random() * 200) + 1}`,
    estados: "baptizado",

    email: "@example.com",
    subject: "Re: Relatório",
    text: "Dirigi 5 estudos bíblicos.\n\n Fiz 100h na pregação.\n\n Modalidades como pregação de casa em casa, carrinho, carta e testemunho informal\n\n Foi realmente muito produtivo",
    date: "2023-10-22T10:30:00",
    read: true,
    labels: ["carrinho", "informal"]
  },
  {
    generos: "f",
    carreiras: "auxiliar",

    nome: "Nelsa Macana",
    id: `${Math.floor(Math.random() * 200) + 1}`,
    estados: "baptizado",

    email: "@example.com",
    subject: "Re: Relatório",
    text: "Dirigi 5 estudos bíblicos.\n\n Fiz 100h na pregação.\n\n Modalidades como pregação de casa em casa, carrinho, carta e testemunho informal\n\n Foi realmente muito produtivo",
    date: "2023-10-22T10:30:00",
    read: true,
    labels: ["carrinho", "informal"]
  },
  {
    generos: "f",
    carreiras: "regular",

    nome: "Rosa Cambambe",
    id: `${Math.floor(Math.random() * 200) + 1}`,
    estados: "baptizado",

    email: "@example.com",
    subject: "Re: Relatório",
    text: "Dirigi 5 estudos bíblicos.\n\n Fiz 100h na pregação.\n\n Modalidades como pregação de casa em casa, carrinho, carta e testemunho informal\n\n Foi realmente muito produtivo",
    date: "2023-10-22T10:30:00",
    read: true,
    labels: ["carrinho", "informal"]
  },
  {
    generos: "f",
    carreiras: "auxiliar",

    nome: "Teresa Calai",
    id: `${Math.floor(Math.random() * 200) + 1}`,
    estados: "baptizado",

    email: "@example.com",
    subject: "Re: Relatório",
    text: "Dirigi 5 estudos bíblicos.\n\n Fiz 100h na pregação.\n\n Modalidades como pregação de casa em casa, carrinho, carta e testemunho informal\n\n Foi realmente muito produtivo",
    date: "2023-10-22T10:30:00",
    read: true,
    labels: ["carrinho", "informal"]
  },
  {
    generos: "f",

    nome: "Celma Quiluluta",
    id: `${Math.floor(Math.random() * 200) + 1}`,
    estados: "baptizado",

    email: "@example.com",
    subject: "Re: Relatório",
    text: "Dirigi 5 estudos bíblicos.\n\n Fiz 100h na pregação.\n\n Modalidades como pregação de casa em casa, carrinho, carta e testemunho informal\n\n Foi realmente muito produtivo",
    date: "2023-10-22T10:30:00",
    read: true,
    labels: ["carrinho", "informal"]
  },
  {
    generos: "f",
    carreiras: "regular",

    nome: "Delfina D'Sousa",
    id: `${Math.floor(Math.random() * 200) + 1}`,
    estados: "baptizado",

    email: "@example.com",
    subject: "Re: Relatório",
    text: "Dirigi 5 estudos bíblicos.\n\n Fiz 100h na pregação.\n\n Modalidades como pregação de casa em casa, carrinho, carta e testemunho informal\n\n Foi realmente muito produtivo",
    date: "2023-10-22T10:30:00",
    read: true,
    labels: ["carrinho", "informal"]
  },
];