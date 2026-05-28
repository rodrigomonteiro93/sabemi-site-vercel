'use client';
import { useState, useEffect, useCallback } from 'react';
import styles from './CalendarPopover.module.css';

const MONTHS_PT = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
const MONTHS_PT_SHORT = ['Jan','Fev','Mar','Abr','Maio','Jun','Jul','Ago','Set','Out','Nov','Dez'];
const WEEK_PT = ['DOM','SEG','TER','QUA','QUI','SEX','SÁB'];

function dateKey(d: Date) { return d.getFullYear() * 10000 + (d.getMonth()+1) * 100 + d.getDate(); }
function formatShort(d: Date) { return `${String(d.getDate()).padStart(2,'0')} ${MONTHS_PT_SHORT[d.getMonth()]}`; }

interface CalendarPopoverProps {
  isOpen: boolean;
  initialStart: Date;
  initialEnd: Date;
  onApply: (start: Date, end: Date) => void;
  onClose: () => void;
}

export default function CalendarPopover({ isOpen, initialStart, initialEnd, onApply, onClose }: CalendarPopoverProps) {
  const [pendingStart, setPendingStart] = useState<Date | null>(new Date(initialStart));
  const [pendingEnd, setPendingEnd]     = useState<Date | null>(new Date(initialEnd));
  const [calView, setCalView]           = useState<Date>(new Date(initialStart.getFullYear(), initialStart.getMonth(), 1));

  const TODAY = new Date(); TODAY.setHours(0,0,0,0);

  useEffect(() => {
    if (isOpen) {
      setPendingStart(new Date(initialStart));
      setPendingEnd(new Date(initialEnd));
      setCalView(new Date(initialStart.getFullYear(), initialStart.getMonth(), 1));
    }
  }, [isOpen, initialStart, initialEnd]);

  const handleDocClick = useCallback((e: MouseEvent) => {
    const target = e.target as Element;
    if (!target.closest('[data-cal-popover]') && !target.closest('[data-cal-trigger]')) {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => document.addEventListener('click', handleDocClick), 0);
    }
    return () => document.removeEventListener('click', handleDocClick);
  }, [isOpen, handleDocClick]);

  function pickDay(d: Date) {
    if (!pendingStart || (pendingStart && pendingEnd)) {
      setPendingStart(d); setPendingEnd(null);
    } else {
      if (d < pendingStart) { setPendingStart(d); setPendingEnd(null); }
      else { setPendingEnd(d); }
    }
  }

  function renderMonth(year: number, month: number) {
    const first = new Date(year, month, 1);
    const offset = first.getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const cells: (number | null)[] = [];
    for (let i = 0; i < offset; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);
    while (cells.length % 7 !== 0) cells.push(null);

    const startK = pendingStart ? dateKey(pendingStart) : null;
    const endK   = pendingEnd   ? dateKey(pendingEnd)   : null;
    const todayK = dateKey(TODAY);

    return (
      <div className={styles.calMonth}>
        <div className={styles.calWeek}>
          {WEEK_PT.map(w => <span key={w}>{w}</span>)}
        </div>
        <div className={styles.calDays}>
          {cells.map((d, i) => {
            if (d === null) return <span key={i} className={styles.empty} />;
            const date = new Date(year, month, d);
            const k = dateKey(date);
            const isPast = k < todayK;
            const isStart = k === startK;
            const isEnd = k === endK;
            const inRange = !!(startK && endK && k > startK && k < endK);
            const cls = [
              styles.calDay,
              isStart ? styles.rangeStart : '',
              isEnd   ? styles.rangeEnd   : '',
              inRange ? styles.inRange    : '',
            ].filter(Boolean).join(' ');
            return (
              <button
                key={i}
                type="button"
                className={cls}
                disabled={isPast}
                onClick={() => pickDay(new Date(year, month, d))}
              >
                {d}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  const right = new Date(calView.getFullYear(), calView.getMonth() + 1, 1);

  let hint: React.ReactNode;
  let canApply = false;
  if (!pendingStart) {
    hint = <>Selecione a <b>data de partida</b></>;
  } else if (!pendingEnd) {
    hint = <>Agora selecione a <b>data de retorno</b></>;
  } else {
    const diff = Math.round((pendingEnd.getTime() - pendingStart.getTime()) / 86400000) + 1;
    hint = <><b>{diff} dia{diff > 1 ? 's' : ''}</b> de viagem · {formatShort(pendingStart)} → {formatShort(pendingEnd)}</>;
    canApply = true;
  }

  if (!isOpen) return null;

  return (
    <div className={[styles.calPopover, styles.open].join(' ')} data-cal-popover onClick={e => e.stopPropagation()}>
      <div className={styles.calHeader}>
        <button type="button" className={styles.calNav} aria-label="Mês anterior" onClick={() => setCalView(new Date(calView.getFullYear(), calView.getMonth() - 1, 1))}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <div className={styles.monthTitle}>
          {MONTHS_PT[calView.getMonth()]} <span className={styles.year}>{calView.getFullYear()}</span>
        </div>
        <div className={styles.monthTitle}>
          {MONTHS_PT[right.getMonth()]} <span className={styles.year}>{right.getFullYear()}</span>
        </div>
        <button type="button" className={styles.calNav} aria-label="Próximo mês" onClick={() => setCalView(new Date(calView.getFullYear(), calView.getMonth() + 1, 1))}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </div>
      <div className={styles.calBody}>
        {renderMonth(calView.getFullYear(), calView.getMonth())}
        {renderMonth(right.getFullYear(), right.getMonth())}
      </div>
      <div className={styles.calFooter}>
        <div className={styles.hint}>{hint}</div>
        <button
          type="button"
          className={styles.calApply}
          disabled={!canApply}
          onClick={() => pendingStart && pendingEnd && onApply(pendingStart, pendingEnd)}
        >
          Aplicar
        </button>
      </div>
    </div>
  );
}
