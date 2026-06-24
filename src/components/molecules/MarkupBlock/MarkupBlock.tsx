'use client';
import { useState } from 'react';
import styles from './MarkupBlock.module.css';

interface MarkupBlockProps {
  value: number;
  hidden: boolean;
  onChange: (value: number) => void;
  onToggleHidden: () => void;
}

const TICKS = ['0','10','20','30','40','50','60','70','80','90'];

export default function MarkupBlock({ value, hidden, onChange, onToggleHidden }: MarkupBlockProps) {
  const [inputMode, setInputMode] = useState(false);
  const [inputValue, setInputValue] = useState(String(value));

  function toggleMode(e: React.MouseEvent) {
    e.preventDefault();
    if (inputMode) {
      let v = parseInt(inputValue, 10);
      if (isNaN(v)) v = 0;
      v = Math.max(0, Math.min(90, v));
      onChange(v);
      setInputValue(String(v));
      setInputMode(false);
    } else {
      setInputValue(String(value));
      setInputMode(true);
    }
  }

  return (
    <div className={styles.markupBlock}>
      <div className={styles.markupHead}>
        <div>
          <div className={styles.lh}>Ajustar Markup</div>
          <div className={styles.sub}>valores em %</div>
        </div>
        <button
          type="button"
          className={`${styles.eyeBtn} ${hidden ? styles.eyeBtnActive : ''}`}
          aria-label="Mostrar/ocultar markup e comissões"
          onClick={onToggleHidden}
        >
          {hidden ? (
            <svg className={styles.icoOff} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
          ) : (
            <svg className={styles.icoOn} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          )}
        </button>
      </div>
      {!hidden && (
        <>
          {!inputMode ? (
            <div className={styles.sliderMode}>
              <div className={styles.markupTicks}>
                {TICKS.map((t) => <span key={t}>{t}</span>)}
              </div>
              <input
                type="range"
                min={0}
                max={90}
                step={10}
                value={value}
                className={styles.markupSlider}
                style={{ '--val': `${(value / 90) * 100}%` } as React.CSSProperties}
                onChange={(e) => onChange(Number(e.target.value))}
              />
            </div>
          ) : (
            <div className={styles.inputMode}>
              <input
                type="number"
                min={0}
                max={90}
                step={1}
                value={inputValue}
                placeholder="0"
                onChange={(e) => setInputValue(e.target.value)}
              />
            </div>
          )}
          <div className={styles.markupHint}>
            <button type="button" className={styles.toggleLink} onClick={toggleMode}>
              {inputMode ? 'Clique aqui para deslizar' : 'Clique aqui para digitar'}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
