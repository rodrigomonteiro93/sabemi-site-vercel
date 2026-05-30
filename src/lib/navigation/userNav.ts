import type { SideNavItem } from '@/lib/types/dashboard';

export const USER_NAV_ITEMS: SideNavItem[] = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Vouchers', href: '/vouchers' },
  { label: 'Comissões', href: '/comissoes' },
  { label: 'Financeiro', href: '/financeiro' },
  { label: 'Tarifas Especiais', href: '/tarifas-especiais' },
  { label: 'Emissores e Subcontas', href: '/emissores' },
  { label: 'Markup', href: '/markup' },
  { label: 'White Label', href: '/white-label' },
  { label: 'Sair', href: '/logout', isSair: true },
];

export function isUserNavActive(pathname: string, href: string): boolean {
  if (href === '/logout') return false;
  if (href === '/dashboard') return pathname === '/dashboard';
  return pathname === href || pathname.startsWith(`${href}/`);
}
