import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import StepItem from './StepItem';

describe('StepItem', () => {
  it('renderiza ícone e descrição', () => {
    render(
      <StepItem
        icon={<span data-testid="step-icon">1</span>}
        description="Informe os dados da viagem."
      />,
    );

    expect(screen.getByTestId('step-icon')).toBeInTheDocument();
    expect(screen.getByText('Informe os dados da viagem.')).toBeInTheDocument();
  });
});
