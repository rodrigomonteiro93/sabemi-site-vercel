import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import PlanCard from './PlanCard';
import { PLANS_MOCK } from '@/lib/mocks/plans';

const defaultProps = {
  index: 0,
  passageiros: 1,
  dias: 5,
  isCompared: false,
  markupHidden: false,
  onToggleCompare: vi.fn(),
  onOpenEmail: vi.fn(),
  onOpenCobertura: vi.fn(),
};

describe('PlanCard', () => {
  it('renderiza plano sem COVID com Extravio de Bagagem', () => {
    render(<PlanCard {...defaultProps} plan={PLANS_MOCK[0]} />);

    expect(screen.getByText('Sabemi 15K Brasil')).toBeInTheDocument();
    expect(screen.getByText('Extravio de Bagagem')).toBeInTheDocument();
    expect(screen.getByText('R$ 1.000')).toBeInTheDocument();
  });

  it('renderiza plano com COVID sem Extravio de Bagagem', () => {
    render(<PlanCard {...defaultProps} plan={PLANS_MOCK[1]} />);

    expect(screen.getByText('Sabemi 15K Brasil — com COVID')).toBeInTheDocument();
    expect(screen.getByText('Despesas Médicas e Hospitalares por COVID-19')).toBeInTheDocument();
    expect(screen.queryByText('Extravio de Bagagem')).not.toBeInTheDocument();
  });

  it('dispara onToggleCompare ao marcar Comparar', async () => {
    const user = userEvent.setup();
    const onToggleCompare = vi.fn();

    render(
      <PlanCard
        {...defaultProps}
        plan={PLANS_MOCK[0]}
        onToggleCompare={onToggleCompare}
      />,
    );

    await user.click(screen.getByRole('checkbox'));

    expect(onToggleCompare).toHaveBeenCalledWith(0);
  });
});
