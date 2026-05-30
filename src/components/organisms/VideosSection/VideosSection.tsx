import YtBadge from '@/components/atoms/YtBadge';
import Button from '@/components/atoms/Button';
import VideoCard from '@/components/molecules/VideoCard';
import SiteCarousel from '@/components/molecules/SiteCarousel';
import type { VideoItem } from '@/lib/types/videos';
import styles from './VideosSection.module.css';

interface VideosSectionProps {
  videos: VideoItem[];
}

export default function VideosSection({ videos }: VideosSectionProps) {
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

        <SiteCarousel
          className={styles.videoRow}
          prevButtonClassName={styles.arrowSide}
          nextButtonClassName={styles.arrowSide}
          spaceBetween={22}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 22 },
          }}
          loop={videos.length > 3}
          slides={videos.map((v) => (
            <VideoCard
              key={v.id}
              title={v.title}
              playLabel={v.playLabel}
              imageUrl={v.imageUrl}
              inCarousel
            />
          ))}
        />

        <div className={styles.videosCta}>
          <Button variant="white">VER TODOS OS VÍDEOS</Button>
        </div>
      </div>
    </section>
  );
}
