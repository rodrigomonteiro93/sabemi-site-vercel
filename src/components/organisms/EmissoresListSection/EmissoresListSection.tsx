'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ComKpiCard from '@/components/molecules/ComKpiCard';
import EmissorRow from '@/components/molecules/EmissorRow';
import PaginationBar from '@/components/molecules/PaginationBar';
import EmissoresInlineForm from '@/components/organisms/EmissoresInlineForm';
import EmissoresFiltersCard from '@/components/organisms/EmissoresFiltersCard';
import ConfirmDeleteModal from '@/components/organisms/ConfirmDeleteModal';
import { EmissorItem, EmissorFormData, EmissoresFilterParams } from '@/lib/types/emissores';
import styles from './EmissoresListSection.module.css';

const PER_PAGE = 15;

type FilterTab = 'todos' | 'ativo' | 'inativo';

interface EmissoresListSectionProps {
  items: EmissorItem[];
}

function avatarCls(i: number): 1 | 2 | 3 | 4 | 5 {
  return ((i % 5) + 1) as 1 | 2 | 3 | 4 | 5;
}

function formatDate(d: Date): string {
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const yyyy = d.getFullYear();
  const hh = String(d.getHours()).padStart(2, '0');
  const min = String(d.getMinutes()).padStart(2, '0');
  return `${dd}/${mm}/${yyyy} ${hh}:${min}`;
}

