import type { ReactNode } from 'react';

export type FaturaStatusVariant = 'recebida' | 'vencida' | 'aberta' | 'processando';

export interface FaturaInfoItem {
  icon: ReactNode;
  label: string;
  value: string;
  valueVariant?: 'default' | 'danger' | 'success' | 'mono';
}

export interface FaturaComissaoItem {
  id: string;
  plano: string;
  cliente: string;
  cpf: string;
  emissor: string;
  comissao: string;
  comissaoPct: string;
  net: string;
}

export interface FaturaData {
  id: string;
  geradaEm: string;
  heroTotalLabel: string;
  heroTotal: string;
  heroTotalSub: string;
  statusVariant: FaturaStatusVariant;
  statusLabel: string;
  statusSub: string;
  statusSubLate: boolean;
  infoItems: FaturaInfoItem[];
  netTotal: string;
  comissaoTotal: string;
}
