import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mockNewsletterRepository } from './newsletter';

describe('mockNewsletterRepository', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('retorna sucesso para inscrição válida', async () => {
    const promise = mockNewsletterRepository.subscribe({
      nome: 'Maria',
      email: 'maria@sabemi.com.br',
    });
    const assertion = expect(promise).resolves.toEqual({ ok: true });

    await vi.advanceTimersByTimeAsync(600);
    await assertion;
  });

  it('lança erro quando nome ou e-mail estão vazios', async () => {
    const promise = mockNewsletterRepository.subscribe({ nome: '', email: '' });
    const assertion = expect(promise).rejects.toThrow('Nome e e-mail são obrigatórios');

    await vi.advanceTimersByTimeAsync(600);
    await assertion;
  });
});
