import styles from './PlanSummaryCard.module.css';

interface InfoRow {
  label: string;
  value: React.ReactNode;
  isPrice?: boolean;
}

interface PlanSummaryCardProps {
  planTitle: string;
  conditionsHref: string;
  note: string;
  infoCol1: InfoRow[];
  infoCol2: InfoRow[];
}

function InfoRowItem({ label, value, isPrice }: InfoRow) {
  return (
    <div className={styles.infoRow}>
      <span className={styles.k}>{label}</span>
      <span className={isPrice ? styles.vPrice : styles.v}>{value}</span>
    </div>
  );
}

export default function PlanSummaryCard({
  planTitle,
  conditionsHref,
  note,
  infoCol1,
  infoCol2,
}: PlanSummaryCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.head}>{planTitle}</div>
      <div className={styles.body}>
        <div className={styles.brandCell}>
          <span className={styles.logo}>
            <svg width="120" height="38" viewBox="0 0 130 36" aria-label="Sabemi">
              <path d="M4 30 L18 6 L32 30 Z" fill="#004077"/>
              <text x="38" y="24" fontFamily="var(--font-sans)" fontSize="22" fontWeight="800" fill="#004077" letterSpacing="-0.5">Sabemi</text>
            </svg>
          </span>
          <a href={conditionsHref} className={styles.pdf}>Condições Gerais</a>
          <div className={styles.note}>{note}</div>
        </div>
        <div className={styles.infoCell}>
          {infoCol1.map(row => <InfoRowItem key={row.label} {...row} />)}
        </div>
        <div className={styles.infoCell}>
          {infoCol2.map(row => <InfoRowItem key={row.label} {...row} />)}
        </div>
      </div>
    </div>
  );
}
