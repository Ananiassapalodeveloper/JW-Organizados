export type Parte = {
  id?: string;
  name: string;
  memberId?: string;
  suplenteMemberId?: string;
  grupoId?: string;
  bookDeOratoriaDeconselhoId?: string;
};

export type Designacao = {
  id?: string;
  name: string;
  partes: Parte[];
};

export type Reuniao = {
  id?: string;
  nameDate: string;
  designacao: Designacao[];
};

export type ReuniaoMensal = {
  reuniaoMeioSemana: Reuniao[];
  reuniaoFimSemana: Reuniao[];
};

export type Mes = {
  id?: string;
  mes: string;
  reuniaoMensalDoMes: ReuniaoMensal;
};

export type ReuniaoAnual = {
  id?: string;
  ano: number;
  meses: Mes[];
};
