import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import HeroSection from './HeroSection';

describe('HeroSection', () => {
  it('renderiza hero e formulário de cotação', () => {
    render(<HeroSection />);

    expect(screen.getByRole('heading', { name: /Seguro Viagem Sabemi/i })).toBeInTheDocument();
    expect(screen.getByRole('form', { name: 'Cotação rápida' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Fazer Cotação' })).toBeInTheDocument();
  });

  it('oculta PaxPanel quando paxCount é 0', () => {
    render(<HeroSection />);
    expect(screen.queryByText(/Idade Passageiro/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Data de Nascimento Passageiro/i)).not.toBeInTheDocument();
  });

  it('exibe PaxPanel ao incrementar passageiros', async () => {
    const user = userEvent.setup();
    render(<HeroSection />);

    await user.click(screen.getByRole('button', { name: 'Aumentar' }));

    expect(screen.getByText('Idade Passageiro nº 1')).toBeInTheDocument();
  });
});
