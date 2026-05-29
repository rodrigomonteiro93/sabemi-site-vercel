import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import YtBadge from './YtBadge';

describe('YtBadge', () => {
  it('renderiza ícone SVG', () => {
    const { container } = render(<YtBadge />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });
});
