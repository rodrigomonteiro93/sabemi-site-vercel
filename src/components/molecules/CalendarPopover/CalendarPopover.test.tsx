import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import CalendarPopover from './CalendarPopover';

describe('CalendarPopover', () => {
  const start = new Date(2026, 6, 6);
  const end = new Date(2026, 6, 10);

  it('não renderiza quando isOpen é false', () => {
    const { container } = render(
      <CalendarPopover
        isOpen={false}
        initialStart={start}
        initialEnd={end}
        onApply={vi.fn()}
        onClose={vi.fn()}
      />,
    );
    expect(container.querySelector('[data-cal-popover]')).toBeNull();
  });

  it('renderiza quando isOpen é true', () => {
    render(
      <CalendarPopover
        isOpen
        initialStart={start}
        initialEnd={end}
        onApply={vi.fn()}
        onClose={vi.fn()}
      />,
    );

    expect(document.querySelector('[data-cal-popover]')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Aplicar' })).toBeInTheDocument();
  });

  it('chama onApply com datas iniciais ao aplicar', async () => {
    const user = userEvent.setup();
    const onApply = vi.fn();

    render(
      <CalendarPopover
        isOpen
        initialStart={start}
        initialEnd={end}
        onApply={onApply}
        onClose={vi.fn()}
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Aplicar' }));

    expect(onApply).toHaveBeenCalledWith(start, end);
  });
});
