import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import EmailModal from './EmailModal';
import { useCotacaoStore } from '@/lib/stores/cotacaoStore';

describe('EmailModal', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    useCotacaoStore.setState({ emailModalOpen: false, emailModalPlanIdx: null });
    document.body.style.overflow = '';
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('não renderiza quando fechado', () => {
    render(<EmailModal />);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('exibe campos de nome e e-mail quando aberto', () => {
    useCotacaoStore.setState({ emailModalOpen: true });
    render(<EmailModal />);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByLabelText('Nome')).toHaveValue('Agência Teste');
    expect(screen.getByLabelText('E-mail')).toHaveValue('julianodesenv@gmail.com');
  });

  it('muda para Enviado e fecha após enviar', async () => {
    const user = userEvent.setup();
    useCotacaoStore.setState({ emailModalOpen: true });
    render(<EmailModal />);

    await user.click(screen.getByRole('button', { name: 'Enviar' }));

    expect(screen.getByRole('button', { name: 'Enviado ✓' })).toBeDisabled();

    vi.advanceTimersByTime(1200);

    await waitFor(() => {
      expect(useCotacaoStore.getState().emailModalOpen).toBe(false);
    });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
