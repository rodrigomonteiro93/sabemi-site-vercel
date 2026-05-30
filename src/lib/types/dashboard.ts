export interface SideNavItem {
  label: string;
  href: string;
  active?: boolean;
  isSair?: boolean;
}

export interface ComissaoRow {
  voucher: string;
  percent: string;
  comissao: string;
  data: string;
}

export interface VoucherItem {
  id: string;
  total: string;
  nome: string;
  data: string;
  pedido: string;
  planos: number;
  status: 'cancel' | 'emit' | 'pendente';
  urlPag?: boolean;
}

export interface KpiItemData {
  variant: 'vouchers' | 'comissoes' | 'faturas';
  label: string;
  value: string;
  valueSmall?: string;
  sub: string;
}

export interface CambioPanelData {
  date: string;
  pair: string;
  currency: string;
  value: string;
  delta: string;
  deltaType: 'up' | 'down';
  updatedAt: string;
  histHref: string;
}

export interface DashboardData {
  agencyName: string;
  cambio: CambioPanelData;
  comissoes: { rows: ComissaoRow[]; allHref: string };
  kpis: { title: string; items: KpiItemData[] };
  vouchers: { title: string; vouchers: VoucherItem[]; allHref: string };
}
