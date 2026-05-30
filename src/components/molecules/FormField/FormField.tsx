'use client';

import { useState } from 'react';
import {
  UseFormRegister,
  UseFormSetValue,
  FieldValues,
  Path,
  PathValue,
} from 'react-hook-form';
import { applyMask, MaskType } from '@/lib/utils/masks';
import styles from './FormField.module.css';

export interface SelectOption {
  value: string;
  label: string;
}

export interface FormFieldProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  type?: 'text' | 'email' | 'tel' | 'password' | 'select';
  placeholder?: string;
  id?: string;
  options?: SelectOption[];
  showToggle?: boolean;
  error?: string;
  mask?: MaskType;
  setValue?: UseFormSetValue<T>;
}

export default function FormField<T extends FieldValues>({
  label,
  name,
  register,
  type = 'text',
  placeholder,
  id,
  options,
  showToggle = false,
  error,
  mask,
  setValue,
}: FormFieldProps<T>) {
  const [showingPwd, setShowingPwd] = useState(false);
  const inputId = id ?? String(name);

  const { onChange: rhfOnChange, ...rest } = register(name);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (mask && setValue) {
      const masked = applyMask(e.target.value, mask);
      e.target.value = masked;
      setValue(name, masked as PathValue<T, Path<T>>, { shouldValidate: true });
    } else {
      rhfOnChange(e);
    }
  };

  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={inputId}>{label}</label>

      {type === 'select' ? (
        <select
          className={styles.select}
          id={inputId}
          {...register(name)}
        >
          {options?.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          className={styles.input}
          type={showToggle ? (showingPwd ? 'text' : 'password') : type}
          placeholder={placeholder}
          id={inputId}
          {...rest}
          onChange={handleChange}
        />
      )}

      {showToggle && (
        <button
          type="button"
          className={styles.pwdToggle}
          aria-label={showingPwd ? 'Ocultar senha' : 'Mostrar senha'}
          onClick={() => setShowingPwd((p) => !p)}
        >
          {showingPwd ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
              <line x1="1" y1="1" x2="23" y2="23"/>
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
          )}
        </button>
      )}

      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}
