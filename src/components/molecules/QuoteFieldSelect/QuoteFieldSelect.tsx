'use client';

import { useState, useEffect, useCallback, useId } from 'react';
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
  const [open, setOpen] = useState(false);
  const listId = useId();

  const displayValue = value
    ? (groups
        ? groups.flatMap(g => g.options).find(o => o.value === value)?.label
        : options?.find(o => o.value === value)?.label) ?? value
    : placeholder ?? '';

  const handleDocClick = useCallback((e: MouseEvent) => {
    const target = e.target as Element;
    if (!target.closest('[data-quote-select]')) {
      setOpen(false);
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(() => document.addEventListener('click', handleDocClick), 0);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('click', handleDocClick);
    };
  }, [open, handleDocClick]);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  function selectOption(next: string) {
    onChange(next);
    setOpen(false);
  }

  const optionButtons = groups
    ? groups.map(g => (
        <div key={g.label} role="group" aria-label={g.label} className={styles.group}>
          <div className={styles.groupLabel}>{g.label}</div>
          {g.options.map(o => (
            <button
              key={o.value}
              type="button"
              role="option"
              aria-selected={value === o.value}
              className={[styles.option, value === o.value && styles.optionSelected].filter(Boolean).join(' ')}
              onClick={() => selectOption(o.value)}
            >
              {o.label}
            </button>
          ))}
        </div>
      ))
    : options?.map(o => (
        <button
          key={o.value}
          type="button"
          role="option"
          aria-selected={value === o.value}
          className={[styles.option, value === o.value && styles.optionSelected].filter(Boolean).join(' ')}
          onClick={() => selectOption(o.value)}
        >
          {o.label}
        </button>
      ));

  return (
    <div
      className={[styles.qfield, styles.hasSelect, open && styles.open].filter(Boolean).join(' ')}
      data-quote-select
    >
      <button
        type="button"
        className={styles.trigger}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={listId}
        aria-label={label}
        onClick={() => setOpen(prev => !prev)}
      >
        {icon && <span className={styles.ico}>{icon}</span>}
        <span className={styles.col}>
          <span className={styles.fieldLabel}>{label}</span>
          <span className={[styles.value, !value && styles.placeholder].filter(Boolean).join(' ')}>
            {displayValue}
          </span>
        </span>
        <span className={styles.chev} aria-hidden>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </span>
      </button>

      {open && (
        <div id={listId} className={styles.popover} role="listbox" aria-label={label}>
          <div className={styles.popoverInner}>{optionButtons}</div>
        </div>
      )}
    </div>
  );
}
