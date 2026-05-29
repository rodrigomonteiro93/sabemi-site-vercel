import PartnerItem from '@/components/molecules/PartnerItem';
import SiteCarousel from '@/components/molecules/SiteCarousel';
import styles from './PartnersSection.module.css';

const PARTNERS = [
  { id: 'eu-viajo-seguro', src: '/assets/partners/eu-viajo-seguro-logo.svg', alt: 'Eu Viajo Seguro', maxHeight: 54 },
  { id: 'intermac', src: '/assets/partners/intermac-logo.svg', alt: 'Intermac Seguro Viagem', maxHeight: 56 },
  { id: 'assist-card', src: '/assets/partners/assist-card-logo.svg', alt: 'Assist Card', maxHeight: 48 },
  { id: 'gta-assist', src: '/assets/partners/gta-assist-logo.svg', alt: 'GTA Assist', maxHeight: 52 },
  { id: 'coris', src: '/assets/partners/coris-logo.svg', alt: 'Coris', maxHeight: 48 },
  { id: 'april-brasil', src: '/assets/partners/april-brasil-logo.svg', alt: 'April Brasil', maxHeight: 52 },
  { id: 'travel-ace', src: '/assets/partners/travel-ace-logo.svg', alt: 'Travel Ace', maxHeight: 52 },
];

export default function PartnersSection() {
  return (
    <section className={styles.partners}>
      <div className="container">
        <h2>Parceiros</h2>
        <SiteCarousel
          className={styles.partnersRow}
          swiperClassName={styles.partnerSwiper}
          slideClassName={styles.partnerSlide}
          prevButtonClassName={styles.arrowLight}
          nextButtonClassName={styles.arrowLight}
          iconSize={16}
          spaceBetween={40}
          slidesPerView={1}
          breakpoints={{
            560: { slidesPerView: 2, spaceBetween: 48 },
            900: { slidesPerView: 3, spaceBetween: 56 },
          }}
          loop={PARTNERS.length > 3}
          slides={PARTNERS.map((p) => (
            <PartnerItem key={p.id} src={p.src} alt={p.alt} maxHeight={p.maxHeight} />
          ))}
        />
      </div>
    </section>
  );
}