export default function EmissoresListSection({ items }: EmissoresListSectionProps) {
  const router = useRouter();
  const [emissores, setEmissores] = useState<EmissorItem[]>(items);
  const [currentFilter, setCurrentFilter] = useState<FilterTab>('todos');
  const [currentSearch, setCurrentSearch] = useState('');
  const [filterParams, setFilterParams] = useState<EmissoresFilterParams | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [formOpen, setFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<EmissorItem | null>(null);
  const [delModal, setDelModal] = useState<{ open: boolean; item: EmissorItem | null }>({ open: false, item: null });

  const kpis = useMemo(() => {
    const ativos = emissores.filter(e => e.ativo).length;
    const inativos = emissores.length - ativos;
    const custom = emissores.filter(e => e.comissao !== null).length;
    const pct = emissores.length > 0 ? Math.round(ativos / emissores.length * 100) : 0;
    return { total: emissores.length, ativos, inativos, custom, ativosPct: pct };
  }, [emissores]);

  const tabCounts = useMemo(() => ({
    todos: emissores.length,
    ativo: emissores.filter(e => e.ativo).length,
    inativo: emissores.filter(e => !e.ativo).length,
  }), [emissores]);

  const filtered = useMemo(() => {
    const s = currentSearch.trim().toLowerCase();
    return emissores.filter(e => {
      if (currentFilter === 'ativo' && !e.ativo) return false;
      if (currentFilter === 'inativo' && e.ativo) return false;
      if (s) {
        const hay = `${e.nome} ${e.email} ${e.cpf}`.toLowerCase();
        if (!hay.includes(s)) return false;
      }
      if (filterParams) {
        if (filterParams.perfil && e.perfil !== filterParams.perfil) return false;
        if (filterParams.status === 'ativo' && !e.ativo) return false;
        if (filterParams.status === 'inativo' && e.ativo) return false;
        if (filterParams.temComissao === 'sim' && e.comissao === null) return false;
        if (filterParams.temComissao === 'nao' && e.comissao !== null) return false;
        if (filterParams.search) {
          const hay = `${e.nome} ${e.email} ${e.cpf}`.toLowerCase();
          if (!hay.includes(filterParams.search.toLowerCase())) return false;
        }
      }
      return true;
    });
  }, [emissores, currentFilter, currentSearch, filterParams]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const pageStart = (safePage - 1) * PER_PAGE;
  const pageItems = filtered.slice(pageStart, pageStart + PER_PAGE);
  const pageFrom = filtered.length === 0 ? 0 : pageStart + 1;
  const pageTo = pageStart + pageItems.length;

  function handleSave(data: EmissorFormData, editingId: number | null) {
    const comissaoVal = data.comissao ? parseFloat(data.comissao.replace(',', '.')) || null : null;
    setEmissores(prev => {
      if (editingId !== null) {
        return prev.map(e => e.id === editingId
          ? { ...e, perfil: data.perfil, nome: data.nome, email: data.email, tel: data.tel, cpf: data.cpf, comissao: comissaoVal }
          : e
        );
      }
      const newId = Math.max(0, ...prev.map(e => e.id)) + 1;
      return [{
        id: newId,
        perfil: data.perfil,
        nome: data.nome,
        email: data.email,
        tel: data.tel,
        cpf: data.cpf,
        comissao: comissaoVal,
        ativo: true,
        data: formatDate(new Date()),
      }, ...prev];
    });
    setFormOpen(false);
    setEditingItem(null);
  }

  function handleEdit(id: number) {
    router.push(`/emissores/${id}/editar`);
  }

  function handleToggleAtivo(id: number) {
    setEmissores(prev => prev.map(e => e.id === id ? { ...e, ativo: !e.ativo } : e));
  }

  function handleDelete(id: number) {
    const item = emissores.find(e => e.id === id) ?? null;
    setDelModal({ open: true, item });
  }

  function handleConfirmDel() {
    if (delModal.item) {
      setEmissores(prev => prev.filter(e => e.id !== delModal.item!.id));
    }
    setDelModal({ open: false, item: null });
  }

  function handleFilter(params: EmissoresFilterParams) {
    setFilterParams(params);
    setCurrentPage(1);
  }

  function handleClearFilter() {
    setFilterParams(null);
    setCurrentPage(1);
  }

  function handleTabChange(tab: FilterTab) {
    setCurrentFilter(tab);
    setCurrentPage(1);
  }

  const TABS: { key: FilterTab; label: string }[] = [
    { key: 'todos', label: 'Todos' },
    { key: 'ativo', label: 'Ativos' },
    { key: 'inativo', label: 'Inativos' },
  ];

  return (
    <section className={styles.content}>
      <div className={styles.pgTitleBar}>
        <h1 className={styles.pgTitle}>
          Emissores e Subcontas{' '}
          <small className={styles.pgCount}>{emissores.length} cadastrados</small>
        </h1>
        <div className={styles.pgActions}>
          <Link href="/emissores/cadastrar" className={styles.btnPrimaryPill}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Novo emissor
          </Link>
        </div>
      </div>

      <div className={styles.kpiStrip}>
        <ComKpiCard label="Total cadastrados" value={String(kpis.total)} sub="emissores e subcontas" />
        <ComKpiCard label="Ativos" value={String(kpis.ativos)} sub={`${kpis.ativosPct}% do total`} colorVariant="success" />
        <ComKpiCard label="Inativos" value={String(kpis.inativos)} sub="precisam de revisão" colorVariant="danger" />
        <ComKpiCard label="Com comissão custom" value={String(kpis.custom)} sub="demais usam % padrão" />
      </div>

      <EmissoresInlineForm
        isOpen={formOpen}
        editingItem={editingItem}
        onClose={() => { setFormOpen(false); setEditingItem(null); }}
        onSave={handleSave}
      />

      <EmissoresFiltersCard onFilter={handleFilter} onClear={handleClearFilter} />

      <div className={styles.vbox}>
        <div className={styles.vboxHead}>
          <div className={styles.tabs}>
            {TABS.map(({ key, label }) => (
              <button
                key={key}
                className={`${styles.tab} ${currentFilter === key ? styles.tabActive : ''}`}
                type="button"
                onClick={() => handleTabChange(key)}
              >
                {label}
                <span className={styles.tabN}>{tabCounts[key]}</span>
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
              placeholder="Buscar nome, e-mail, CPF..."
              value={currentSearch}
              onChange={e => { setCurrentSearch(e.target.value); setCurrentPage(1); }}
            />
          </label>
        </div>

        <div className={`${styles.erowHead} ${styles.erowGrid}`}>
          <div>Emissor</div>
          <div>Perfil</div>
          <div>Comissão</div>
          <div>Ativo</div>
          <div>Cadastro</div>
          <div className={styles.colR}>Ação</div>
        </div>

        <div>
          {pageItems.length === 0 ? (
            <div className={styles.empty}>Nenhum emissor encontrado.</div>
          ) : (
            pageItems.map((item, i) => (
              <EmissorRow
                key={item.id}
                item={item}
                avatarColorIndex={avatarCls(i + pageStart)}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onToggleAtivo={handleToggleAtivo}
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

      <ConfirmDeleteModal
        isOpen={delModal.open}
        name={delModal.item?.nome ?? '—'}
        onConfirm={handleConfirmDel}
        onClose={() => setDelModal({ open: false, item: null })}
      />
    </section>
  );
}
