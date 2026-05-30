'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FinanceiroFilterParams } from '@/lib/types/financeiro';
import styles from './FinanceiroFiltersCard.module.css';

const schema = z.object({
  dataInicio: z.string(),
  dataFim: z.string(),
  status: z.string(),
  valorMin: z.string(),
  valorMax: z.string(),
});

type FormData = z.infer<typeof schema>;

interface FinanceiroFiltersCardProps {
  isOpen?: boolean;
  onFilter: (params: FinanceiroFilterParams) => void;
  onClear: () => void;
}

export default function FinanceiroFiltersCard({ isOpen = true, onFilter, onClear }: FinanceiroFiltersCardProps) {
  const [open, setOpen] = useState(isOpen);
  const { register, handleSubmit, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { dataInicio: '', dataFim: '', status: '', valorMin: '', valorMax: '' },
  });

  function onSubmit(data: FormData) {
    onFilter(data);
  }

  function handleClear() {
    reset();
    onClear();
  }

  return (
    <div className={`${styles.filtersCard} ${!open ? styles.collapsed : ''}`}>
      <div className={styles.filtersHead}>
        <span>Filtrar faturas</span>
        <button
          className={styles.toggle}
          type="button"
          onClick={() => setOpen(prev => !prev)}
        >
          Mostrar / ocultar
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </button>
      </div>

      <form className={styles.filtersBody} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.filterRow}>
          <div className={styles.field}>
            <label>Data início</label>
            <input type="text" placeholder="dd/mm/aaaa" {...register('dataInicio')} />
          </div>
          <div className={styles.field}>
            <label>Data fim</label>
            <input type="text" placeholder="dd/mm/aaaa" {...register('dataFim')} />
          </div>
          <div className={styles.field}>
            <label>Status</label>
            <select {...register('status')}>
              <option value="">Todos os status</option>
              <option value="recebida">Recebida</option>
              <option value="aberta">Aberta</option>
              <option value="vencida">Vencida</option>
              <option value="processando">Processando</option>
            </select>
          </div>
          <div className={styles.field}>
            <label>Valor mínimo</label>
            <input type="text" placeholder="R$ 0,00" {...register('valorMin')} />
          </div>
          <div className={styles.field}>
            <label>Valor máximo</label>
            <input type="text" placeholder="R$ 0,00" {...register('valorMax')} />
          </div>
        </div>
        <div className={styles.filtersActions}>
          <button type="button" className={styles.btnClear} onClick={handleClear}>
            Limpar filtros
          </button>
          <button type="submit" className={styles.btnSearch}>
            Filtrar Faturas
          </button>
        </div>
      </form>
    </div>
  );
}
