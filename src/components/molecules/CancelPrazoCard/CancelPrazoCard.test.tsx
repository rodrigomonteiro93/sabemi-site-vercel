import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CancelPrazoCard from './CancelPrazoCard';

describe('CancelPrazoCard', () => {
  it('renderiza título e texto do prazo de cancelamento', () => {
    render(<CancelPrazoCard />);

    expect(screen.getByText('Prazo para cancelamento do contrato')).toBeInTheDocument();
    expect(
      screen.getByText(/O prazo máximo para cancelamento é de até 24 horas antes do início da vigência do seguro/),
    ).toBeInTheDocument();
    expect(screen.getByText(/não haverá reembolso de valores pagos/)).toBeInTheDocument();
  });
});
