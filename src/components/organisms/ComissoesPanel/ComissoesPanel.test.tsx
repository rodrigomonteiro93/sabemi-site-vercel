import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ComissoesPanel from './ComissoesPanel';

const rows = [
  { voucher: '#27864', percent: '30,00%', comissao: 'R$ 8,74', data: '26/05/2026' },
  { voucher: '#27637', percent: '10,00%', comissao: 'R$ 308,53', data: '20/05/2026' },
  { voucher: '#27571', percent: '30,00%', comissao: 'R$ 21,85', data: '14/05/2026' },
  { voucher: '#27391', percent: '30,00%', comissao: 'R$ 173,25', data: '09/05/2026' },
  { voucher: '#27271', percent: '30,00%', comissao: 'R$ 21,85', data: '04/05/2026' },
  { voucher: '#27190', percent: '30,00%', comissao: 'R$ 57,40', data: '02/05/2026' },
];

describe('ComissoesPanel', () => {
  it('renderiza 6 linhas de comissão', () => {
    render(<ComissoesPanel rows={rows} allHref="/comissoes" />);

    const tableRows = screen.getAllByRole('row');
    expect(tableRows).toHaveLength(7);
    expect(screen.getByText('#27864')).toBeInTheDocument();
    expect(screen.getByText('R$ 57,40')).toBeInTheDocument();
  });

  it('link "Todas comissões →" aponta para allHref', () => {
    render(<ComissoesPanel rows={rows} allHref="/comissoes" />);

    const link = screen.getByRole('link', { name: 'Todas comissões →' });
    expect(link).toHaveAttribute('href', '/comissoes');
  });
});
