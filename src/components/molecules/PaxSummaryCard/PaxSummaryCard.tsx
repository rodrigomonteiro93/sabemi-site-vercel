import styles from './PaxSummaryCard.module.css';

interface PaxSummaryCardProps {
  planName: string;
  ageRange: string;
  priceVista: string;
  motivo: string;
  destino: string;
  periodo: string;
}

export default function PaxSummaryCard({
  priceVista,
  motivo,
  destino,
  periodo,
}: PaxSummaryCardProps) {
  return (
    <div className={styles.summary}>
      <div className={styles.brandCell}>
        <div className={styles.logo}>
          <svg width="120" height="38" viewBox="0 0 130 36" aria-label="Sabemi">
            <path d="M4 30 L18 6 L32 30 Z" fill="#004077" />
            <text
              x="38"
              y="24"
              fontFamily="Mulish, sans-serif"
              fontSize="22"
              fontWeight="800"
              fill="#004077"
              letterSpacing="-0.5"
            >
              Sabemi
            </text>
          </svg>
        </div>
        <a href="#" className={styles.pdf}>
          Condições gerais do seguro
        </a>
        <div className={styles.note}>
          *O seguro não é válido para pessoas que já se encontram no destino da viagem.
        </div>
      </div>

      <div className={styles.infoCell}>
        <div className={styles.infoRow}>
          <span className={styles.k}>Valor à vista</span>
          <span className={`${styles.v} ${styles.price}`}>R$ {priceVista}</span>
        </div>
        <div className={styles.infoRow}>
          <span className={styles.k}>Motivo</span>
          <span className={styles.v}>{motivo}</span>
        </div>
      </div>

      <div className={styles.infoCell}>
        <div className={styles.infoRow}>
          <span className={styles.k}>Destino</span>
          <span className={styles.v}>{destino}</span>
        </div>
        <div className={styles.infoRow}>
          <span className={styles.k}>Período</span>
          <span className={styles.v}>{periodo}</span>
        </div>
      </div>
    </div>
  );
}
