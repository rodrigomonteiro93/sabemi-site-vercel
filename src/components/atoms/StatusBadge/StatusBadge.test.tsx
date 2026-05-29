import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import StatusBadge from './StatusBadge';

describe('StatusBadge', () => {
  it('renderiza sem erros com variante cancel', () => {
    render(<StatusBadge variant="cancel" />);
    const badge = screen.getByText('Cancelado');
    expect(badge).toBeInTheDocument();
    expect(badge.className).toMatch(/cancel/);
  });

  it('renderiza sem erros com variante emit', () => {
    render(<StatusBadge variant="emit" />);
    const badge = screen.getByText('Emitido');
    expect(badge).toBeInTheDocument();
    expect(badge.className).toMatch(/emit/);
  });

  it('renderiza sem erros com variante pendente', () => {
    render(<StatusBadge variant="pendente" />);
    const badge = screen.getByText('Aguardando pagto');
    expect(badge).toBeInTheDocument();
    expect(badge.className).toMatch(/pendente/);
  });

  it('exibe label correto por variante', () => {
    const { rerender } = render(<StatusBadge variant="cancel" />);
    expect(screen.getByText('Cancelado')).toBeInTheDocument();

    rerender(<StatusBadge variant="emit" />);
    expect(screen.getByText('Emitido')).toBeInTheDocument();

    rerender(<StatusBadge variant="pendente" />);
    expect(screen.getByText('Aguardando pagto')).toBeInTheDocument();

    rerender(<StatusBadge variant="liberada" />);
    expect(screen.getByText('Liberada')).toBeInTheDocument();

    rerender(<StatusBadge variant="aguardando" />);
    expect(screen.getByText('Aguardando')).toBeInTheDocument();

    rerender(<StatusBadge variant="bloqueada" />);
    expect(screen.getByText('Bloqueada')).toBeInTheDocument();
  });

  it('aplica classe de variante de comissão com dot', () => {
    const { rerender } = render(<StatusBadge variant="liberada" />);
    expect(screen.getByText('Liberada').className).toMatch(/liberada/);

    rerender(<StatusBadge variant="aguardando" />);
    expect(screen.getByText('Aguardando').className).toMatch(/aguardando/);

    rerender(<StatusBadge variant="bloqueada" />);
    expect(screen.getByText('Bloqueada').className).toMatch(/bloqueada/);
  });

  it('renderiza variante vencida com label e classe corretos', () => {
    render(<StatusBadge variant="vencida" />);
    const badge = screen.getByText('Vencida');
    expect(badge).toBeInTheDocument();
    expect(badge.className).toMatch(/vencida/);
  });

  it('renderiza variantes de fatura recebida, aberta e processando', () => {
    const { rerender } = render(<StatusBadge variant="recebida" />);
    expect(screen.getByText('Recebida').className).toMatch(/recebida/);

    rerender(<StatusBadge variant="aberta" />);
    expect(screen.getByText('Aberta').className).toMatch(/aberta/);

    rerender(<StatusBadge variant="processando" />);
    expect(screen.getByText('Processando').className).toMatch(/processando/);
  });
});
