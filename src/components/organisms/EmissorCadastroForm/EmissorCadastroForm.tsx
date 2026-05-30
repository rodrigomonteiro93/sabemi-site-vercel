'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { emissorSchema, type EmissorFormData } from '@/lib/types/emissor';
import FormField from '@/components/molecules/FormField';
import styles from './EmissorCadastroForm.module.css';

const PERFIL_OPTIONS = [
  { value: 'emissor', label: 'Emissor' },
  { value: 'financeiro', label: 'Financeiro' },
];

export default function EmissorCadastroForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<EmissorFormData>({
    resolver: zodResolver(emissorSchema),
  });

  async function onSubmit() {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 700));
    setIsSubmitting(false);
    setIsSuccess(true);
    setTimeout(() => router.push('/emissores'), 800);
  }

  return (
    <div className={styles.formCard}>
      <div className={styles.formCardHead}>
        <span className={styles.ico}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <line x1="20" y1="8" x2="20" y2="14" />
            <line x1="23" y1="11" x2="17" y2="11" />
          </svg>
        </span>
        <div className={styles.ttl}>
          Dados do emissor
          <small>O emissor receberá os dados de acesso por e-mail após o cadastro.</small>
        </div>
      </div>

      <div className={styles.formCardBody}>
        <form onSubmit={handleSubmit(onSubmit)}>

          <div className={styles.perfilHint}>
            <span className={styles.hintIco}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
            </span>
            <div>
              <b>Emissor</b> pode cotar e emitir vouchers em nome da agência.{' '}
              <b>Financeiro</b> tem acesso a comissões, faturas e relatórios financeiros, mas não emite.
            </div>
          </div>

          <div className={`${styles.formRow} ${styles.r3}`}>
            <FormField
              label="Perfil *"
              name="perfil"
              register={register}
              type="select"
              options={PERFIL_OPTIONS}
              error={errors.perfil?.message}
            />
            <FormField
              label="Nome Completo *"
              name="nome"
              register={register}
              type="text"
              error={errors.nome?.message}
            />
            <FormField
              label="E-mail *"
              name="email"
              register={register}
              type="email"
              placeholder="email@sabemi.com.br"
              error={errors.email?.message}
            />
          </div>

          <div className={`${styles.formRow} ${styles.r2}`}>
            <div>
              <FormField
                label="Senha *"
                name="senha"
                register={register}
                type="password"
                showToggle
                error={errors.senha?.message}
              />
              {!errors.senha && (
                <span className={styles.helper}>Mínimo de 8 caracteres com letras e números.</span>
              )}
            </div>
            <FormField
              label="Confirmar Senha *"
              name="confirmarSenha"
              register={register}
              type="password"
              showToggle
              error={errors.confirmarSenha?.message}
            />
          </div>

          <div className={`${styles.formRow} ${styles.r2}`}>
            <FormField
              label="Telefone *"
              name="telefone"
              register={register}
              setValue={setValue}
              mask="telefone"
              type="tel"
              placeholder="(99) 9999.9999"
              error={errors.telefone?.message}
            />
            <FormField
              label="CPF *"
              name="cpf"
              register={register}
              setValue={setValue}
              mask="cpf"
              type="text"
              placeholder="999.999.999-99"
              error={errors.cpf?.message}
            />
          </div>

          <div className={styles.formActions}>
            <button
              type="button"
              className={styles.btnCancel}
              onClick={() => router.push('/emissores')}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className={`${styles.btnCadastrar}${isSuccess ? ` ${styles.success}` : ''}`}
              disabled={isSubmitting || isSuccess}
            >
              {isSubmitting ? 'Cadastrando...' : isSuccess ? 'Cadastrado ✓' : 'Cadastrar'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
