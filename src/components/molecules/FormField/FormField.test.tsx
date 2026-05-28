import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useForm } from 'react-hook-form';
import { describe, it, expect } from 'vitest';
import FormField from './FormField';

interface TestFormValues {
  nome: string;
  tipo: string;
  senha: string;
}

function InputFieldWrapper(props: Omit<React.ComponentProps<typeof FormField<TestFormValues>>, 'register' | 'name'> & { name?: keyof TestFormValues }) {
  const { register } = useForm<TestFormValues>();
  return (
    <FormField
      label={props.label}
      name={props.name ?? 'nome'}
      register={register}
      type={props.type}
      placeholder={props.placeholder}
      options={props.options}
      showToggle={props.showToggle}
      id={props.id}
    />
  );
}

describe('FormField', () => {
  it('renders input with floating label', () => {
    render(<InputFieldWrapper label="Seu nome completo *" placeholder="Seu nome completo" />);

    expect(screen.getByText('Seu nome completo *')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Seu nome completo')).toBeInTheDocument();
  });

  it('renders select with options', () => {
    render(
      <InputFieldWrapper
        label="Tipo Cadastro *"
        name="tipo"
        type="select"
        options={[
          { value: 'corretora', label: 'Corretora' },
          { value: 'agencia', label: 'Agência de Viagem' },
        ]}
      />,
    );

    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Corretora' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Agência de Viagem' })).toBeInTheDocument();
  });

  it('shows pwd-toggle button when showToggle=true', () => {
    render(
      <InputFieldWrapper
        label="Senha *"
        name="senha"
        type="password"
        showToggle
        id="pwd1"
      />,
    );

    expect(screen.getByRole('button', { name: 'Mostrar senha' })).toBeInTheDocument();
  });

  it('toggles password field visibility', async () => {
    const user = userEvent.setup();

    render(
      <InputFieldWrapper
        label="Senha *"
        name="senha"
        type="password"
        showToggle
        id="pwd1"
      />,
    );

    const input = document.getElementById('pwd1') as HTMLInputElement;
    expect(input).toHaveAttribute('type', 'password');

    await user.click(screen.getByRole('button', { name: 'Mostrar senha' }));
    expect(input).toHaveAttribute('type', 'text');

    await user.click(screen.getByRole('button', { name: 'Ocultar senha' }));
    expect(input).toHaveAttribute('type', 'password');
  });
});
