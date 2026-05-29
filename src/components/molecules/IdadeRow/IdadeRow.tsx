import styles from './IdadeRow.module.css';

interface IdadeRowProps {
  index: number;
  value: number;
  onChange: (i: number, value: number) => void;
  onRemove: (i: number) => void;
  canRemove: boolean;
}

export default function IdadeRow({ index, value, onChange, onRemove, canRemove }: IdadeRowProps) {
  return (
    <div className={styles.idadeRow}>
      <div className={styles.who}>
        Passageiro {index + 1}{index === 0 ? ' (titular)' : ''}
      </div>
      <input
        type="number"
        min={0}
        max={120}
        value={value}
        onChange={(e) => onChange(index, Number(e.target.value))}
        className={styles.input}
      />
      <button
        type="button"
        className={`${styles.remover} ${!canRemove ? styles.removerDisabled : ''}`}
        disabled={!canRemove}
        onClick={() => onRemove(index)}
      >
        Remover
      </button>
    </div>
  );
}
