'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { paxSchema, type PaxFormData } from '@/lib/types/carrinho';
import PaxSummaryCard from '@/components/molecules/PaxSummaryCard';
import FormField from '@/components/molecules/FormField';
import Button from '@/components/atoms/Button';
import styles from './PaxSection.module.css';

interface PaxSectionProps {
  index: number;
  total: number;
  isCollapsed: boolean;
  planName: string;
  ageRange: string;
  priceVista: string;
  motivo: string;
  destino: string;
  periodo: string;
  onToggle: () => void;
  onRemove: () => void;
  onMinimize: () => void;
  onSaveAndNext?: () => void;
}

export default function PaxSection({
  index,
  isCollapsed,
  planName,
  ageRange,
  priceVista,
  motivo,
  destino,
  periodo,
  onToggle,
  onRemove,
  onMinimize,
  onSaveAndNext,
}: PaxSectionProps) {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PaxFormData>({
    resolver: zodResolver(paxSchema),
    defaultValues: { plano: planName, tipoDoc: 'CPF', enderecoSource: 'informar', emergenciaSource: 'informar' },
  });

  const tipoDoc = watch('tipoDoc');

  return (
    <section className={`${styles.paxSection} ${isCollapsed ? styles.collapsed : ''}`}>
      <h2 className={styles.h2}>Inserir informações do passageiro {index}</h2>

      <div className={styles.paxCard}>
        <div className={styles.paxCardHead} onClick={onToggle}>
          <div className={styles.ttl}>
            Dados da sua viagem — {planName} | {ageRange}
          </div>
          <button
            className={styles.toggle}
            type="button"
            aria-label="Expandir / colapsar"
            onClick={(e) => { e.stopPropagation(); onToggle(); }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
          <button
            className={styles.x}
            type="button"
            aria-label="Remover"
            onClick={(e) => { e.stopPropagation(); onRemove(); }}
          >
            ×
          </button>
        </div>

        <PaxSummaryCard
          planName={planName}
          ageRange={ageRange}
          priceVista={priceVista}
          motivo={motivo}
          destino={destino}
          periodo={periodo}
        />

        <div className={styles.paxFillcta} onClick={onToggle}>
          Preencher dados do passageiro
        </div>
      </div>

      <div className={styles.paxFormSection}>
        <div className={styles.sectionTtl}>
          Dados para Emissão do Voucher
          <span className={styles.ageTag}>{ageRange}</span>
        </div>

        <div className={`${styles.formRow} ${styles.cols2}`}>
          <FormField
            label="Qual documento deseja informar?"
            name="tipoDoc"
            register={register}
            type="select"
            options={[
              { value: 'CPF', label: 'CPF' },
              { value: 'Passaporte', label: 'Passaporte' },
              { value: 'RG', label: 'RG' },
            ]}
          />
          <FormField
            label="CPF *"
            name="documento"
            register={register}
            setValue={tipoDoc === 'CPF' ? setValue : undefined}
            mask={tipoDoc === 'CPF' ? 'cpf' : undefined}
            type="text"
            placeholder="000.000.000-00"
            error={errors.documento?.message}
          />
        </div>

        <div className={`${styles.formRow} ${styles.cols2}`}>
          <FormField label="Plano *" name="plano" register={register} type="text" />
          <FormField
            label="Nome Completo *"
            name="nome"
            register={register}
            type="text"
            error={errors.nome?.message}
          />
        </div>

        <div className={styles.formRow}>
          <FormField
            label="E-mail *"
            name="email"
            register={register}
            type="email"
            error={errors.email?.message}
          />
          <FormField
            label="Telefone *"
            name="telefone"
            register={register}
            setValue={setValue}
            mask="telefone"
            type="tel"
            placeholder="(00) 00000-0000"
            error={errors.telefone?.message}
          />
          <FormField
            label="Data de Nascimento *"
            name="nascimento"
            register={register}
            setValue={setValue}
            mask="data"
            type="text"
            placeholder="dd/mm/aaaa"
            error={errors.nascimento?.message}
          />
        </div>

        <div className={styles.sectionTtl} style={{ marginTop: 12 }}>
          Endereço
        </div>
        <div className={`${styles.formRow} ${styles.endereco}`}>
          <FormField
            label="Utilizar endereços de:"
            name="enderecoSource"
            register={register}
            type="select"
            options={[
              { value: 'informar', label: 'Informar endereço' },
              { value: 'agencia', label: 'Endereço da agência' },
              { value: 'outro', label: 'Outro cadastro' },
            ]}
          />
          <FormField
            label="CEP *"
            name="cep"
            register={register}
            setValue={setValue}
            mask="cep"
            type="text"
            placeholder="00000-000"
            error={errors.cep?.message}
          />
          <FormField
            label="Endereço *"
            name="endereco"
            register={register}
            type="text"
            error={errors.endereco?.message}
          />
          <FormField
            label="Bairro *"
            name="bairro"
            register={register}
            type="text"
            error={errors.bairro?.message}
          />
        </div>
        <div className={`${styles.formRow} ${styles.endereco2}`}>
          <FormField
            label="Estado *"
            name="estado"
            register={register}
            type="select"
            options={[
              { value: '', label: 'Selecione' },
              { value: 'RS', label: 'RS' },
              { value: 'SP', label: 'SP' },
              { value: 'RJ', label: 'RJ' },
            ]}
            error={errors.estado?.message}
          />
          <FormField
            label="Cidade *"
            name="cidade"
            register={register}
            type="select"
            options={[{ value: '', label: 'Selecione' }]}
            error={errors.cidade?.message}
          />
          <FormField
            label="Número *"
            name="numero"
            register={register}
            type="text"
            error={errors.numero?.message}
          />
          <FormField label="Complemento" name="complemento" register={register} type="text" />
        </div>

        <hr className={styles.sectionDivider} />

        <div className={styles.sectionTtl}>Contato no Brasil em caso de emergência</div>
        <div className={`${styles.formRow} ${styles.emergencia}`}>
          <FormField
            label="Utilizar contato de:"
            name="emergenciaSource"
            register={register}
            type="select"
            options={[
              { value: 'informar', label: 'Informar contato' },
              { value: 'mesmo', label: 'Mesmo passageiro' },
            ]}
          />
          <FormField
            label="Nome Contato *"
            name="emergenciaNome"
            register={register}
            type="text"
            error={errors.emergenciaNome?.message}
          />
          <FormField
            label="Telefone Completo *"
            name="emergenciaTel"
            register={register}
            setValue={setValue}
            mask="telefone"
            type="tel"
            placeholder="(00) 00000-0000"
            error={errors.emergenciaTel?.message}
          />
          <FormField
            label="E-mail Contato"
            name="emergenciaEmail"
            register={register}
            type="email"
            placeholder="(opcional)"
          />
        </div>

        <div className={styles.formActions}>
          <Button variant="outline" onClick={onMinimize}>
            Minimizar
          </Button>
          {onSaveAndNext && (
            <Button variant="primary" onClick={onSaveAndNext}>
              Salvar e ir para passageiro {index + 1}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
