import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import StepsSection from './StepsSection';

describe('StepsSection', () => {
  it('renderiza título e quatro passos', () => {
    render(<StepsSection />);

    expect(screen.getByRole('heading', { name: /Conheça os passos/i })).toBeInTheDocument();
    expect(screen.getByText('Informe os dados da viagem para ver uma cotação.')).toBeInTheDocument();
    expect(screen.getByText(/Compare planos, seguradoras/i)).toBeInTheDocument();
    expect(screen.getByText('Receba a apólice digital por e-mail!')).toBeInTheDocument();
  });
});
