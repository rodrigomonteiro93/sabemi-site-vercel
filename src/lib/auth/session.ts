export const AUTH_COOKIE_NAME = 'auth-token';

export const PROTECTED_PREFIXES = [
  '/dashboard',
  '/vouchers',
  '/comissoes',
  '/financeiro',
  '/emissores',
  '/markup',
  '/tarifas-especiais',
  '/white-label',
] as const;

export const GUEST_ONLY_PATHS = ['/login', '/cadastro'] as const;

export function isProtectedPath(pathname: string): boolean {
  return PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

export function isGuestOnlyPath(pathname: string): boolean {
  return (GUEST_ONLY_PATHS as readonly string[]).includes(pathname);
}

export function hasAuthToken(value: string | undefined): boolean {
  return Boolean(value);
}

export function getSafeRedirectPath(path: string | null | undefined, fallback = '/dashboard'): string {
  if (!path || !path.startsWith('/') || path.startsWith('//')) {
    return fallback;
  }
  return path;
}
