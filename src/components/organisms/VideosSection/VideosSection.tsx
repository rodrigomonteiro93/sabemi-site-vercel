import YtBadge from '@/components/atoms/YtBadge';
import Button from '@/components/atoms/Button';
import VideoCard from '@/components/molecules/VideoCard';
import SiteCarousel from '@/components/molecules/SiteCarousel';
import styles from './VideosSection.module.css';

const VIDEOS = [
  {
    id: 'morte-acidental',
    title: 'Morte Acidental',
    playLabel: 'Morte Acidental em Viagem',
    imageUrl: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=600&q=70',
  },
  {
    id: 'regresso-sanitario',
    title: 'Regresso\nSanitário',
    playLabel: 'Regresso Sanitário',
    imageUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&q=70',
  },
  {
    id: 'perda-passaporte',
    title: 'Perda de Passaporte e Documentos',
    playLabel: 'Orientação em Caso de Perda',
    imageUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&q=70',
  },
  {
    id: 'bagagem-extraviada',
    title: 'Bagagem\nExtraviada',
    playLabel: 'Cobertura de Bagagem',
    imageUrl: 'https://images.unsplash.com/photo-1544622899-2d4b5494e403?w=600&q=70',
  },
  {
    id: 'despesas-medicas',
    title: 'Despesas Médicas no Exterior',
    playLabel: 'Atendimento Médico em Viagem',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=70',
  },
  {
    id: 'cancelamento-viagem',
    title: 'Cancelamento\nde Viagem',
    playLabel: 'Como Funciona o Cancelamento',
    imageUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&q=70',
  },
  {
    id: 'assistencia-24h',
    title: 'Assistência\n24 Horas',
    playLabel: 'Suporte Durante a Viagem',
    imageUrl: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&q=70',
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
          loop={VIDEOS.length > 3}
          slides={VIDEOS.map((v) => (
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
