'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import PageTitleBar from '@/components/molecules/PageTitleBar';
import ComKpiCard from '@/components/molecules/ComKpiCard';
import PaginationBar from '@/components/molecules/PaginationBar';
import FinanceiroFiltersCard from '@/components/organisms/FinanceiroFiltersCard';
import FaturaRow from '@/components/molecules/FaturaRow';
import {
  FinanceiroItem,
  FinanceiroFilterParams,
  fmtBRL,
} from '@/lib/types/financeiro';
import styles from './FinanceiroListSection.module.css';

const PER_PAGE = 15;

type TabFilter = 'todos' | 'vencida' | 'aberta' | 'recebida';

interface FinanceiroListSectionProps {
  items: FinanceiroItem[];
}

export default function FinanceiroListSection({ items }: FinanceiroListSectionProps) {
  const router = useRouter();
  const [currentFilter, setCurrentFilter] = useState<TabFilter>('todos');
  const [currentSearch, setCurrentSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filterParams, setFilterParams] = useState<FinanceiroFilterParams | null>(null);

  const kpis = useMemo(() => {
    const vencidas = items.filter(f => f.status === 'vencida');
    const abertas = items.filter(f => f.status === 'aberta' || f.status === 'processando');
    const recebidas = items.filter(f => f.status === 'recebida');
    return {
      vencidas: { total: vencidas.reduce((s, f) => s + f.total, 0), count: vencidas.length },
      aVencer: { total: abertas.reduce((s, f) => s + f.total, 0), count: abertas.length },
      recebidas: { total: recebidas.reduce((s, f) => s + f.total, 0), count: recebidas.length },
      comissoes: items.reduce((s, f) => s + f.totalComissoes, 0),
    };
  }, [items]);

  const tabCounts = useMemo(() => {
    const counts = { todos: items.length, vencida: 0, aberta: 0, recebida: 0 };
    items.forEach(f => {
      if (f.status === 'aberta' || f.status === 'processando') counts.aberta++;
      else counts[f.status as 'vencida' | 'recebida'] = (counts[f.status as 'vencida' | 'recebida'] || 0) + 1;
    });
    return counts;
  }, [items]);

  const filtered = useMemo(() => {
    const s = currentSearch.trim().toLowerCase();
    return items.filter(f => {
      if (currentFilter === 'aberta') {
        if (f.status !== 'aberta' && f.status !== 'processando') return false;
      } else if (currentFilter !== 'todos') {
        if (f.status !== currentFilter) return false;
      }
      if (s && !`${f.id} ${f.date}`.toLowerCase().includes(s)) return false;
      if (filterParams) {
        if (filterParams.status && f.status !== filterParams.status) return false;
        if (filterParams.valorMin) {
          const min = parseFloat(filterParams.valorMin.replace('R$', '').replace(',', '.').trim());
          if (!isNaN(min) && f.total < min) return false;
        }
        if (filterParams.valorMax) {
          const max = parseFloat(filterParams.valorMax.replace('R$', '').replace(',', '.').trim());
          if (!isNaN(max) && f.total > max) return false;
        }
      }
      return true;
    });
  }, [items, currentFilter, currentSearch, filterParams]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const pageItems = filtered.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE);
  const pageFrom = filtered.length === 0 ? 0 : (safePage - 1) * PER_PAGE + 1;
  const pageTo = pageFrom === 0 ? 0 : pageFrom + pageItems.length - 1;

  function handleTabChange(tab: TabFilter) {
    setCurrentFilter(tab);
    setCurrentPage(1);
  }

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setCurrentSearch(e.target.value);
    setCurrentPage(1);
  }

  function handleFilter(params: FinanceiroFilterParams) {
    setFilterParams(params);
    setCurrentPage(1);
  }

  function handleClear() {
    setFilterParams(null);
    setCurrentPage(1);
  }

  function handleView(id: number) {
    router.push(`/financeiro/${id}`);
  }

  function handleBoleto(id: number) {
    void id;
    // placeholder — Fase 5: abrir boleto
  }

  const tabs: { id: TabFilter; label: string }[] = [
    { id: 'todos', label: 'Todas' },
    { id: 'vencida', label: 'Vencidas' },
    { id: 'aberta', label: 'Abertas' },
    { id: 'recebida', label: 'Recebidas' },
  ];

  return (
    <section className={styles.content}>
      <PageTitleBar
        title="Financeiro — Faturas"
        subtitle={`${items.length} faturas`}
        actions={[
          {
            label: 'Exportar CSV',
            variant: 'outline',
            icon: (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
            ),
            onClick: () => {},
          },
        ]}
      />

      <div className={styles.kpiStrip}>
        <ComKpiCard
          label="Vencidas"
          value={fmtBRL(kpis.vencidas.total)}
          sub={`${kpis.vencidas.count} faturas em atraso`}
          colorVariant="danger"
        />
        <ComKpiCard
          label="A vencer (30 dias)"
          value={fmtBRL(kpis.aVencer.total)}
          sub={`${kpis.aVencer.count} faturas em aberto`}
          colorVariant="warning"
        />
        <ComKpiCard
          label="Recebidas no período"
          value={fmtBRL(kpis.recebidas.total)}
          sub={`${kpis.recebidas.count} faturas pagas`}
          colorVariant="success"
        />
        <ComKpiCard
          label="Saldo de comissões"
          value={fmtBRL(kpis.comissoes)}
          sub="a deduzir das próximas faturas"
          colorVariant="default"
        />
      </div>

      <FinanceiroFiltersCard
        isOpen
        onFilter={handleFilter}
        onClear={handleClear}
      />

      <div className={styles.vbox}>
        <div className={styles.vboxHead}>
          <div className={styles.tabs}>
            {tabs.map(tab => (
              <button
                key={tab.id}
                type="button"
                className={`${styles.tab} ${currentFilter === tab.id ? styles.tabActive : ''}`}
                onClick={() => handleTabChange(tab.id)}
              >
                {tab.label}
                <span className={`${styles.n} ${currentFilter === tab.id ? styles.nActive : ''}`}>
                  {tabCounts[tab.id]}
                </span>
              </button>
            ))}
          </div>
          <label className={styles.quickSearch}>
            <span className={styles.searchIcon}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </span>
            <input
              type="search"
              placeholder="Buscar fatura..."
              value={currentSearch}
              onChange={handleSearch}
            />
          </label>
        </div>

        <div className={`${styles.frowHead} ${styles.frowGrid}`}>
          <div>Data / Fatura</div>
          <div>Status</div>
          <div>Pedidos</div>
          <div>Comissões</div>
          <div className={styles.colR}>Total</div>
          <div>Boleto</div>
          <div></div>
        </div>

        <div>
          {pageItems.length === 0 ? (
            <div className={styles.emptyState}>Nenhuma fatura encontrada.</div>
          ) : (
            pageItems.map(item => (
              <FaturaRow
                key={item.id}
                item={item}
                onView={handleView}
                onBoleto={handleBoleto}
              />
            ))
          )}
        </div>

        <PaginationBar
          pageFrom={pageFrom}
          pageTo={pageTo}
          total={filtered.length}
          currentPage={safePage}
          totalPages={totalPages}
          onPageChange={p => setCurrentPage(p)}
        />
      </div>
    </section>
  );
}
