import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {ScrollArea} from "@/components/ui/scroll-area"


type studentsDesignations={
  name:string
  designation:
    "Leitura da Bíblia (4min)"|
    "começar conversa"|
    "Manter o interesse"|
    "Fazer discíplo"|
    "Explicar as suas crenças"|
    "Discurso (5 min)"|
    "Leitor"
  ,
  qtds:string
} []

const Students:studentsDesignations=[
  {
    name:"Adão Canda",
    designation:"Leitura da Bíblia (4min)",
    qtds:"6"
  },
  {
    name:"Leusia Fina",
    designation:"começar conversa",
    qtds:"5"
  },
  {
    name:"Joana Balanga",
    designation:"Manter o interesse",
    qtds:"2"
  },
  {
    name:"Fátima Zangui",
    designation:"Fazer discíplo",
    qtds:"4"
  },
  {
    name:"Emília Sampaio",
    designation:"Explicar as suas crenças",
    qtds:"7"
  },
  {
    name:"Eduardo Macoxi",
    designation:"Discurso (5 min)",
    qtds:"5"
  },
  {
    name:"Delfina D'Sousa",
    designation:"Manter o interesse",
    qtds:"9"
  },
  {
    name:"Celma Quiluluta",
    designation:"Fazer discíplo",
    qtds:""
  },
  {
    name:"Ananias Sapalo",
    designation:"Fazer discíplo",
    qtds:"5"
  },
  {
    name:"Teresa Eduardo",
    designation:"começar conversa",
    qtds:"10"
  },
  {
    name:"Walter Macoxi",
    designation:"Fazer discíplo",
    qtds:"76"
  },
  {
    name:"Nguza Dala",
    designation:"Leitor",
    qtds:"20"
  },
  {
    name:"Neusa António",
    designation:"Explicar as suas crenças",
    qtds:"5"
  },
  {
    name:"Marcelina Quisssunda",
    designation:"Fazer discíplo",
    qtds:"4"
  },
  {
    name:"Manuel Tomás",
    designation:"Manter o interesse",
    qtds:"7"
  },
  {
    name:"Madalena Manuel",
    designation:"Fazer discíplo",
    qtds:""
  }
]


export function RecentSales() {
  return (
    <ScrollArea >
    <div className="space-y-8 max-h-80">
     { Students.map((data)=>(
        
      <div className="flex items-center" key={data.name}>
      <Avatar className="h-9 w-9">
        <AvatarImage src="/avatars/01.png" alt="Avatar" />
        <AvatarFallback>OM</AvatarFallback>
      </Avatar>
      <div className="ml-4 space-y-1">
        <p className="text-sm font-medium leading-none">{data.name}</p>
        <p className="text-sm text-muted-foreground">
          {data.designation}
        </p>
      </div>
      <div className="ml-auto font-medium">{data.qtds} vezes</div>
    </div>
     ))}
      
    </div>
    </ScrollArea>
  )
}

