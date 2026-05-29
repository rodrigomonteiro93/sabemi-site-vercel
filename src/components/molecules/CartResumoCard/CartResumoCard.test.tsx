import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CartResumoCard from './CartResumoCard';

describe('CartResumoCard', () => {
  it('renderiza cabeçalho e totais formatados', () => {
    render(<CartResumoCard totalVista="R$ 87,40" total10x="R$ 92,00" />);

    expect(screen.getByText('Resumo da compra')).toBeInTheDocument();
    expect(screen.getByText('Total à vista')).toBeInTheDocument();
    expect(screen.getByText('R$ 87,40')).toBeInTheDocument();
    expect(screen.getByText('Total em até 10x sem juros')).toBeInTheDocument();
    expect(screen.getByText('R$ 92,00')).toBeInTheDocument();
  });
});
