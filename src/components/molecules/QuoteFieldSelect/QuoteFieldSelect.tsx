'use client';
import styles from './QuoteFieldSelect.module.css';

interface SelectOption {
  value: string;
  label: string;
  group?: string;
}
interface SelectGroup {
  label: string;
  options: SelectOption[];
}
interface QuoteFieldSelectProps {
  label: string;
  icon?: React.ReactNode;
  groups?: SelectGroup[];
  options?: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function QuoteFieldSelect({
  label, icon, groups, options, value, onChange, placeholder,
}: QuoteFieldSelectProps) {
  const displayValue = value
    ? (groups
        ? groups.flatMap(g => g.options).find(o => o.value === value)?.label
        : options?.find(o => o.value === value)?.label) ?? value
    : placeholder ?? '';

  return (
    <div className={[styles.qfield, styles.hasSelect].join(' ')}>
      {icon && <span className={styles.ico}>{icon}</span>}
      <div className={styles.col}>
        <label>{label}</label>
        <span className={[styles.value, !value ? styles.placeholder : ''].join(' ')}>
          {displayValue}
        </span>
      </div>
      <span className={styles.chev}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </span>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        aria-label={label}
        className={styles.selectOverlay}
      >
        {!value && <option value="">{placeholder}</option>}
        {groups
          ? groups.map(g => (
              <optgroup key={g.label} label={g.label}>
                {g.options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </optgroup>
            ))
          : options?.map(o => <option key={o.value} value={o.value}>{o.label}</option>)
        }
      </select>
    </div>
  );
}
