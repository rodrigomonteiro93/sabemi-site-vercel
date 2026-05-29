import styles from './CancelPrazoCard.module.css';

export default function CancelPrazoCard() {
  return (
    <div className={styles.prazo}>
      <div className={styles.head}>Prazo para cancelamento do contrato</div>
      <div className={styles.body}>
        O prazo máximo para cancelamento é de até 24 horas antes do início da vigência do seguro.
        Após esse prazo o serviço já estará sendo prestado, não poderá mais ser cancelado e não
        haverá reembolso de valores pagos.
      </div>
    </div>
  );
}
