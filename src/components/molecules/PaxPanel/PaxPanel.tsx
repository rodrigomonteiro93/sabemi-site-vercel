import Switch from '@/components/atoms/Switch';
import styles from './PaxPanel.module.css';

interface PaxPanelProps {
  count: number;
  useBirthdate: boolean;
  onToggleBirthdate: () => void;
  values: Record<string, string>;
  onChange: (key: string, value: string) => void;
}

export default function PaxPanel({ count, useBirthdate, onToggleBirthdate, values, onChange }: PaxPanelProps) {
  const inputs = Array.from({ length: count }, (_, i) => i + 1);
  return (
    <div className={styles.paxPanel}>
      <div className={styles.paxToggle}>
        <span className={styles.paxToggleLabel}>Data de Nascimento</span>
        <Switch checked={useBirthdate} onChange={onToggleBirthdate} id="birthSwitch" />
      </div>
      <div className={styles.paxInputs}>
        {inputs.map(i => {
          const key = (useBirthdate ? 'dob-' : 'age-') + i;
          return (
            <div key={key} className={styles.paxField}>
              <label>
                {useBirthdate ? 'Data de Nascimento Passageiro nº ' : 'Idade Passageiro nº '}{i}
              </label>
              <input
                type={useBirthdate ? 'date' : 'number'}
                min={useBirthdate ? undefined : 0}
                max={useBirthdate ? undefined : 120}
                placeholder={useBirthdate ? undefined : 'ex.: 35'}
                value={values[key] ?? ''}
                onChange={e => onChange(key, e.target.value)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
