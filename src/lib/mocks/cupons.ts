import { formatCurrency } from '@/lib/cotacao/cartPricing';

export interface CupomMock {
  code: string;
  percent: number;
  label: string;
}

export const CUPONS_MOCK: CupomMock[] = [
  { code: 'DESC10', percent: 10, label: '10% de desconto' },
  { code: 'SABEMI15', percent: 15, label: '15% de desconto' },
];

const CUPONS_BY_CODE = Object.fromEntries(
  CUPONS_MOCK.map((cupom) => [cupom.code, cupom]),
) as Record<string, CupomMock>;

export function resolveCupom(code: string): CupomMock | null {
  const normalized = code.trim().toUpperCase();
  if (!normalized) return null;
  return CUPONS_BY_CODE[normalized] ?? null;
}

export function applyCupomDiscount(value: number, percent: number): number {
  return Math.round(value * (1 - percent / 100) * 100) / 100;
}

export function getCupomSuccessMessage(cupom: CupomMock): string {
  return `Cupom ${cupom.code} aplicado: ${cupom.label}.`;
}

export function formatCupomDiscount(value: number): string {
  return `- ${formatCurrency(value)}`;
}

export function getTotalsWithCupom(
  totalVista: string,
  totalCartao: string,
  cupom: CupomMock | null,
) {
  const vistaBase = parseCurrency(totalVista);
  const cartaoBase = parseCurrency(totalCartao);

  if (!cupom) {
    return {
      totalVista,
      totalCartao,
      desconto: undefined,
    };
  }

  const vistaFinal = applyCupomDiscount(vistaBase, cupom.percent);
  const cartaoFinal = applyCupomDiscount(cartaoBase, cupom.percent);

  return {
    totalVista: formatCurrency(vistaFinal),
    totalCartao: formatCurrency(cartaoFinal),
    desconto: {
      code: cupom.code,
      valor: formatCupomDiscount(vistaBase - vistaFinal),
    },
  };
}

function parseCurrency(value: string): number {
  return parseFloat(value.replace(/[^\d,]/g, '').replace(',', '.'));
}
