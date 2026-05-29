import styles from './TermsCheckbox.module.css';

interface TermsCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export default function TermsCheckbox({ checked, onChange }: TermsCheckboxProps) {
  return (
    <label className={styles.terms}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      Li e aceito os{' '}
      <a href="#">termos de uso</a>
      , condições gerais do seguro e cobertura do produto.
    </label>
  );
}
