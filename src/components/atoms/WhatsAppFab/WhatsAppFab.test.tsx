import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import WhatsAppFab from './WhatsAppFab';

describe('WhatsAppFab', () => {
  it('renderiza link com aria-label WhatsApp', () => {
    render(<WhatsAppFab />);
    expect(screen.getByRole('link', { name: 'WhatsApp' })).toBeInTheDocument();
  });
});
