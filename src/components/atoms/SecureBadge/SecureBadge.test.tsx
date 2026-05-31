import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import SecureBadge from './SecureBadge';

describe('SecureBadge', () => {
  it('renderiza sem erros e contém "100% Seguro"', () => {
    render(<SecureBadge />);

    expect(screen.getByLabelText('Compra segura')).toBeInTheDocument();
    expect(screen.getByText('100% Seguro')).toBeInTheDocument();
    expect(screen.getByText(/Compra Segura/)).toBeInTheDocument();
    expect(screen.getByText(/Qualidade Garantida/)).toBeInTheDocument();
  });
});
