import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import BackLink from './BackLink';

describe('BackLink', () => {
  it('renderiza com href e texto corretos', () => {
    render(
      <BackLink href="/emissores">
        Voltar para Emissores e Subcontas
      </BackLink>,
    );

    const link = screen.getByRole('link', { name: /Voltar para Emissores e Subcontas/i });
    expect(link).toHaveAttribute('href', '/emissores');
  });

  it('renderiza ícone SVG de seta', () => {
    const { container } = render(
      <BackLink href="/emissores">Voltar</BackLink>,
    );

    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg?.querySelector('polyline')).toBeInTheDocument();
  });

  it('aplica classe backLink', () => {
    render(<BackLink href="/emissores">Voltar</BackLink>);

    const link = screen.getByRole('link', { name: 'Voltar' });
    expect(link.className).toMatch(/backLink/);
  });
});
