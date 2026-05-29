import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import PartnerItem from './PartnerItem';

describe('PartnerItem', () => {
  it('renderiza imagem com alt', () => {
    render(<PartnerItem src="/assets/logo.png" alt="Parceiro Teste" />);
    const img = screen.getByRole('img', { name: 'Parceiro Teste' });
    expect(img).toHaveAttribute('src', '/assets/logo.png');
  });

  it('aplica maxHeight customizado', () => {
    render(<PartnerItem src="/logo.png" alt="Logo" maxHeight={72} />);
    expect(screen.getByRole('img')).toHaveStyle({ maxHeight: '72px' });
  });
});
