'use client';
import { useState } from 'react';
import { useCotacaoStore } from '@/lib/stores/cotacaoStore';
import Switch from '@/components/atoms/Switch/Switch';
import CalendarPopover from '@/components/molecules/CalendarPopover/CalendarPopover';
import MarkupBlock from '@/components/molecules/MarkupBlock/MarkupBlock';
import IdadeRow from '@/components/molecules/IdadeRow/IdadeRow';
import styles from './CotacaoSidebar.module.css';

export default function CotacaoSidebar() {
  const {
    destino, setDestino,
    ida, setIda,
    retorno, setRetorno,
    tipo, setTipo,
    coberturas, setCoberturas,
    markup, setMarkup,
    markupHidden, toggleMarkupHidden,
    ages, addAge, removeAge, setAge,
  } = useCotacaoStore();

  const [vip, setVip] = useState(false);
  const [calOpen, setCalOpen] = useState(false);

  const pax = ages.length;

  function parseDate(str: string): Date {
    const [d, m, y] = str.split('/').map(Number);
    return new Date(y, m - 1, d);
  }
  function formatDate(d: Date): string {
    return `${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}/${d.getFullYear()}`;
  }

  return (
    <aside className={styles.side}>
      <div className={styles.sideTop}>
        <button className={styles.btnLink} type="button">Copiar link</button>
        <span className={styles.vipToggle}>
          Sala VIP
          <Switch checked={vip} onChange={() => setVip(!vip)} />
        </span>
      </div>

      <div className={styles.sideBody}>
        <h3>Sobre a viagem</h3>

        <div className={styles.sideField}>
          <label>Destino</label>
          <div className={styles.sideSelectWrap}>
            <select className={styles.sideSelect} value={destino} onChange={(e) => setDestino(e.target.value)}>
              <option>Brasil</option>
              <option>Argentina</option>
              <option>Chile</option>
              <option>Estados Unidos</option>
              <option>Europa (Schengen)</option>
              <option>Portugal</option>
              <option>Múltiplos destinos</option>
            </select>
          </div>
        </div>

        <div className={styles.datePair}>
          <div className={styles.sideField}>
            <label>Ida</label>
            <input
              type="text"
              className={`${styles.sideInput} ${styles.hasCal}`}
              value={ida}
              readOnly
              onClick={() => setCalOpen(true)}
            />
          </div>
          <div className={styles.sideField}>
            <label>Retorno</label>
            <input
              type="text"
              className={`${styles.sideInput} ${styles.hasCal}`}
              value={retorno}
              readOnly
              onClick={() => setCalOpen(true)}
            />
          </div>
          {calOpen && (
            <CalendarPopover
              isOpen={calOpen}
              initialStart={parseDate(ida)}
              initialEnd={parseDate(retorno)}
              onApply={(start, end) => {
                setIda(formatDate(start));
                setRetorno(formatDate(end));
                setCalOpen(false);
              }}
              onClose={() => setCalOpen(false)}
            />
          )}
        </div>

        <div className={styles.sideField}>
          <label>Tipo de Viagem</label>
          <div className={styles.sideSelectWrap}>
            <select className={styles.sideSelect} value={tipo} onChange={(e) => setTipo(e.target.value)}>
              <option>Lazer / Turismo / Negócios</option>
              <option>Negócios</option>
              <option>Estudo / Intercâmbio</option>
              <option>Mochilão</option>
              <option>Cruzeiro</option>
            </select>
          </div>
        </div>

        <div className={styles.sideField}>
          <label>Passageiros</label>
          <div className={styles.numWrap}>
            <input
              type="text"
              className={styles.sideNum}
              value={`Número de passageiros: ${pax}`}
              readOnly
            />
            <span className={styles.numCtrls}>
              <button type="button" aria-label="Mais" onClick={addAge}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"/></svg>
              </button>
              <button type="button" aria-label="Menos" onClick={() => removeAge(pax - 1)}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
              </button>
            </span>
          </div>
        </div>

        <MarkupBlock
          value={markup}
          hidden={markupHidden}
          onChange={setMarkup}
          onToggleHidden={toggleMarkupHidden}
        />

        <div className={styles.sideField}>
          <label>Idades</label>
          <div>
            {ages.map((age, i) => (
              <IdadeRow
                key={i}
                index={i}
                value={age}
                onChange={setAge}
                onRemove={removeAge}
                canRemove={ages.length > 1}
              />
            ))}
          </div>
        </div>

        <div className={styles.sideField}>
          <label>Coberturas</label>
          <div className={styles.sideSelectWrap}>
            <select className={styles.sideSelect} value={coberturas} onChange={(e) => setCoberturas(e.target.value)}>
              <option value="">Selecione</option>
              <option>Despesas Médicas e Hospitalares</option>
              <option>Cobertura COVID-19</option>
              <option>Extravio de Bagagem</option>
              <option>Cancelamento de Viagem</option>
              <option>Práticas de Esporte</option>
            </select>
          </div>
        </div>

        <button className={styles.btnBusca}>Buscar</button>
      </div>
    </aside>
  );
}
