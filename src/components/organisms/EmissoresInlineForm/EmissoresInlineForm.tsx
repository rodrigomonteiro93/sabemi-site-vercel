'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import FormField from '@/components/molecules/FormField';
import { EmissorItem, EmissorFormData } from '@/lib/types/emissores';
import styles from './EmissoresInlineForm.module.css';

const schema = z.object({
  perfil: z.enum(['emissor', 'financeiro'], { required_error: 'Obrigatório' }),
  nome: z.string().min(1, 'Obrigatório'),
  email: z.string().email('E-mail inválido'),
  senha: z.string().min(6, 'Mínimo 6 caracteres'),
  confirmarSenha: z.string().min(6, 'Mínimo 6 caracteres'),
  tel: z.string().min(1, 'Obrigatório'),
  cpf: z.string().min(11, 'CPF inválido'),
  comissao: z.string().optional().default(''),
}).refine(d => d.senha === d.confirmarSenha, {
  message: 'Senhas não conferem',
  path: ['confirmarSenha'],
});

type FormValues = z.infer<typeof schema>;

interface EmissoresInlineFormProps {
  isOpen: boolean;
  editingItem: EmissorItem | null;
  onClose: () => void;
  onSave: (data: EmissorFormData, editingId: number | null) => void;
}

const PERFIL_OPTIONS = [
  { value: 'emissor', label: 'Emissor' },
  { value: 'financeiro', label: 'Financeiro' },
];

export default function EmissoresInlineForm({ isOpen, editingItem, onClose, onSave }: EmissoresInlineFormProps) {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (editingItem) {
      reset({
        perfil: editingItem.perfil,
        nome: editingItem.nome,
        email: editingItem.email,
        senha: '',
        confirmarSenha: '',
        tel: editingItem.tel,
        cpf: editingItem.cpf,
        comissao: editingItem.comissao !== null ? editingItem.comissao.toFixed(2).replace('.', ',') : '',
      });
    } else {
      reset({ perfil: 'emissor', nome: '', email: '', senha: '', confirmarSenha: '', tel: '', cpf: '', comissao: '' });
    }
  }, [editingItem, isOpen, reset]);

  function onSubmit(data: FormValues) {
    onSave(data as EmissorFormData, editingItem?.id ?? null);
  }

  const title = editingItem ? `Editar emissor — ${editingItem.nome}` : 'Cadastrar novo emissor';
  const submitLabel = editingItem ? 'Salvar alterações' : 'Cadastrar';

  return (
    <div className={isOpen ? styles.formCard : styles.formCardCollapsed}>
      <div className={styles.formCardHead}>
        <span className={styles.ttl}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <line x1="20" y1="8" x2="20" y2="14"/>
            <line x1="23" y1="11" x2="17" y2="11"/>
          </svg>
          <span>{title}</span>
        </span>
        <button className={styles.close} type="button" onClick={onClose}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>

      <div className={styles.formCardBody}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={`${styles.formRow} ${styles.r3}`}>
            <FormField<FormValues>
              label="Perfil *"
              name="perfil"
              register={register}
              type="select"
              options={PERFIL_OPTIONS}
              error={errors.perfil?.message}
            />
            <FormField<FormValues>
              label="Nome Completo *"
              name="nome"
              register={register}
              type="text"
              error={errors.nome?.message}
            />
            <FormField<FormValues>
              label="E-mail *"
              name="email"
              register={register}
              type="email"
              placeholder="email@sabemi.com.br"
              error={errors.email?.message}
            />
          </div>

          <div className={`${styles.formRow} ${styles.r2}`}>
            <FormField<FormValues>
              label="Senha *"
              name="senha"
              register={register}
              type="password"
              showToggle
              error={errors.senha?.message}
            />
            <FormField<FormValues>
              label="Confirmar Senha *"
              name="confirmarSenha"
              register={register}
              type="password"
              showToggle
              error={errors.confirmarSenha?.message}
            />
          </div>

          <div className={`${styles.formRow} ${styles.r3}`}>
            <FormField<FormValues>
              label="Telefone *"
              name="tel"
              register={register}
              type="tel"
              placeholder="(99) 9999.9999"
              error={errors.tel?.message}
            />
            <FormField<FormValues>
              label="CPF *"
              name="cpf"
              register={register}
              type="text"
              placeholder="999.999.999-99"
              error={errors.cpf?.message}
            />
            <FormField<FormValues>
              label="Comissão (%)"
              name="comissao"
              register={register}
              type="text"
              placeholder="N/F (padrão)"
            />
          </div>

          <div className={styles.formActions}>
            <button type="button" className={styles.btnCancel} onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className={styles.btnCadastrar} disabled={isSubmitting}>
              {isSubmitting ? 'Salvando...' : submitLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
