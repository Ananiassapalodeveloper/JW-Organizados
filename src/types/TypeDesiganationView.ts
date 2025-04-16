import { RegistoArrumacao } from "./ExtraActivityDTO/ArrumacaoType/type";
import { RegistoAssistencia } from "./ExtraActivityDTO/AssistenciaType/type";
import { Registoindicadores } from "./ExtraActivityDTO/IndicadorType/type";
import { RegistoReuniaoPublica, RegistoSentinela } from "./reuniaoFimSemanaDTO/type";
import { RegistoCristao, RegistoMinisterio, RegistoTesouro } from "./reuniaoMeioSemanaDTO/type";

export type membroType<T> = {
  nome: string;
  estado: string;
  contacto: string;
  _count: T;
};
export type PartesIniciasType = {
  id: string;
  name: string;
  memberId: string;
  suplenteMemberId: string;
  ReunioesDatesId: string;
  membro: membroType<{
    PartesIniciasDono: number;
  }>;
  suplenteMembro: membroType<{
    PartesIniciasSuplente: number;
  }>;
};

export type PartesFinaisType = {
  id: string;
  name: string;
  memberId: string;
  suplenteMemberId: string;
  ReunioesDatesId: string;
  membro: membroType<{
    PartesFinaisParteMembro: number;
  }>;
  suplenteMembro: membroType<{
    PartesFinaisParteSuplente: number;
  }>;
};

export type ano = {
  id: string;
  ano: number;
  descricao: string;
};

export type mes = {
  id: string;
  mes: number;
  descricao: string;
  anoId: string;
  ano: ano;
};

export type DesignationType = {
  id: string;
  from: string;
  to: string;

  //Reunião do meio de semana
  PartesInicias: PartesIniciasType[];
  Tesouros: RegistoTesouro[];
  Ministerio: RegistoMinisterio[];
  Cristao: RegistoCristao[];
  PartesFinais: PartesFinaisType[];

  //Reuniao do fim de semana
  ReuniaoPublica: RegistoReuniaoPublica[];
  Sentinela: RegistoSentinela[];

  //Extra deignação
  Arrumacao: RegistoArrumacao[];
  Assistencia: RegistoAssistencia[];
  Indicadores: Registoindicadores[];

  //_____________________
  mes: mes;
};