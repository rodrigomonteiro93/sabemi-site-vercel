import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import PageTitleBar from './PageTitleBar';

describe('PageTitleBar', () => {
  it('renderiza título e subtítulo', () => {
    render(
      <PageTitleBar
        title="Fatura #5069"
        subtitle="Gerada em 25/01/2026 às 06:00"
      />,
    );

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Fatura #5069');
    expect(screen.getByText('Gerada em 25/01/2026 às 06:00')).toBeInTheDocument();
  });

  it('renderiza sem actions quando actions é omitido', () => {
    render(<PageTitleBar title="Fatura #5069" />);

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('chama onClick ao clicar em cada botão de ação', async () => {
    const user = userEvent.setup();
    const onPdf = vi.fn();
    const onEmail = vi.fn();
    const onBoleto = vi.fn();

    render(
      <PageTitleBar
        title="Fatura #5069"
        actions={[
          { label: 'Baixar PDF', variant: 'outline', onClick: onPdf },
          { label: 'Enviar por e-mail', variant: 'outline', onClick: onEmail },
          { label: '2ª via do boleto', variant: 'primary', onClick: onBoleto },
        ]}
      />,
    );

    await user.click(screen.getByRole('button', { name: /Baixar PDF/i }));
    await user.click(screen.getByRole('button', { name: /Enviar por e-mail/i }));
    await user.click(screen.getByRole('button', { name: /2ª via do boleto/i }));

    expect(onPdf).toHaveBeenCalledOnce();
    expect(onEmail).toHaveBeenCalledOnce();
    expect(onBoleto).toHaveBeenCalledOnce();
  });

  it('aplica variant primary ao último botão', () => {
    render(
      <PageTitleBar
        title="Fatura #5069"
        actions={[
          { label: 'Baixar PDF', variant: 'outline', onClick: vi.fn() },
          { label: 'Enviar por e-mail', variant: 'outline', onClick: vi.fn() },
          { label: '2ª via do boleto', variant: 'primary', onClick: vi.fn() },
        ]}
      />,
    );

    const buttons = screen.getAllByRole('button');
    expect(buttons[0].className).toMatch(/outline/);
    expect(buttons[1].className).toMatch(/outline/);
    expect(buttons[2].className).toMatch(/primary/);
  });
});
