import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import LoginLink from './LoginLink';

describe('LoginLink', () => {
  it('renderiza link de login', () => {
    render(<LoginLink />);
    expect(screen.getByRole('link', { name: /Login/i })).toBeInTheDocument();
  });
});
