import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import FaturadoInfo from './FaturadoInfo';

describe('FaturadoInfo', () => {
  it('exibe o nome da agência passada via prop', () => {
    render(<FaturadoInfo agencia="Agência Teste" />);

    expect(screen.getByText('Pagamento faturado para a agência')).toBeInTheDocument();
    expect(screen.getByText('Agência Teste')).toBeInTheDocument();
    expect(
      screen.getByText(/Não é necessário informar dados de pagamento/),
    ).toBeInTheDocument();
  });
});
