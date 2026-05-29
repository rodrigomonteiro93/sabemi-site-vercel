'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import FormField from '@/components/molecules/FormField';
import { ComissoesFilterParams } from '@/lib/types/comissoes';
import styles from './ComissoesFiltersCard.module.css';

const filtersSchema = z.object({
  dataInicio: z.string(),
  dataFim: z.string(),
  emissor: z.string(),
  status: z.string(),
});
type FiltersFormData = z.infer<typeof filtersSchema>;

interface ComissoesFiltersCardProps {
  onFilter: (params: ComissoesFilterParams) => void;
  onClear: () => void;
}

const EMISSOR_OPTIONS = [
  { value: '', label: 'Todos os emissores' },
  { value: 'Agência Teste', label: 'Agência Teste' },
  { value: 'Sua Corretora', label: 'Sua Corretora' },
  { value: 'Agência de Viagens', label: 'Agência de Viagens' },
  { value: 'João Teste', label: 'João Teste' },
];

const STATUS_OPTIONS = [
  { value: '', label: 'Todos os status' },
  { value: 'liberada', label: 'Liberada' },
  { value: 'aguardando', label: 'Aguardando' },
  { value: 'bloqueada', label: 'Bloqueada' },
];

export default function ComissoesFiltersCard({ onFilter, onClear }: ComissoesFiltersCardProps) {
  const [collapsed, setCollapsed] = useState(false);
  const { register, handleSubmit, reset } = useForm<FiltersFormData>({
    resolver: zodResolver(filtersSchema),
    defaultValues: { dataInicio: '', dataFim: '', emissor: '', status: '' },
  });

  function handleClear() {
    reset();
    onClear();
  }

  return (
    <div className={`${styles.filtersCard} ${collapsed ? styles.collapsed : ''}`}>
      <div className={styles.filtersHead}>
        <span>Filtrar comissões</span>
        <button className={styles.toggle} type="button" onClick={() => setCollapsed(c => !c)}>
          Mostrar / ocultar
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      </div>
      <div className={styles.filtersBody}>
        <form onSubmit={handleSubmit(data => onFilter(data))}>
          <div className={styles.filterRow}>
            <FormField<FiltersFormData>
              label="Data início"
              name="dataInicio"
              register={register}
              type="text"
              placeholder="dd/mm/aaaa"
            />
            <FormField<FiltersFormData>
              label="Data fim"
              name="dataFim"
              register={register}
              type="text"
              placeholder="dd/mm/aaaa"
            />
            <FormField<FiltersFormData>
              label="Emissor"
              name="emissor"
              register={register}
              type="select"
              options={EMISSOR_OPTIONS}
            />
            <FormField<FiltersFormData>
              label="Status"
              name="status"
              register={register}
              type="select"
              options={STATUS_OPTIONS}
            />
          </div>
          <div className={styles.filtersActions}>
            <button type="button" className={styles.btnClear} onClick={handleClear}>
              Limpar filtros
            </button>
            <button type="submit" className={styles.btnSearch}>
              Filtrar Dados
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
