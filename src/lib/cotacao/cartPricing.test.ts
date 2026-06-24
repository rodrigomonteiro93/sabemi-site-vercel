import { describe, it, expect } from 'vitest';
import {
  AGE_RANGE,
  TRIP_DAYS,
  buildPaxLabels,
  buildPaxDisplayNames,
  formatCurrency,
  getCartTotals,
  parsePrice,
} from '@/lib/cotacao/cartPricing';

describe('cartPricing', () => {
  it('calcula totais por passageiro', () => {
    const totals = getCartTotals('21,85', '23,00', 2);

    expect(parsePrice('21,85')).toBe(21.85);
    expect(totals.totalVista).toBe(formatCurrency(21.85 * 2));
    expect(totals.totalCartao).toBe(formatCurrency(23 * 2));
    expect(totals.valorCartao).toBe(46);
  });

  it('gera labels de passageiros', () => {
    expect(buildPaxLabels(3)).toEqual(['Passageiro 1', 'Passageiro 2', 'Passageiro 3']);
  });

  it('usa nomes salvos no carrinho quando disponíveis', () => {
    expect(buildPaxDisplayNames([{ nome: 'Maria Silva' }, {}], 2)).toEqual([
      'Maria Silva',
      'Passageiro 2',
    ]);
  });

  it('expõe constantes usadas no checkout', () => {
    expect(TRIP_DAYS).toBe(5);
    expect(AGE_RANGE).toBe('0 a 60 anos');
  });
});
