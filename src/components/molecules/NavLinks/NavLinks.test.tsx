import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import NavLinks from './NavLinks';

describe('NavLinks', () => {
  it('renderiza itens de navegação', () => {
    render(
      <NavLinks
        items={[
          { label: 'Home', href: '/', active: true },
          { label: 'Blog', href: '/blog' },
        ]}
      />,
    );

    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Blog' })).toBeInTheDocument();
  });

  it('aplica classe active no item ativo', () => {
    render(
      <NavLinks
        items={[
          { label: 'Home', href: '/', active: true },
          { label: 'Blog', href: '/blog' },
        ]}
      />,
    );

    expect(screen.getByRole('link', { name: 'Home' }).className).toMatch(/active/);
    expect(screen.getByRole('link', { name: 'Blog' }).className).not.toMatch(/active/);
  });
});
