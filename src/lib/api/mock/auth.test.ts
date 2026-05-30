import { describe, it, expect } from 'vitest';
import { mockAuthRepository } from './auth';

describe('mockAuthRepository', () => {
  it('retorna token para credenciais corretas com máscara', async () => {
    const result = await mockAuthRepository.login({
      userId: '999.999.999-99',
      password: '123456',
    });
    expect(result.token).toBe('mock-token-sabemi');
  });

  it('retorna token para credenciais corretas sem máscara', async () => {
    const result = await mockAuthRepository.login({
      userId: '99999999999',
      password: '123456',
    });
    expect(result.token).toBe('mock-token-sabemi');
  });

  it('lança erro para credenciais inválidas', async () => {
    await expect(
      mockAuthRepository.login({ userId: '111.111.111-11', password: 'errado' })
    ).rejects.toThrow('Credenciais inválidas');
  });
});
