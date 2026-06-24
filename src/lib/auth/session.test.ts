import { describe, it, expect } from 'vitest';
import {
  getSafeRedirectPath,
  hasAuthToken,
  isGuestOnlyPath,
  isProtectedPath,
} from './session';

describe('session helpers', () => {
  it('identifica rotas protegidas', () => {
    expect(isProtectedPath('/vouchers')).toBe(true);
    expect(isProtectedPath('/vouchers/123')).toBe(true);
    expect(isProtectedPath('/login')).toBe(false);
  });

  it('identifica rotas exclusivas de visitante', () => {
    expect(isGuestOnlyPath('/login')).toBe(true);
    expect(isGuestOnlyPath('/cadastro')).toBe(true);
    expect(isGuestOnlyPath('/vouchers')).toBe(false);
  });

  it('valida token apenas com valor', () => {
    expect(hasAuthToken('abc')).toBe(true);
    expect(hasAuthToken('')).toBe(false);
    expect(hasAuthToken(undefined)).toBe(false);
  });

  it('sanitiza callbackUrl', () => {
    expect(getSafeRedirectPath('/vouchers')).toBe('/vouchers');
    expect(getSafeRedirectPath('//evil.com')).toBe('/dashboard');
    expect(getSafeRedirectPath(null)).toBe('/dashboard');
  });
});
