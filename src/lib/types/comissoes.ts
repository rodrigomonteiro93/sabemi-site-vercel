export type ComissaoStatus = 'liberada' | 'aguardando' | 'bloqueada';

export interface ComissaoItem {
  id: number;
  date: string;
  emissor: string;
  paxName: string;
  paxDoc: string;
  paxAvatarIndex: number;
  comValue: string;
  comPct: string;
  netValue: string;
  status: ComissaoStatus;
  _comNum: number;
}

export interface ComissoesFilterParams {
  dataInicio: string;
  dataFim: string;
  emissor: string;
  status: string;
}
