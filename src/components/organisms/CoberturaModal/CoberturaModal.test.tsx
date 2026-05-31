import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach } from 'vitest';
import CoberturaModal from './CoberturaModal';
import { useCotacaoStore } from '@/lib/stores/cotacaoStore';
import { PLANS_MOCK } from '@/lib/mocks/plans';

describe('CoberturaModal', () => {
  beforeEach(() => {
    useCotacaoStore.setState({
      covModalOpen: false,
      covModalPlanIdx: null,
    });
    document.body.style.overflow = '';
  });

  it('não renderiza quando fechado', () => {
    render(<CoberturaModal />);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('abre e exibe nome do plano correto', () => {
    useCotacaoStore.setState({ covModalOpen: true, covModalPlanIdx: 0 });
    render(<CoberturaModal />);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText(PLANS_MOCK[0].name.toUpperCase())).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Coberturas do plano' })).toBeInTheDocument();
    expect(screen.getByText('Despesas Médicas Hospitalares em Viagem')).toBeInTheDocument();
  });

  it('fecha ao clicar no botão Fechar', async () => {
    const user = userEvent.setup();
    useCotacaoStore.setState({ covModalOpen: true, covModalPlanIdx: 0 });
    render(<CoberturaModal />);

    await user.click(screen.getByRole('button', { name: 'Fechar' }));

    expect(useCotacaoStore.getState().covModalOpen).toBe(false);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
