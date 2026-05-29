import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import PaxAvatar from './PaxAvatar';

describe('PaxAvatar', () => {
  it('renderiza initials', () => {
    render(<PaxAvatar initials="JS" colorIndex={1} />);
    expect(screen.getByText('JS')).toBeInTheDocument();
  });

  it('aplica classe de cor correta para cada colorIndex', () => {
    const { container, rerender } = render(<PaxAvatar initials="AB" colorIndex={1} />);
    expect((container.firstChild as HTMLElement).className).toMatch(/a1/);

    rerender(<PaxAvatar initials="AB" colorIndex={2} />);
    expect((container.firstChild as HTMLElement).className).toMatch(/a2/);

    rerender(<PaxAvatar initials="AB" colorIndex={3} />);
    expect((container.firstChild as HTMLElement).className).toMatch(/a3/);

    rerender(<PaxAvatar initials="AB" colorIndex={4} />);
    expect((container.firstChild as HTMLElement).className).toMatch(/a4/);

    rerender(<PaxAvatar initials="AB" colorIndex={5} />);
    expect((container.firstChild as HTMLElement).className).toMatch(/a5/);
  });
});
