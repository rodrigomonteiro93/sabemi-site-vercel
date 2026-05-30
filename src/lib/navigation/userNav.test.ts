import { describe, it, expect } from 'vitest';
import { isUserNavActive } from './userNav';

describe('isUserNavActive', () => {
  it('marca Dashboard ativo apenas em /dashboard', () => {
    expect(isUserNavActive('/dashboard', '/dashboard')).toBe(true);
    expect(isUserNavActive('/emissores', '/dashboard')).toBe(false);
  });

  it('marca Emissores ativo em rotas filhas', () => {
    expect(isUserNavActive('/emissores', '/emissores')).toBe(true);
    expect(isUserNavActive('/emissores/cadastrar', '/emissores')).toBe(true);
  });

  it('nunca marca Sair como ativo', () => {
    expect(isUserNavActive('/logout', '/logout')).toBe(false);
  });
});
