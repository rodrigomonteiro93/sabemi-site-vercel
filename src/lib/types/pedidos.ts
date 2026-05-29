import type { ReactNode } from 'react';

export interface PedidoInfoItem {
  icon?: ReactNode;
  label: string;
  value: string;
  valueVariant?: 'default' | 'danger' | 'success' | 'mono';
}

export interface PaxInfoItem {
  icon?: ReactNode;
  label: string;
  value?: string;
  valueVariant?: 'default' | 'danger' | 'success' | 'mono';
  variant?: 'default' | 'voucher';
  children?: ReactNode;
}

export interface PaxDetalheData {
  id: string;
  nome: string;
  initials: string;
  avatarColorIndex: 1 | 2 | 3 | 4 | 5;
  statusLabel: string;
  statusVariant: 'cancel' | 'emit' | 'ongoing' | 'pendente';
  conditionsHref: string;
  comissaoValue: string;
  comissaoPct: string;
  netValue: string;
  infoItems: PaxInfoItem[];
  voucherNumero?: string;
  voucherActions: 'view-download' | 'none';
  cancelDisabled: boolean;
  cancelLabel: string;
}
