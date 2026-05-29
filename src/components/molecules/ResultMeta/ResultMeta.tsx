import styles from './ResultMeta.module.css';

interface ResultMetaProps {
  destination: string;
  dateFrom: string;
  dateTo: string;
  days: number;
  pax: number;
  sortBy: string;
  onSortChange: (value: string) => void;
}

export default function ResultMeta({ destination, dateFrom, dateTo, days, pax, sortBy, onSortChange }: ResultMetaProps) {
  return (
    <div className={styles.resultMeta}>
      <h1 className={styles.title}>
        Planos para {destination}
        <small>{dateFrom} → {dateTo} · {days} dias · {pax} passageiro{pax !== 1 ? 's' : ''}</small>
      </h1>
      <label className={styles.sort}>
        Ordenar por
        <select value={sortBy} onChange={(e) => onSortChange(e.target.value)}>
          <option>Menor preço</option>
          <option>Maior cobertura médica</option>
          <option>Mais vendidos</option>
          <option>Por seguradora</option>
        </select>
      </label>
    </div>
  );
}
