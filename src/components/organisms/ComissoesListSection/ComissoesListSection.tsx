'use client';

import { useState, useMemo, type ReactNode } from 'react';
import ComKpiCard from '@/components/molecules/ComKpiCard';
import ComissaoRow from '@/components/molecules/ComissaoRow';
import PaginationBar from '@/components/molecules/PaginationBar';
import { ComissaoItem, ComissaoStatus } from '@/lib/types/comissoes';
import styles from './ComissoesListSection.module.css';

interface ComissoesListSectionProps {
  items: ComissaoItem[];
  filtersSlot?: ReactNode;
}

type TabFilter = 'todos' | ComissaoStatus;

const TAB_LABELS: Record<TabFilter, string> = {
  todos: 'Todas',
  liberada: 'Liberadas',
  aguardando: 'Aguardando',
  bloqueada: 'Bloqueadas',
};
const TAB_FILTERS: TabFilter[] = ['todos', 'liberada', 'aguardando', 'bloqueada'];
const PER_PAGE = 15;

function fmtBRL(n: number): string {
  return 'R$ ' + n.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export default function ComissoesListSection({ items, filtersSlot }: ComissoesListSectionProps) {
  const [activeTab, setActiveTab] = useState<TabFilter>('todos');
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const tabCounts = useMemo(() => {
    const counts = { todos: items.length, liberada: 0, aguardando: 0, bloqueada: 0 };
    items.forEach(c => { counts[c.status] = (counts[c.status] || 0) + 1; });
    return counts;
  }, [items]);

  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase();
    return items.filter(c => {
      if (activeTab !== 'todos' && c.status !== activeTab) return false;
      if (s) {
        const hay = `${c.id} ${c.paxName} ${c.emissor}`.toLowerCase();
        if (!hay.includes(s)) return false;
      }
      return true;
    });
  }, [items, activeTab, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const start = (safePage - 1) * PER_PAGE;
  const paged = filtered.slice(start, start + PER_PAGE);

  const kpis = useMemo(() => {
    const liberadas = filtered.filter(c => c.status === 'liberada');
    const aguardando = filtered.filter(c => c.status === 'aguardando');
    const totalRecebido = liberadas.reduce((s, c) => s + c._comNum, 0);
    const aguardandoLib = aguardando.reduce((s, c) => s + c._comNum, 0);
    const avg = filtered.length ? filtered.reduce((s, c) => s + c._comNum, 0) / filtered.length : 0;
    return { totalRecebido, aguardandoLib, avg, count: filtered.length };
  }, [filtered]);

  function handleTabChange(tab: TabFilter) {
    setActiveTab(tab);
    setCurrentPage(1);
  }

  function handleSearch(value: string) {
    setSearch(value);
    setCurrentPage(1);
  }

  return (
    <div className={styles.section}>
      <div className={styles.kpiStrip}>
        <ComKpiCard label="Total recebido" value={fmtBRL(kpis.totalRecebido)} sub="no período filtrado" colorVariant="success" />
        <ComKpiCard label="Aguardando liberação" value={fmtBRL(kpis.aguardandoLib)} sub="próxima liberação 31/05" colorVariant="warning" />
        <ComKpiCard label="Comissão média" value={fmtBRL(kpis.avg)} sub="% média 27,5%" />
        <ComKpiCard label="Lançamentos" value={String(kpis.count)} sub="vouchers comissionados" />
      </div>

      {filtersSlot}

      <div className={styles.vbox}>
        <div className={styles.vboxHead}>
          <div className={styles.tabs}>
            {TAB_FILTERS.map(tab => (
              <button
                key={tab}
                className={`${styles.tab} ${activeTab === tab ? styles.activeTab : ''}`}
                onClick={() => handleTabChange(tab)}
              >
                {TAB_LABELS[tab]}
                <span className={styles.n}>{tabCounts[tab as keyof typeof tabCounts]}</span>
              </button>
            ))}
          </div>
          <label className={styles.quickSearch}>
            <span className={styles.icon}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </span>
            <input
              type="search"
              placeholder="Buscar voucher, emissor, passageiro..."
              value={search}
              onChange={e => handleSearch(e.target.value)}
            />
          </label>
        </div>

        <div className={`${styles.crowHead} ${styles.crowGrid}`}>
          <div>Voucher / Data</div>
          <div>Emissor</div>
          <div>Passageiro</div>
          <div className={styles.colR}>Comissão</div>
          <div className={styles.colR}>Valor NET</div>
          <div>Status</div>
        </div>

        <div>
          {paged.length === 0 ? (
            <div className={styles.empty}>Nenhuma comissão encontrada com esses filtros.</div>
          ) : (
            paged.map((item, i) => (
              <ComissaoRow
                key={item.id}
                item={item}
                avatarColorIndex={(((start + i) % 5) + 1) as 1 | 2 | 3 | 4 | 5}
              />
            ))
          )}
        </div>

        <PaginationBar
          pageFrom={filtered.length === 0 ? 0 : start + 1}
          pageTo={start + paged.length}
          total={filtered.length}
          currentPage={safePage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
