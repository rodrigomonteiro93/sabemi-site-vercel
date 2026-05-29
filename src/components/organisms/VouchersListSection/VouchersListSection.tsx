'use client';

import { useState, useMemo } from 'react';
import PageTitleBar from '@/components/molecules/PageTitleBar/PageTitleBar';
import PaginationBar from '@/components/molecules/PaginationBar/PaginationBar';
import VouchersFiltersCard from '@/components/organisms/VouchersFiltersCard/VouchersFiltersCard';
import VoucherRow from '@/components/molecules/VoucherRow/VoucherRow';
import {
  VoucherPageItem,
  VoucherStatus,
  VouchersFilterParams,
} from '@/lib/types/vouchers';
import styles from './VouchersListSection.module.css';

const PER_PAGE = 15;
const TODAY = new Date();

type TabFilter = VoucherStatus | 'todos';

interface VouchersListSectionProps {
  items: VoucherPageItem[];
}

export default function VouchersListSection({ items }: VouchersListSectionProps) {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabFilter>('todos');
  const [search, setSearch] = useState('');
  const [filterParams, setFilterParams] = useState<VouchersFilterParams>({});
  const [currentPage, setCurrentPage] = useState(1);

  const tabCounts = useMemo(() => {
    const counts = { todos: items.length, emit: 0, pendente: 0, cancel: 0 };
    items.forEach(v => { counts[v.status] = (counts[v.status] ?? 0) + 1; });
    return counts;
  }, [items]);

  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase();
    return items.filter(v => {
      if (activeTab !== 'todos' && v.status !== activeTab) return false;
      if (s) {
        const hay = `${v.id} ${v.nome} ${v.destino}`.toLowerCase();
        if (!hay.includes(s)) return false;
      }
      if (filterParams.numeroPedido) {
        if (!String(v.id).includes(filterParams.numeroPedido)) return false;
      }
      if (filterParams.nomePassageiro) {
        if (!v.nome.toLowerCase().includes(filterParams.nomePassageiro.toLowerCase())) return false;
      }
      return true;
    });
  }, [items, activeTab, search, filterParams]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const start = (safePage - 1) * PER_PAGE;
  const pageItems = filtered.slice(start, start + PER_PAGE);
  const pageFrom = filtered.length === 0 ? 0 : start + 1;
  const pageTo = start + pageItems.length;

  const handleTabChange = (tab: TabFilter) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleFilter = (params: VouchersFilterParams) => {
    setFilterParams(params);
    setCurrentPage(1);
  };

  const handleClear = () => {
    setFilterParams({});
    setCurrentPage(1);
  };

  const avatarColorIndex = (i: number): 1 | 2 | 3 | 4 | 5 =>
    ((i % 5) + 1) as 1 | 2 | 3 | 4 | 5;

  const tabs: { filter: TabFilter; label: string }[] = [
    { filter: 'todos', label: 'Todos' },
    { filter: 'emit', label: 'Emitidos' },
    { filter: 'pendente', label: 'Aguardando' },
    { filter: 'cancel', label: 'Cancelados' },
  ];

  return (
    <div className={styles.content}>
      <PageTitleBar
        title="Vouchers — Suas Compras"
        subtitle={`${items.length} vouchers`}
        actions={[
          {
            label: 'Filtrar',
            icon: (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
              </svg>
            ),
            variant: 'outline',
            onClick: () => setFiltersOpen(prev => !prev),
          },
        ]}
      />

      <VouchersFiltersCard
        isOpen={filtersOpen}
        onFilter={handleFilter}
        onClear={handleClear}
      />

      <div className={styles.vbox}>
        <div className={styles.vboxHead}>
          <div className={styles.tabs} role="tablist">
            {tabs.map(t => (
              <button
                key={t.filter}
                className={`${styles.tab} ${activeTab === t.filter ? styles.tabActive : ''}`}
                onClick={() => handleTabChange(t.filter)}
                role="tab"
                aria-selected={activeTab === t.filter}
              >
                {t.label}
                <span className={`${styles.tabCount} ${activeTab === t.filter ? styles.tabCountActive : ''}`}>
                  {tabCounts[t.filter] ?? 0}
                </span>
              </button>
            ))}
          </div>
          <label className={styles.quickSearch}>
            <span className={styles.searchIcon}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </span>
            <input
              type="search"
              className={styles.quickSearchInput}
              placeholder="Buscar rápido por voucher, cliente, destino..."
              value={search}
              onChange={handleSearch}
            />
          </label>
        </div>

        <div className={styles.vboxTable}>
          <div className={`${styles.vrowHead} ${styles.vrowGrid}`}>
            <div>Cliente / Voucher</div>
            <div>Destino</div>
            <div className={styles.colPeriod}>Período da viagem</div>
            <div className={styles.colValue}>Valor</div>
            <div>Status</div>
            <div></div>
          </div>

          {pageItems.length > 0 ? (
            pageItems.map((v, i) => (
              <VoucherRow
                key={v.id}
                item={v}
                avatarColorIndex={avatarColorIndex(start + i)}
                today={TODAY}
                onView={() => {}}
                onDownload={() => {}}
                onResend={() => {}}
                onCancel={() => {}}
              />
            ))
          ) : (
            <div className={styles.emptyMsg}>
              Nenhum voucher encontrado com esses filtros.
            </div>
          )}
        </div>

        <PaginationBar
          pageFrom={pageFrom}
          pageTo={pageTo}
          total={filtered.length}
          currentPage={safePage}
          totalPages={totalPages}
          onPageChange={(p) => setCurrentPage(p)}
        />
      </div>
    </div>
  );
}
