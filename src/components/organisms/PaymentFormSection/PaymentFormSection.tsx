'use client';

import { useState } from 'react';
import CardIconsGroup from '@/components/molecules/CardIconsGroup';
import FaturadoInfo from '@/components/molecules/FaturadoInfo';
import PayPlaceholder from '@/components/molecules/PayPlaceholder';
import styles from './PaymentFormSection.module.css';

interface PaymentFormSectionProps {
  agencia: string;
  pax: string[];
  valorCartao: number;
  onMethodChange?: (method: string) => void;
}

function formatCardNumber(e: React.ChangeEvent<HTMLInputElement>) {
  const v = e.target.value.replace(/\D/g, '').slice(0, 16);
  e.target.value = v.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
}

function BoletoFields({ agencia, pax }: { agencia: string; pax: string[] }) {
  return (
    <div className={styles.field}>
      <label className={styles.label}>Pagador</label>
      <select id="boletoPagador" className={styles.select}>
        <option value="agencia">{agencia}</option>
        {pax.map((nome, i) => (
          <option key={i} value={`pax-${i}`}>{nome} (Passageiro {i + 1})</option>
        ))}
      </select>
      <span className={styles.helper}>O boleto será emitido em nome do pagador selecionado.</span>
    </div>
  );
}

function CartaoFields({ valorCartao }: { valorCartao: number }) {
  const installments = Array.from({ length: 10 }, (_, i) => {
    const n = i + 1;
    const v = (valorCartao / n).toFixed(2).replace('.', ',');
    return { n, label: `${n}x - R$ ${v}${n === 1 ? '' : ' sem juros'}` };
  });

  return (
    <>
      <CardIconsGroup />
      <div className={styles.field}>
        <label className={styles.label}>Número do cartão *</label>
        <input
          type="text"
          placeholder="0000 0000 0000 0000"
          maxLength={19}
          onChange={formatCardNumber}
          className={styles.input}
        />
      </div>
      <div className={styles.field}>
        <label className={styles.label}>Nome impresso no cartão *</label>
        <input
          type="text"
          placeholder="Como escrito no cartão"
          className={`${styles.input} ${styles.uppercase}`}
        />
      </div>
      <div className={styles.fieldRow}>
        <div className={styles.field}>
          <label className={styles.label}>Validade *</label>
          <select className={styles.select}>
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i}>{String(i + 1).padStart(2, '0')}</option>
            ))}
          </select>
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Ano *</label>
          <select className={styles.select}>
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i}>{2026 + i}</option>
            ))}
          </select>
        </div>
      </div>
      <div className={styles.field}>
        <label className={styles.label}>CVV *</label>
        <input
          type="text"
          placeholder="000"
          maxLength={4}
          inputMode="numeric"
          className={styles.input}
        />
      </div>
      <div className={styles.field}>
        <label className={styles.label}>Parcelado *</label>
        <select className={styles.select}>
          {installments.map(({ n, label }) => (
            <option key={n}>{label}</option>
          ))}
        </select>
      </div>
    </>
  );
}

const PIX_ICON = (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2 L22 12 L12 22 L2 12 Z"/>
    <path d="M7 7 L12 12 L7 17"/>
    <path d="M17 7 L12 12 L17 17"/>
  </svg>
);

const LINK_ICON = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
  </svg>
);

export default function PaymentFormSection({
  agencia,
  pax,
  valorCartao,
  onMethodChange,
}: PaymentFormSectionProps) {
  const [method, setMethod] = useState('');

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value;
    setMethod(value);
    onMethodChange?.(value);
  }

  return (
    <div>
      <h2 className={styles.title}>Forma de pagamento</h2>

      <div className={styles.field}>
        <label className={styles.label}>Forma de pagamento *</label>
        <select
          id="paymentMethod"
          value={method}
          onChange={handleChange}
          className={styles.select}
        >
          <option value="">Selecione...</option>
          <option value="faturado">FATURADO</option>
          <option value="cartao">CARTÃO DE CRÉDITO</option>
          <option value="boleto">BOLETO</option>
          <option value="pix">PIX</option>
          <option value="link">LINK DE PAGAMENTO</option>
        </select>
      </div>

      {method === 'faturado' && <FaturadoInfo agencia={agencia} />}
      {method === 'boleto' && <BoletoFields agencia={agencia} pax={pax} />}
      {method === 'cartao' && <CartaoFields valorCartao={valorCartao} />}
      {method === 'pix' && (
        <PayPlaceholder
          icon={PIX_ICON}
          title="Pagamento via Pix"
          description="Ao finalizar, será exibido o QR Code e o código copia-e-cola. O pagamento é processado em segundos."
        />
      )}
      {method === 'link' && (
        <PayPlaceholder
          icon={LINK_ICON}
          title="Link de pagamento"
          description="Um link de pagamento será gerado e enviado por e-mail e WhatsApp para o cliente. Ele poderá escolher cartão, Pix ou boleto."
        />
      )}
    </div>
  );
}
