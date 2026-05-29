'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import FormField from '@/components/molecules/FormField/FormField';
import { VouchersFilterParams } from '@/lib/types/vouchers';
import styles from './VouchersFiltersCard.module.css';

const schema = z.object({
  numeroPedido: z.string().optional(),
  nomePassageiro: z.string().optional(),
  cpf: z.string().optional(),
  emissaoInicio: z.string().optional(),
  emissaoFim: z.string().optional(),
  dataIda: z.string().optional(),
  dataVolta: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface VouchersFiltersCardProps {
  isOpen: boolean;
  onFilter: (params: VouchersFilterParams) => void;
  onClear: () => void;
}

export default function VouchersFiltersCard({ isOpen, onFilter, onClear }: VouchersFiltersCardProps) {
  const { register, handleSubmit, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      numeroPedido: '', nomePassageiro: '', cpf: '',
      emissaoInicio: '', emissaoFim: '', dataIda: '', dataVolta: '',
    },
  });

  const onSubmit = (data: FormData) => onFilter(data);

  const handleClear = () => {
    reset();
    onClear();
  };

  return (
    <div className={`${styles.filtersCard} ${!isOpen ? styles.collapsed : ''}`}>
      <div className={styles.filtersHead}>Vouchers — Filtrar Busca</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.filtersBody}>
          <div className={`${styles.row} ${styles.r3}`}>
            <FormField label="Número do pedido" name="numeroPedido" register={register} placeholder="0000000" />
            <FormField label="Nome passageiro" name="nomePassageiro" register={register} placeholder="nome do passageiro" />
            <FormField label="CPF" name="cpf" register={register} placeholder="999.999.999-99" />
          </div>
          <div className={`${styles.row} ${styles.r2}`}>
            <FormField label="Data da emissão início" name="emissaoInicio" register={register} placeholder="dd/mm/aaaa" />
            <FormField label="Data da emissão fim" name="emissaoFim" register={register} placeholder="dd/mm/aaaa" />
          </div>
          <div className={`${styles.row} ${styles.r2}`}>
            <FormField label="Data de ida" name="dataIda" register={register} placeholder="dd/mm/aaaa" />
            <FormField label="Data de volta" name="dataVolta" register={register} placeholder="dd/mm/aaaa" />
          </div>
          <div className={styles.filtersActions}>
            <button type="button" className={styles.btnClear} onClick={handleClear}>
              Limpar filtros
            </button>
            <button type="submit" className={styles.btnSearch}>
              Buscar voucher
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
