import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mockCadastroRepository } from './cadastro';
import type { CadastroRequest } from '@/lib/types/cadastro';

const validCadastro: CadastroRequest = {
  tipoCadastro: 'corretora',
  nome: 'João Silva',
  email: 'joao@sabemi.com.br',
  telefone: '(51) 99999.9999',
  cpf: '123.456.789-00',
  dataNascimento: '01/01/1990',
  senha: '123456',
  cnpj: '12.345.678/0001-90',
  nomeFantasia: 'Agência Teste',
  razaoSocial: 'Agência Teste LTDA',
  registroTipo: '12345',
  cep: '90010-190',
  endereco: 'Rua Teste',
  bairro: 'Centro',
  estado: 'RS',
  cidade: 'Porto Alegre',
  numero: '100',
};

describe('mockCadastroRepository', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('retorna sucesso para cadastro válido', async () => {
    const promise = mockCadastroRepository.register(validCadastro);
    const assertion = expect(promise).resolves.toEqual({ ok: true });

    await vi.advanceTimersByTimeAsync(800);
    await assertion;
  });

  it('lança erro quando campos obrigatórios estão vazios', async () => {
    const promise = mockCadastroRepository.register({ ...validCadastro, nome: '' });
    const assertion = expect(promise).rejects.toThrow('Preencha todos os campos obrigatórios');

    await vi.advanceTimersByTimeAsync(800);
    await assertion;
  });
});
