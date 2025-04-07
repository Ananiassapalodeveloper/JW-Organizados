export const ServicoEnum = [
    { name: "Contas", value: "CONTAS" },
    { name: "Manutenção", value: "MANUTENCAO" },
    { name: "Território", value: "TERRITORIO" },
    { name: "Literatura", value: "LITERATURA" },
    { name: "Som & Audio", value: "SOM_AUDIO" },
  ]
  
  export const EstadoEnum = [
    { value: "BATIZADO", name: "Baptizado" },
    { value: "MATRICULADO", name: "Matriculado" },
    { value: "ASSOCIADO", name: "Associado" },
  ]

  export const SexoEnum = [
    { value: "M", name: "Masculino" },
    { value: "F", name: "Femenino" }
  ]
  
  export const CarreiraEnum = [
    { value: "PIONEIRO_REGULAR", name: "Pioneiro Regular" },
    { value: "PIONEIRO_AUXILIAR", name: "Pioneiro Auxiliar" },
  ]
  
  export const DadivaEnum = [
    { value: "ANCIAO", name: "Ancião" },
    { value: "SERVO_MINISTERIAL", name: "Servo Ministerial" },
  ]
  
  export const PosicaoEnum = [
    { value: "DIRIGENTE", name: "Dirigente" },
    { value: "AJUDANTE", name: "Ajudante" },
  ]
  
  export type Servico = "CONTAS" | "MANUTENCAO" | "TERRITORIO" | "LITERATURA" | "SOM_AUDIO"
  export type Posicao = "DIRIGENTE" | "AJUDANTE"
  export type Estado = "BATIZADO" | "MATRICULADO" | "ASSOCIADO"
  export type Carreira = "PIONEIRO_REGULAR" | "PIONEIRO_AUXILIAR"
  export type Dadiva = "ANCIAO" | "SERVO_MINISTERIAL"
  
  