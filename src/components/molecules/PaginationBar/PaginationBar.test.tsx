import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import PaginationBar from './PaginationBar';

describe('PaginationBar', () => {
  it('renderiza meta text com intervalo e total', () => {
    render(
      <PaginationBar
        pageFrom={1}
        pageTo={15}
        total={238}
        currentPage={1}
        totalPages={16}
        onPageChange={vi.fn()}
      />,
    );

    expect(screen.getByText('1', { selector: 'b' })).toBeInTheDocument();
    expect(screen.getByText('15', { selector: 'b' })).toBeInTheDocument();
    expect(screen.getByText('238', { selector: 'b' })).toBeInTheDocument();
  });

  it('desabilita prev na página 1 e next na última página', () => {
    const { rerender } = render(
      <PaginationBar
        pageFrom={1}
        pageTo={15}
        total={238}
        currentPage={1}
        totalPages={16}
        onPageChange={vi.fn()}
      />,
    );

    const buttons = screen.getAllByRole('button');
    expect(buttons[0]).toBeDisabled();
    expect(buttons[buttons.length - 1]).not.toBeDisabled();

    rerender(
      <PaginationBar
        pageFrom={226}
        pageTo={238}
        total={238}
        currentPage={16}
        totalPages={16}
        onPageChange={vi.fn()}
      />,
    );

    const lastPageButtons = screen.getAllByRole('button');
    expect(lastPageButtons[0]).not.toBeDisabled();
    expect(lastPageButtons[lastPageButtons.length - 1]).toBeDisabled();
  });

  it('chama onPageChange ao clicar num número de página', async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();

    render(
      <PaginationBar
        pageFrom={1}
        pageTo={15}
        total={238}
        currentPage={1}
        totalPages={16}
        onPageChange={onPageChange}
      />,
    );

    await user.click(screen.getByRole('button', { name: '2' }));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });
});
