import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import FormField from './FormField';

function Wrapper({ mask }: { mask?: 'cpf' | 'telefone' | 'cep' }) {
  const { register, setValue } = useForm<{ field: string }>();
  return (
    <form>
      <FormField
        label="Campo"
        name="field"
        register={register}
        mask={mask}
        setValue={mask ? setValue : undefined}
      />
    </form>
  );
}

describe('FormField', () => {
  it('renderiza sem erros com props mínimas', () => {
    render(<Wrapper />);
    expect(screen.getByLabelText('Campo')).toBeTruthy();
  });

  it('exibe label corretamente', () => {
    render(<Wrapper />);
    expect(screen.getByText('Campo')).toBeTruthy();
  });

  it('formata CPF ao digitar', () => {
    render(<Wrapper mask="cpf" />);
    const input = screen.getByLabelText('Campo') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '12345678901' } });
    expect(input.value).toBe('123.456.789-01');
  });

  it('formata CEP ao digitar', () => {
    render(<Wrapper mask="cep" />);
    const input = screen.getByLabelText('Campo') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '12345678' } });
    expect(input.value).toBe('12345-678');
  });

  it('sem mask preserva comportamento original', () => {
    render(<Wrapper />);
    const input = screen.getByLabelText('Campo') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'texto livre' } });
    expect(input.value).toBe('texto livre');
  });
});
