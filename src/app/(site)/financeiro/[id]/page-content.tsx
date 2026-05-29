'use client';

import { useState } from 'react';
import UserSidebar from '@/components/organisms/UserSidebar/UserSidebar';
import BackLink from '@/components/atoms/BackLink/BackLink';
import PageTitleBar from '@/components/molecules/PageTitleBar/PageTitleBar';
import FaturaCard from '@/components/organisms/FaturaCard/FaturaCard';
import FaturaComissoesSection from '@/components/organisms/FaturaComissoesSection/FaturaComissoesSection';
import type { FaturaDetalheData } from '@/lib/types/financeiro';
import styles from './page-content.module.css';

interface FaturaDetalheContentProps {
  fatura: FaturaDetalheData;
}

const ITEMS_PER_PAGE = 10;

export default function FaturaDetalheContent({ fatura }: FaturaDetalheContentProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(fatura.totalItems / ITEMS_PER_PAGE));
  const paginatedComissoes = fatura.comissoes.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  function handleBoleto() {
    // Fase 5: abrir boleto em nova aba
  }

  function handlePdf() {
    // Fase 5: download do PDF
  }

  function handleEmail() {
    // Fase 5: abrir modal de envio por e-mail
  }

  function handle2aViaBoleto() {
    // Fase 5: gerar 2ª via do boleto
  }

  const titleActions = [
    {
      label: 'Baixar PDF',
      variant: 'outline' as const,
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="7 10 12 15 17 10"/>
          <line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
      ),
      onClick: handlePdf,
    },
    {
      label: 'Enviar por e-mail',
      variant: 'outline' as const,
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
      ),
      onClick: handleEmail,
    },
    {
      label: '2ª via do boleto',
      variant: 'primary' as const,
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="6" width="18" height="12" rx="1"/>
          <line x1="7" y1="6" x2="7" y2="18"/>
          <line x1="11" y1="6" x2="11" y2="18"/>
          <line x1="15" y1="6" x2="15" y2="18"/>
          <line x1="19" y1="6" x2="19" y2="18"/>
        </svg>
      ),
      onClick: handle2aViaBoleto,
    },
  ];

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <div className={styles.pageGrid}>
          <UserSidebar
            agencyName="Agência Teste"
            cotarHref="/cotacao"
            copyLinkValue="https://sabemi.com.br/ref/agencia-teste"
            copyRegisterLinkValue="https://sabemi.com.br/cadastro/agencia-teste"
          />

          <section className={styles.content}>
            <BackLink href="/financeiro">Voltar para Financeiro</BackLink>

            <PageTitleBar
              title={`Fatura #${fatura.id}`}
              subtitle={fatura.geradaEm}
              actions={titleActions}
            />

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

            <FaturaComissoesSection
              items={paginatedComissoes}
              netTotal={fatura.netTotal}
              comissaoTotal={fatura.comissaoTotal}
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={fatura.totalItems}
              onPageChange={setCurrentPage}
            />
          </section>
        </div>
      </div>
    </main>
  );
}
