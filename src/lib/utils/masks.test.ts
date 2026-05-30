import { describe, it, expect } from 'vitest';
import { applyMask } from './masks';

describe('applyMask – cep', () => {
  it('formata 8 dígitos', () => expect(applyMask('12345678', 'cep')).toBe('12345-678'));
  it('entrada parcial', () => expect(applyMask('123', 'cep')).toBe('123'));
  it('entrada vazia', () => expect(applyMask('', 'cep')).toBe(''));
  it('idempotente com pontuação', () => expect(applyMask('12345-678', 'cep')).toBe('12345-678'));
});

describe('applyMask – cpf', () => {
  it('formata 11 dígitos', () => expect(applyMask('12345678901', 'cpf')).toBe('123.456.789-01'));
  it('limita em 11 dígitos', () => expect(applyMask('123456789012', 'cpf')).toBe('123.456.789-01'));
  it('idempotente', () => expect(applyMask('123.456.789-01', 'cpf')).toBe('123.456.789-01'));
});

describe('applyMask – cnpj', () => {
  it('formata 14 dígitos', () => expect(applyMask('12345678000190', 'cnpj')).toBe('12.345.678/0001-90'));
  it('limita em 14 dígitos', () => expect(applyMask('123456780001901', 'cnpj')).toBe('12.345.678/0001-90'));
  it('idempotente', () => expect(applyMask('12.345.678/0001-90', 'cnpj')).toBe('12.345.678/0001-90'));
});

describe('applyMask – cpf-cnpj', () => {
  it('aplica CPF com 11 dígitos', () => expect(applyMask('12345678901', 'cpf-cnpj')).toBe('123.456.789-01'));
  it('aplica CNPJ com 14 dígitos', () => expect(applyMask('12345678000190', 'cpf-cnpj')).toBe('12.345.678/0001-90'));
  it('transição no 12º dígito', () => expect(applyMask('123456789012', 'cpf-cnpj')).toBe('12.345.678/9012'));
});

describe('applyMask – data', () => {
  it('formata 8 dígitos (dd/mm/aaaa)', () => expect(applyMask('01011990', 'data')).toBe('01/01/1990'));
  it('entrada parcial', () => expect(applyMask('0101', 'data')).toBe('01/01'));
  it('entrada vazia', () => expect(applyMask('', 'data')).toBe(''));
  it('limita em 8 dígitos', () => expect(applyMask('010119901', 'data')).toBe('01/01/1990'));
  it('idempotente', () => expect(applyMask('01/01/1990', 'data')).toBe('01/01/1990'));
});

describe('applyMask – telefone', () => {
  it('telefone fixo (10 dígitos)', () => expect(applyMask('1198765432', 'telefone')).toBe('(11) 9876-5432'));
  it('celular (11 dígitos)', () => expect(applyMask('11987654321', 'telefone')).toBe('(11) 98765-4321'));
  it('entrada vazia', () => expect(applyMask('', 'telefone')).toBe(''));
  it('idempotente celular', () => expect(applyMask('(11) 98765-4321', 'telefone')).toBe('(11) 98765-4321'));
});
