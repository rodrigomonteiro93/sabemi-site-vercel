import styles from './VideoCard.module.css';

interface VideoCardProps {
  title: string;
  playLabel: string;
  imageUrl: string;
  className?: string;
  inCarousel?: boolean;
}

export default function VideoCard({ title, playLabel, imageUrl, className, inCarousel }: VideoCardProps) {
  return (
    <article className={[styles.vcard, inCarousel && styles.inCarousel, className].filter(Boolean).join(' ')}>
      <div className={styles.vleft}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/sabemi-logo-white.svg" alt="Sabemi" className={styles.brandLogo} />
        <h3 dangerouslySetInnerHTML={{ __html: title.replace('\n', '<br>') }} />
        <div className={styles.play}>
          <span className={styles.pcircle}>
            <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
          </span>
          <span>{playLabel}</span>
        </div>
      </div>
      <div className={styles.vright} style={{ backgroundImage: `url('${imageUrl}')` }} />
    </article>
  );
}
