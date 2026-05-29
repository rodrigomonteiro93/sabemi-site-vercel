import type { Metadata } from 'next';
import VoucherDetalheContent from './page-content';

export const metadata: Metadata = {
  title: 'Detalhes do Pedido | Sabemi',
  description: 'Visualize os detalhes do seu pedido de seguro viagem.',
};

export default function VoucherDetalhePage() {
  return <VoucherDetalheContent />;
}
