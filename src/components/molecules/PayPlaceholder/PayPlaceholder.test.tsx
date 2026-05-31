import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import PayPlaceholder from './PayPlaceholder';

describe('PayPlaceholder', () => {
  it('exibe title e description via props', () => {
    render(
      <PayPlaceholder
        icon={<span data-testid="icon">icon</span>}
        title="Pagamento via Pix"
        description="Ao finalizar, será exibido o QR Code."
      />,
    );

    expect(screen.getByText('Pagamento via Pix')).toBeInTheDocument();
    expect(screen.getByText('Ao finalizar, será exibido o QR Code.')).toBeInTheDocument();
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });
});
