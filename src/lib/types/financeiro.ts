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
  statusSub: string;
  statusSubLate: boolean;
  infoItems: FaturaInfoItem[];
  netTotal: string;
  comissaoTotal: string;
}

export interface FaturaDetalheData extends FaturaData {
  comissoes: FaturaComissaoItem[];
  totalItems: number;
}

export interface FinanceiroItem {
  id: number;
  date: string;
  dateObj: Date;
  venc: Date;
  qPedidos: number;
  totalPedidos: number;
  qComissoes: number;
  totalComissoes: number;
  total: number;
  status: 'recebida' | 'vencida' | 'aberta' | 'processando';
  hasBoleto: boolean;
}

export interface FinanceiroFilterParams {
  dataInicio: string;
  dataFim: string;
  status: string;
  valorMin: string;
  valorMax: string;
}

export function fmtBRL(n: number): string {
  return 'R$ ' + n.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export function fmtDate(d: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
}
