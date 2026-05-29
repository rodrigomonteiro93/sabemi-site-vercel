'use client';
import SiteHeader from '@/components/organisms/SiteHeader/SiteHeader';
import SiteFooter from '@/components/organisms/SiteFooter/SiteFooter';
import WhatsAppFab from '@/components/atoms/WhatsAppFab/WhatsAppFab';
import CotacaoHero from '@/components/organisms/CotacaoHero/CotacaoHero';
import CotacaoSidebar from '@/components/organisms/CotacaoSidebar/CotacaoSidebar';
import CotacaoResultSection from '@/components/organisms/CotacaoResultSection/CotacaoResultSection';
import CompareBar from '@/components/organisms/CompareBar/CompareBar';
import CoberturaModal from '@/components/organisms/CoberturaModal/CoberturaModal';
import EmailModal from '@/components/organisms/EmailModal/EmailModal';
import CompareModal from '@/components/organisms/CompareModal/CompareModal';
import styles from './page-content.module.css';

export default function CotacaoContent() {
  return (
    <>
      <SiteHeader />
      <CotacaoHero />
      <main className={styles.page}>
        <div className={`container ${styles.cotGrid}`}>
          <CotacaoSidebar />
          <CotacaoResultSection />
        </div>
      </main>
      <SiteFooter />
      <WhatsAppFab />
      <CompareBar />
      <CoberturaModal />
      <EmailModal />
      <CompareModal />
    </>
  );
}
