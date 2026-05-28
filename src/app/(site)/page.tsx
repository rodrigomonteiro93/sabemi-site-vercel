import type { Metadata } from 'next';
import HomeContent from './page-content';

export const metadata: Metadata = {
  title: 'Sabemi Seguros — Seguro Viagem',
  description: 'Cote, compare e emita sua apólice em minutos com a confiança de quem cuida do que importa há mais de 50 anos.',
};

export default function HomePage() {
  return <HomeContent />;
}
