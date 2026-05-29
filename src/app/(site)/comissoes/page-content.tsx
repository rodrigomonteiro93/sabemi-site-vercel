'use client';

import { useState, useMemo } from 'react';
import SiteHeader from '@/components/organisms/SiteHeader';
import SiteFooter from '@/components/organisms/SiteFooter';
import WhatsAppFab from '@/components/atoms/WhatsAppFab';
import UserSidebar from '@/components/organisms/UserSidebar';
import Button from '@/components/atoms/Button';
import ComissoesFiltersCard from '@/components/organisms/ComissoesFiltersCard';
import ComissoesListSection from '@/components/organisms/ComissoesListSection';
import { ComissaoItem, ComissoesFilterParams } from '@/lib/types/comissoes';
import styles from './page-content.module.css';

interface ComissoesPageContentProps {
  comissoes: ComissaoItem[];
}

const EMPTY_FILTERS: ComissoesFilterParams = {
  dataInicio: '',
  dataFim: '',
  emissor: '',
  status: '',
};

export default function ComissoesPageContent({ comissoes }: ComissoesPageContentProps) {
  const [filterParams, setFilterParams] = useState<ComissoesFilterParams>(EMPTY_FILTERS);

  const filteredItems = useMemo(() => {
    return comissoes.filter(c => {
      if (filterParams.emissor && c.emissor !== filterParams.emissor) return false;
      if (filterParams.status && c.status !== filterParams.status) return false;
      return true;
    });
  }, [comissoes, filterParams]);

  function handleExport() {
    // placeholder — implementar na Fase 5
  }

  return (
    <>
      <SiteHeader />
      <main className={styles.page}>
        <div className={styles.container}>
          <div className={styles.pageGrid}>
            <UserSidebar
              agencyName="Agência Teste"
              cotarHref="/cotacao"
              copyLinkValue=""
              copyRegisterLinkValue=""
            />
            <section className={styles.content}>
              <div className={styles.pgTitleBar}>
                <h1>
                  Comissões <small>238 lançamentos</small>
                </h1>
                <div className={styles.pgActions}>
                  <Button variant="outline" className={styles.btnExport} onClick={handleExport}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    Exportar CSV
                  </Button>
                </div>
              </div>
              <ComissoesListSection
                items={filteredItems}
                filtersSlot={
                  <ComissoesFiltersCard
                    onFilter={setFilterParams}
                    onClear={() => setFilterParams(EMPTY_FILTERS)}
                  />
                }
              />
            </section>
          </div>
        </div>
      </main>
      <SiteFooter />
      <WhatsAppFab />
    </>
  );
}
