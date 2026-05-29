import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach } from 'vitest';
import CompareModal from './CompareModal';
import { useCotacaoStore } from '@/lib/stores/cotacaoStore';
import { PLANS, buildCoberturas } from '@/lib/types/cotacao';

describe('CompareModal', () => {
  beforeEach(() => {
    useCotacaoStore.setState({
      compareModalOpen: false,
      compared: [],
      ages: [33],
    });
    document.body.style.overflow = '';
  });

  it('não renderiza com menos de 2 planos comparados', () => {
    useCotacaoStore.setState({ compareModalOpen: true, compared: [0] });
    render(<CompareModal />);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('exibe tabela com coberturas unificadas dos planos selecionados', () => {
    useCotacaoStore.setState({ compareModalOpen: true, compared: [0, 1] });
    render(<CompareModal />);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Comparativo de planos' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: PLANS[0].name })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: PLANS[1].name })).toBeInTheDocument();

    const labels0 = buildCoberturas(PLANS[0]).map(([k]) => k);
    const labels1 = buildCoberturas(PLANS[1]).map(([k]) => k);
    const sharedLabel = labels0.find((l) => labels1.includes(l));

    expect(sharedLabel).toBeDefined();
    expect(screen.getAllByText(sharedLabel!).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByRole('columnheader', { name: 'Cobertura' })).toBeInTheDocument();
  });

  it('fecha ao clicar no botão Fechar', async () => {
    const user = userEvent.setup();
    useCotacaoStore.setState({ compareModalOpen: true, compared: [0, 1] });
    render(<CompareModal />);

    await user.click(screen.getByRole('button', { name: 'Fechar' }));

    expect(useCotacaoStore.getState().compareModalOpen).toBe(false);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
