import styles from './PartnerItem.module.css';

interface PartnerItemProps {
  src: string;
  alt: string;
  maxHeight?: number;
}

export default function PartnerItem({ src, alt, maxHeight = 60 }: PartnerItemProps) {
  return (
    <div className={styles.pCell}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} style={{ maxHeight: `${maxHeight}px` }} />
    </div>
  );
}
