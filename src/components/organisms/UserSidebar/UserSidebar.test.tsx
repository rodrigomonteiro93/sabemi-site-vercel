import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import UserSidebar from './UserSidebar';

vi.mock('next/navigation', () => ({
  usePathname: () => '/dashboard',
}));

const defaultProps = {
  agencyName: 'Agência Teste',
  cotarHref: '/cotacao',
  copyLinkValue: 'https://sabemi.com.br/?ag=teste',
  copyRegisterLinkValue: 'https://sabemi.com.br/cadastro/?ag=teste',
};

describe('UserSidebar', () => {
  it('renderiza nome da agência', () => {
    render(<UserSidebar {...defaultProps} />);
    expect(screen.getByText('Agência Teste')).toBeInTheDocument();
  });

  it('renderiza todos os itens do menu padrão', () => {
    render(<UserSidebar {...defaultProps} />);

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Vouchers')).toBeInTheDocument();
    expect(screen.getByText('Emissores e Subcontas')).toBeInTheDocument();
    expect(screen.getByText('Sair')).toBeInTheDocument();
  });

  it('aplica classe active conforme a rota atual', () => {
    render(<UserSidebar {...defaultProps} />);
    const activeLink = screen.getByText('Dashboard').closest('a');
    expect(activeLink?.className).toMatch(/navLinkActive/);
  });

  it('aplica estilo sair no item com isSair: true', () => {
    render(<UserSidebar {...defaultProps} />);
    const sairLink = screen.getByText('Sair').closest('a');
    expect(sairLink?.className).toMatch(/navLinkSair/);
  });

  it('botão "Copiar meu link" chama navigator.clipboard.writeText', async () => {
    const user = userEvent.setup();
    const writeTextSpy = vi.spyOn(navigator.clipboard, 'writeText');

    render(<UserSidebar {...defaultProps} />);

    await user.click(screen.getByRole('button', { name: 'Copiar meu link' }));

    expect(writeTextSpy).toHaveBeenCalledWith('https://sabemi.com.br/?ag=teste');
    expect(screen.getByRole('button', { name: 'Link copiado!' })).toBeInTheDocument();

    writeTextSpy.mockRestore();
  });
});
