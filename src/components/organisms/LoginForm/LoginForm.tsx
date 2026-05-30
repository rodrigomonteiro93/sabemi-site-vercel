'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import FormField from '@/components/molecules/FormField/FormField';
import Button from '@/components/atoms/Button/Button';
import styles from './LoginForm.module.css';

const schema = z.object({
  userId:   z.string().min(1, 'Obrigatório'),
  password: z.string().min(1, 'Obrigatório'),
  remember: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof schema>;

export default function LoginForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(schema),
    defaultValues: { remember: false },
  });

  async function onSubmit(data: LoginFormValues) {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: data.userId, password: data.password }),
    });

    if (res.ok) {
      router.push('/dashboard');
    } else {
      const body = await res.json();
      setError('root', { message: body.error ?? 'Credenciais inválidas' });
    }
  }

  return (
    <>
      <h1 className={styles.title}>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.fieldRow}>
          <FormField
            label="CPF / CNPJ *"
            name="userId"
            register={register}
            type="text"
            placeholder="000.000.000-00"
            id="userId"
            error={errors.userId?.message}
          />
          <FormField
            label="Senha *"
            name="password"
            register={register}
            type="password"
            id="userPwd"
            showToggle
            error={errors.password?.message}
          />
        </div>

        {errors.root?.message && (
          <p className={styles.rootError}>{errors.root.message}</p>
        )}

        <label className={styles.remember}>
          <input type="checkbox" {...register('remember')} />
          Lembrar senha
        </label>

        <div className={styles.submitWrap}>
          <Button variant="outline" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Entrando...' : 'Entrar'}
          </Button>
        </div>

        <a href="#" className={styles.forgot}>Esqueceu sua senha?</a>
      </form>
    </>
  );
}
