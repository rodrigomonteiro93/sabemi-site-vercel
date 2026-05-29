import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ComKpiCard from './ComKpiCard';

describe('ComKpiCard', () => {
  it('renderiza label, value e sub', () => {
    render(
      <ComKpiCard label="Total recebido" value="R$ 1.000,00" sub="no período filtrado" />,
    );

    expect(screen.getByText('Total recebido')).toBeInTheDocument();
    expect(screen.getByText('R$ 1.000,00')).toBeInTheDocument();
    expect(screen.getByText('no período filtrado')).toBeInTheDocument();
  });

  it('aplica classe success quando colorVariant é success', () => {
    const { container } = render(
      <ComKpiCard label="A" value="1" sub="sub" colorVariant="success" />,
    );
    expect((container.firstChild as HTMLElement).className).toMatch(/success/);
  });

  it('aplica classe warning quando colorVariant é warning', () => {
    const { container } = render(
      <ComKpiCard label="A" value="1" sub="sub" colorVariant="warning" />,
    );
    expect((container.firstChild as HTMLElement).className).toMatch(/warning/);
  });

  it('aplica classe danger quando colorVariant é danger', () => {
    const { container } = render(
      <ComKpiCard label="A" value="1" sub="sub" colorVariant="danger" />,
    );
    expect((container.firstChild as HTMLElement).className).toMatch(/danger/);
  });
});
