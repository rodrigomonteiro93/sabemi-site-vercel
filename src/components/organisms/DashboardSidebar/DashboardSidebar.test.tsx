import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import DashboardSidebar from './DashboardSidebar';
import type { SideNavItem } from '@/lib/types/dashboard';

const navItems: SideNavItem[] = [
  { label: 'Dashboard', href: '/dashboard', active: true },
  { label: 'Vouchers', href: '/vouchers' },
  { label: 'Sair', href: '/login', isSair: true },
];

const defaultProps = {
  agencyName: 'Agência Teste',
  navItems,
  cotarHref: '/cotacao',
  copyLinkValue: 'https://sabemi.com.br/?ag=teste',
  copyRegisterLinkValue: 'https://sabemi.com.br/cadastro/?ag=teste',
};

describe('DashboardSidebar', () => {
  it('renderiza nome da agência', () => {
    render(<DashboardSidebar {...defaultProps} />);
    expect(screen.getByText('Agência Teste')).toBeInTheDocument();
  });

  it('renderiza todos os navItems', () => {
    render(<DashboardSidebar {...defaultProps} />);

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Vouchers')).toBeInTheDocument();
    expect(screen.getByText('Sair')).toBeInTheDocument();
  });

  it('aplica classe active no item ativo', () => {
    render(<DashboardSidebar {...defaultProps} />);
    const activeLink = screen.getByText('Dashboard').closest('a');
    expect(activeLink?.className).toMatch(/navLinkActive/);
  });

  it('aplica estilo sair no item com isSair: true', () => {
    render(<DashboardSidebar {...defaultProps} />);
    const sairLink = screen.getByText('Sair').closest('a');
    expect(sairLink?.className).toMatch(/navLinkSair/);
  });

  it('botão "Copiar meu link" chama navigator.clipboard.writeText', async () => {
    const user = userEvent.setup();
    const writeTextSpy = vi.spyOn(navigator.clipboard, 'writeText');

    render(<DashboardSidebar {...defaultProps} />);

    await user.click(screen.getByRole('button', { name: 'Copiar meu link' }));

    expect(writeTextSpy).toHaveBeenCalledWith('https://sabemi.com.br/?ag=teste');
    expect(screen.getByRole('button', { name: 'Link copiado!' })).toBeInTheDocument();

    writeTextSpy.mockRestore();
  });
});
