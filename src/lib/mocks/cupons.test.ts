import { describe, it, expect } from 'vitest';
import {
  applyCupomDiscount,
  formatCupomDiscount,
  getCupomSuccessMessage,
  getTotalsWithCupom,
  resolveCupom,
} from './cupons';

describe('cupons mock', () => {
  it('resolve cupom válido ignorando caixa e espaços', () => {
    expect(resolveCupom(' desc10 ')).toEqual({
      code: 'DESC10',
      percent: 10,
      label: '10% de desconto',
    });
    expect(resolveCupom('sabemi15')).toEqual({
      code: 'SABEMI15',
      percent: 15,
      label: '15% de desconto',
    });
  });

  it('retorna null para cupom inválido ou vazio', () => {
    expect(resolveCupom('INVALIDO')).toBeNull();
    expect(resolveCupom('   ')).toBeNull();
  });

  it('aplica desconto percentual', () => {
    expect(applyCupomDiscount(17.48, 10)).toBe(15.73);
    expect(applyCupomDiscount(18.4, 15)).toBe(15.64);
  });

  it('formata mensagem e valor de desconto', () => {
    const cupom = resolveCupom('DESC10')!;

    expect(getCupomSuccessMessage(cupom)).toBe('Cupom DESC10 aplicado: 10% de desconto.');
    expect(formatCupomDiscount(1.75)).toBe('- R$ 1,75');
  });

  it('calcula totais com cupom aplicado', () => {
    const cupom = resolveCupom('DESC10')!;
    const totals = getTotalsWithCupom('R$ 17,48', 'R$ 18,40', cupom);

    expect(totals.totalVista).toBe('R$ 15,73');
    expect(totals.totalCartao).toBe('R$ 16,56');
    expect(totals.desconto).toEqual({
      code: 'DESC10',
      valor: '- R$ 1,75',
    });
  });
});
