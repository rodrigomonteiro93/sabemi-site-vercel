import { describe, it, expect } from 'vitest';
import { PLANS_MOCK } from '@/lib/mocks/plans';
import { parseCotacaoSort, sortPlans } from './sortPlans';

describe('sortPlans', () => {
  it('ordena por menor preço (vista)', () => {
    const sorted = sortPlans(PLANS_MOCK, 'Menor preço');
    const prices = sorted.map((p) => parseFloat(p.vista.replace(',', '.')));
    expect(prices).toEqual([...prices].sort((a, b) => a - b));
  });

  it('ordena por maior cobertura médica', () => {
    const sorted = sortPlans(PLANS_MOCK, 'Maior cobertura médica');
    expect(sorted[0].med).toBe('100.000');
  });
});

describe('parseCotacaoSort', () => {
  it('usa fallback para valor inválido', () => {
    expect(parseCotacaoSort('invalido')).toBe('Menor preço');
  });
});
