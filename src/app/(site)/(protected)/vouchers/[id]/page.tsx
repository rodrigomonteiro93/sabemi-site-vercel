import { createPageMetadata } from '@/lib/metadata/createPageMetadata';
import VoucherDetalheContent from './page-content';

export const generateMetadata = createPageMetadata('voucher-detalhe');

export default function VoucherDetalhePage() {
  return <VoucherDetalheContent />;
}
