import PartnerItem from '@/components/molecules/PartnerItem';
import SiteCarousel from '@/components/molecules/SiteCarousel';
import type { PartnerData } from '@/lib/types/partners';
import styles from './PartnersSection.module.css';

interface PartnersSectionProps {
  partners: PartnerData[];
}

export default function PartnersSection({ partners }: PartnersSectionProps) {
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
          loop={partners.length > 3}
          slides={partners.map((p) => (
            <PartnerItem key={p.id} src={p.src} alt={p.alt} maxHeight={p.maxHeight} />
          ))}
        />
      </div>
    </section>
  );
}
