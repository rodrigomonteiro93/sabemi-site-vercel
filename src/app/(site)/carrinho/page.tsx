import { createPageMetadata } from '@/lib/metadata/createPageMetadata';
import CarrinhoContent from './page-content';

export const generateMetadata = createPageMetadata('carrinho');

export default function CarrinhoPage() {
  return <CarrinhoContent />;
}
