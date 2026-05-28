import YtBadge   from '@/components/atoms/YtBadge';
import Button    from '@/components/atoms/Button';
import VideoCard from '@/components/molecules/VideoCard';
import styles from './VideosSection.module.css';

const VIDEOS = [
  {
    title: 'Morte Acidental',
    playLabel: 'Morte Acidental em Viagem',
    imageUrl: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=600&q=70',
  },
  {
    title: 'Regresso\nSanitário',
    playLabel: 'Regresso Sanitário',
    imageUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&q=70',
  },
  {
    title: 'Perda de Passaporte e Documentos',
    playLabel: 'Orientação em Caso de Perda',
    imageUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&q=70',
  },
];

export default function VideosSection() {
  return (
    <section className={styles.videos}>
      <div className="container">
        <div className={styles.videosHead}>
          <div className={styles.yt}>
            <YtBadge />
            <h2>Vídeos de Conteúdo</h2>
          </div>
          <p className={styles.hint}>Clique no vídeo para assistí-lo</p>
        </div>

        <div className={styles.videoRow}>
          <button className={styles.arrowSide} aria-label="Anterior">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>

          {VIDEOS.map((v, i) => (
            <VideoCard key={i} title={v.title} playLabel={v.playLabel} imageUrl={v.imageUrl} />
          ))}

          <button className={styles.arrowSide} aria-label="Próximo">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>
        </div>

        <div className={styles.videosCta}>
          <Button variant="white">VER TODOS OS VÍDEOS</Button>
        </div>
      </div>
    </section>
  );
}
