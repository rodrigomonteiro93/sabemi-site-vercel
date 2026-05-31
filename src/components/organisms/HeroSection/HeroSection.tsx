'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DEST_GROUPS, TIPO_OPTIONS } from '@/lib/data/destinos';
import QuoteFieldSelect from '@/components/molecules/QuoteFieldSelect';
import QuoteFieldDate   from '@/components/molecules/QuoteFieldDate';
import QuoteFieldPax    from '@/components/molecules/QuoteFieldPax';
import CalendarPopover  from '@/components/molecules/CalendarPopover';
import PaxPanel         from '@/components/molecules/PaxPanel';
import Button           from '@/components/atoms/Button';
import styles from './HeroSection.module.css';

const MAX_PAX = 10;

const MONTHS_PT = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];

function formatDate(d: Date) {
  return {
    day: String(d.getDate()).padStart(2, '0'),
    monthYear: `${MONTHS_PT[d.getMonth()]} ${d.getFullYear()}`,
  };
}

function computeAges(
  count: number,
  useBirthdate: boolean,
  values: Record<string, string>,
): number[] {
  if (count === 0) return [30];
  const today = new Date();
  return Array.from({ length: count }, (_, i) => {
    const key = (useBirthdate ? 'dob-' : 'age-') + (i + 1);
    const val = values[key];
    if (!val) return 30;
    if (useBirthdate) {
      const dob = new Date(val);
      let age = today.getFullYear() - dob.getFullYear();
      const m = today.getMonth() - dob.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--;
      return Math.max(0, age);
    }
    return parseInt(val, 10) || 30;
  });
}

function formatUrlDate(d: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(d.getDate())}-${pad(d.getMonth() + 1)}-${d.getFullYear()}`;
}

export default function HeroSection() {
  const router = useRouter();
  const [destination, setDestination]   = useState('');
  const [tripType, setTripType]         = useState('lazer');
  const [startDate, setStartDate]       = useState(new Date(2026, 4, 26));
  const [endDate, setEndDate]           = useState(new Date(2026, 5, 5));
  const [paxCount, setPaxCount]         = useState(0);
  const [useBirthdate, setUseBirthdate] = useState(false);
  const [paxValues, setPaxValues]       = useState<Record<string, string>>({});
  const [calOpen, setCalOpen]           = useState(false);

  function changePax(delta: number) {
    setPaxCount(prev => Math.max(0, Math.min(MAX_PAX, prev + delta)));
  }

  function handleApplyCalendar(start: Date, end: Date) {
    setStartDate(start);
    setEndDate(end);
    setCalOpen(false);
  }

  function handleSubmit() {
    if (!destination) return;
    const ages = computeAges(paxCount, useBirthdate, paxValues);
    const params = new URLSearchParams({
      destino: destination,
      ida:     formatUrlDate(startDate),
      retorno: formatUrlDate(endDate),
      tipo:    tripType,
      ages:    ages.join(','),
    });
    router.push(`/cotacao?${params.toString()}`);
  }

  const startFmt = formatDate(startDate);
  const endFmt   = formatDate(endDate);

  return (
    <section className={styles.hero}>
      <div className={`container ${styles.heroInner}`}>
        <h1>Seguro Viagem Sabemi: a tranquilidade que viaja com você.</h1>
        <p className={styles.sub}>
          Cote, compare e emita sua apólice em minutos com a confiança de quem cuida do que importa há mais de 50 anos.
        </p>

        <div className={styles.quoteCard} role="form" aria-label="Cotação rápida">
          <QuoteFieldSelect
            label="Destino"
            icon={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            }
            groups={DEST_GROUPS}
            value={destination}
            onChange={setDestination}
            placeholder="Para onde você vai viajar? *"
          />

          <div data-cal-trigger style={{ position: 'relative' }}>
            <QuoteFieldDate
              label="Data de Partida"
              day={startFmt.day}
              monthYear={startFmt.monthYear}
              onClick={() => setCalOpen(true)}
            />
          </div>

          <div data-cal-trigger style={{ position: 'relative' }}>
            <QuoteFieldDate
              label="Data de Retorno"
              day={endFmt.day}
              monthYear={endFmt.monthYear}
              onClick={() => setCalOpen(true)}
            />
            <CalendarPopover
              isOpen={calOpen}
              initialStart={startDate}
              initialEnd={endDate}
              onApply={handleApplyCalendar}
              onClose={() => setCalOpen(false)}
            />
          </div>

          <QuoteFieldSelect
            label="Tipo de Viagem"
            options={TIPO_OPTIONS}
            value={tripType}
            onChange={setTripType}
          />

          <QuoteFieldPax
            count={paxCount}
            onIncrement={() => changePax(1)}
            onDecrement={() => changePax(-1)}
            atMax={paxCount === MAX_PAX}
          />
        </div>

        {paxCount > 0 && (
          <PaxPanel
            count={paxCount}
            useBirthdate={useBirthdate}
            onToggleBirthdate={() => setUseBirthdate(v => !v)}
            values={paxValues}
            onChange={(key, val) => setPaxValues(prev => ({ ...prev, [key]: val }))}
          />
        )}

        <div className={styles.heroCta}>
          <Button variant="primary" onClick={handleSubmit}>Fazer Cotação</Button>
        </div>
      </div>
    </section>
  );
}
