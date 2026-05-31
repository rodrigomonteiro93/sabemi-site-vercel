import type { CotacaoPlan } from '@/lib/types/cotacao';

export const COTACAO_SORT_OPTIONS = [
  'Menor preço',
  'Maior cobertura médica',
  'Mais vendidos',
  'Por seguradora',
] as const;

export type CotacaoSortOption = (typeof COTACAO_SORT_OPTIONS)[number];

export const DEFAULT_COTACAO_SORT: CotacaoSortOption = 'Menor preço';

export function parseCotacaoSort(value: string): CotacaoSortOption {
  return (COTACAO_SORT_OPTIONS as readonly string[]).includes(value)
    ? (value as CotacaoSortOption)
    : DEFAULT_COTACAO_SORT;
}

function parsePrice(value: string): number {
  return parseFloat(value.replace(',', '.')) || 0;
}

function parseMed(value: string): number {
  return parseFloat(value.replace(/\./g, '')) || 0;
}

export function sortPlans(plans: CotacaoPlan[], sortBy: string): CotacaoPlan[] {
  const copy = [...plans];
  switch (sortBy) {
    case 'Maior cobertura médica':
      return copy.sort((a, b) => parseMed(b.med) - parseMed(a.med));
    case 'Por seguradora':
      return copy.sort(
        (a, b) => a.brand.localeCompare(b.brand) || a.name.localeCompare(b.name),
      );
    case 'Mais vendidos':
      return copy;
    case 'Menor preço':
    default:
      return copy.sort((a, b) => parsePrice(a.vista) - parsePrice(b.vista));
  }
}
