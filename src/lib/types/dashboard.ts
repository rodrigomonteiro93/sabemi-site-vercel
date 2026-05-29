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
