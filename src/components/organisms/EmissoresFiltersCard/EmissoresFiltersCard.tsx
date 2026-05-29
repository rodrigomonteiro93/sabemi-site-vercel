'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import FormField from '@/components/molecules/FormField';
import { EmissoresFilterParams } from '@/lib/types/emissores';
import styles from './EmissoresFiltersCard.module.css';

const schema = z.object({
  search: z.string().default(''),
  perfil: z.string().default(''),
  status: z.string().default(''),
  temComissao: z.string().default(''),
});

type FormValues = z.infer<typeof schema>;

interface EmissoresFiltersCardProps {
  onFilter: (params: EmissoresFilterParams) => void;
  onClear: () => void;
}

const PERFIL_OPTIONS = [
  { value: '', label: 'Todos os perfis' },
  { value: 'emissor', label: 'Emissor' },
  { value: 'financeiro', label: 'Financeiro' },
];

const STATUS_OPTIONS = [
  { value: '', label: 'Todos' },
  { value: 'ativo', label: 'Ativos' },
  { value: 'inativo', label: 'Inativos' },
];

const COMISSAO_OPTIONS = [
  { value: '', label: 'Todos' },
  { value: 'sim', label: 'Sim' },
  { value: 'nao', label: 'Não' },
];

export default function EmissoresFiltersCard({ onFilter, onClear }: EmissoresFiltersCardProps) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const { register, handleSubmit, reset } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { search: '', perfil: '', status: '', temComissao: '' },
  });

  function onSubmit(data: FormValues) {
    onFilter(data as EmissoresFilterParams);
  }

  function handleClear() {
    reset();
    onClear();
  }

  return (
    <div className={`${styles.filtersCard} ${isCollapsed ? styles.collapsed : ''}`}>
      <div className={styles.filtersHead}>
        <span>Filtrar emissores</span>
        <button
          className={styles.toggle}
          type="button"
          onClick={() => setIsCollapsed(v => !v)}
        >
          Mostrar / ocultar
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </button>
      </div>

      {!isCollapsed && (
        <div className={styles.filtersBody}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.filterRow}>
              <FormField<FormValues>
                label="Nome, e-mail ou CPF"
                name="search"
                register={register}
                type="text"
                placeholder="Buscar..."
              />
              <FormField<FormValues>
                label="Perfil"
                name="perfil"
                register={register}
                type="select"
                options={PERFIL_OPTIONS}
              />
              <FormField<FormValues>
                label="Status"
                name="status"
                register={register}
                type="select"
                options={STATUS_OPTIONS}
              />
              <FormField<FormValues>
                label="Tem comissão custom?"
                name="temComissao"
                register={register}
                type="select"
                options={COMISSAO_OPTIONS}
              />
            </div>

            <div className={styles.filtersActions}>
              <button type="button" className={styles.btnClear} onClick={handleClear}>
                Limpar filtros
              </button>
              <button type="submit" className={styles.btnSearch}>
                Filtrar
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
