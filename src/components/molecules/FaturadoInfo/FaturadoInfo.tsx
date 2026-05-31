import styles from './FaturadoInfo.module.css';

interface FaturadoInfoProps {
  agencia: string;
}

export default function FaturadoInfo({ agencia }: FaturadoInfoProps) {
  return (
    <div className={styles.container}>
      <span className={styles.ico}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
      </span>
      <div className={styles.txt}>
        <div className={styles.t}>Pagamento faturado para a agência</div>
        <div className={styles.d}>
          A cobrança será incluída na fatura mensal da <b>{agencia}</b>, conforme o contrato de parceria. Não é necessário informar dados de pagamento.
        </div>
      </div>
    </div>
  );
}
