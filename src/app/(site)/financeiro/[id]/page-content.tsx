'use client';

import { useState } from 'react';
import SiteHeader from '@/components/organisms/SiteHeader';
import SiteFooter from '@/components/organisms/SiteFooter';
import WhatsAppFab from '@/components/atoms/WhatsAppFab';
import BackLink from '@/components/atoms/BackLink';
import Button from '@/components/atoms/Button';
import UserSidebar from '@/components/organisms/UserSidebar';
import FaturaCard from '@/components/organisms/FaturaCard';
import FaturaComissoesSection from '@/components/organisms/FaturaComissoesSection';
import type { FaturaData, FaturaComissaoItem } from '@/lib/types/financeiro';
import styles from './page-content.module.css';

interface FaturaDetalheContentProps {
  fatura: FaturaData;
  comissoes: FaturaComissaoItem[];
}

export default function FaturaDetalheContent({ fatura, comissoes }: FaturaDetalheContentProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 1;

  function handleBoleto() {
    // placeholder — integração Fase 5
  }

  function handleDownload() {
    // placeholder — integração Fase 5
  }

  function handleEmail() {
    // placeholder — integração Fase 5
  }

  function handleSegundaVia() {
    // placeholder — integração Fase 5
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
              <BackLink href="/financeiro">Voltar para Financeiro</BackLink>

              <div className={styles.pgTitleBar}>
                <h1 className={styles.pgTitle}>
                  Fatura #{fatura.id}
                  <small className={styles.pgTitleSub}>Gerada em {fatura.geradaEm}</small>
                </h1>
                <div className={styles.pgActions}>
                  <Button variant="outline" type="button" onClick={handleDownload}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <polyline points="7 10 12 15 17 10"/>
                      <line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                    Baixar PDF
                  </Button>
                  <Button variant="outline" type="button" onClick={handleEmail}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                    Enviar por e-mail
                  </Button>
                  <Button variant="primary" type="button" onClick={handleSegundaVia}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="6" width="18" height="12" rx="1"/>
                      <line x1="7" y1="6" x2="7" y2="18"/>
                      <line x1="11" y1="6" x2="11" y2="18"/>
                      <line x1="15" y1="6" x2="15" y2="18"/>
                      <line x1="19" y1="6" x2="19" y2="18"/>
                    </svg>
                    2ª via do boleto
                  </Button>
                </div>
              </div>

              <FaturaCard
                id={fatura.id}
                heroTotalLabel={fatura.heroTotalLabel}
                heroTotal={fatura.heroTotal}
                heroTotalSub={fatura.heroTotalSub}
                statusVariant={fatura.statusVariant}
                statusSub={fatura.statusSub}
                statusSubLate={fatura.statusSubLate}
                infoItems={fatura.infoItems}
                onBoleto={handleBoleto}
              />

              <div className={styles.sectionH}>
                <h2 className={styles.sectionTitle}>Comissões da fatura</h2>
                <div className={styles.sectionMeta}>
                  Mostrando <b>{comissoes.length}</b> de <b>{comissoes.length}</b> comissões nesta fatura
                </div>
              </div>

              <FaturaComissoesSection
                items={comissoes}
                netTotal={fatura.netTotal}
                comissaoTotal={fatura.comissaoTotal}
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={comissoes.length}
                onPageChange={setCurrentPage}
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
