import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CardIconsGroup from './CardIconsGroup';

describe('CardIconsGroup', () => {
  it('renderiza os 5 badges (VISA, MC, AMEX, ELO, HIPER)', () => {
    render(<CardIconsGroup />);

    expect(screen.getByText('VISA')).toBeInTheDocument();
    expect(screen.getByText('MC')).toBeInTheDocument();
    expect(screen.getByText('AMEX')).toBeInTheDocument();
    expect(screen.getByText('ELO')).toBeInTheDocument();
    expect(screen.getByText('HIPER')).toBeInTheDocument();
  });
});
