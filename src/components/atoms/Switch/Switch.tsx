'use client';
import styles from './Switch.module.css';

interface SwitchProps {
  checked: boolean;
  onChange: () => void;
  id?: string;
}

export default function Switch({ checked, onChange, id }: SwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      id={id}
      className={[styles.switch, checked ? styles.on : ''].join(' ')}
      onClick={onChange}
    >
      <span className={[styles.thumb, checked ? styles.thumbOn : ''].join(' ')} />
    </button>
  );
}
