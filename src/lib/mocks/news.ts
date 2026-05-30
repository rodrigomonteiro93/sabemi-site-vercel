import type { NewsItem } from '@/lib/types/news';

export const HOME_NEWS_MOCK: NewsItem[] = [
  {
    id: 'argentina-seguro-obrigatorio',
    imageUrl: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&q=70',
    category: 'Viagens Internacionais',
    categoryVariant: 'intl',
    date: '19/05/2025',
    title: 'Argentina torna seguro viagem obrigatório: veja como se proteger e evitar problemas na imigração',
  },
  {
    id: 'linha-do-tempo-turismo',
    imageUrl: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&q=70',
    category: 'Viagens & Turismo',
    categoryVariant: 'tur',
    date: '21/08/2023',
    title: 'Uma linha do tempo do Turismo',
  },
  {
    id: 'recife-de-corais',
    imageUrl: 'https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?w=800&q=70',
    category: 'Viagens & Turismo',
    categoryVariant: 'tur',
    date: '15/08/2023',
    title: 'Recife de Corais ao redor do mundo',
  },
];
