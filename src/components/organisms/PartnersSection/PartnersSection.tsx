import PartnerItem from '@/components/molecules/PartnerItem';
import styles from './PartnersSection.module.css';

const PARTNERS = [
  { src: '/assets/eu-viajo-seguro-logo.png', alt: 'Eu Viajo Seguro', maxHeight: 54 },
  { src: '/assets/intermac-logo.png', alt: 'Intermac Seguro Viagem', maxHeight: 72 },
];

export default function PartnersSection() {
  return (
    <section className={styles.partners}>
      <div className="container">
        <h2>Parceiros</h2>
        <div className={styles.partnersRow}>
          <button className={styles.arrowLight} aria-label="Anterior">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>
          <div className={styles.partnerTrack}>
            {PARTNERS.map((p, i) => (
              <PartnerItem key={i} src={p.src} alt={p.alt} maxHeight={p.maxHeight} />
            ))}
          </div>
          <button className={styles.arrowLight} aria-label="Próximo">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
