export type VoucherStatus = 'emit' | 'pendente' | 'cancel';
export type TripMetaCls = 'upcoming' | 'ongoing' | 'past' | 'cancel';

export interface VoucherPageItem {
  id: number;
  nome: string;
  destino: string;
  dias: number;
  start: string;
  end: string;
  total: string;
  comissao: string | null;
  status: VoucherStatus;
}

export interface TripMeta {
  label: string;
  cls: TripMetaCls;
}

export interface VouchersFilterParams {
  numeroPedido?: string;
  nomePassageiro?: string;
  cpf?: string;
  emissaoInicio?: string;
  emissaoFim?: string;
  dataIda?: string;
  dataVolta?: string;
}

export const STATUS_LABELS: Record<VoucherStatus, string> = {
  emit: 'Emitido',
  pendente: 'Aguardando pagto',
  cancel: 'Cancelado',
};

export function computeTripMeta(item: VoucherPageItem, today: Date): TripMeta {
  if (item.status === 'cancel') return { label: 'Cancelado', cls: 'cancel' };
  const parseDate = (s: string) => {
    const [d, m, y] = s.split('/').map(Number);
    return new Date(y, m - 1, d);
  };
  const start = parseDate(item.start);
  const end = parseDate(item.end);
  if (today < start) {
    const diff = Math.ceil((start.getTime() - today.getTime()) / 86400000);
    return { label: `Embarca em ${diff} dia${diff > 1 ? 's' : ''}`, cls: 'upcoming' };
  }
  if (today > end) return { label: 'Viagem concluída', cls: 'past' };
  const total = end.getTime() - start.getTime() || 1;
  const elapsed = today.getTime() - start.getTime();
  const pct = Math.min(100, Math.max(0, Math.round((elapsed / total) * 100)));
  return { label: `Em andamento · ${pct}%`, cls: 'ongoing' };
}
