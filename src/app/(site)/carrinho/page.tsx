import type { Metadata } from 'next';
import CarrinhoContent from './page-content';

export const metadata: Metadata = {
  title: 'Carrinho | Sabemi',
  description: 'Preencha os dados dos passageiros e finalize sua compra de seguro viagem.',
};

export default function CarrinhoPage() {
  return <CarrinhoContent />;
}
