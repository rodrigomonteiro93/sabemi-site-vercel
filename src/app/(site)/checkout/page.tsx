import type { Metadata } from 'next';
import CheckoutPageContent from './page-content';

export const metadata: Metadata = {
  title: 'Efetuar Pagamento — Sabemi',
  description: 'Finalize sua compra de seguro viagem Sabemi.',
};

export default function CheckoutPage() {
  return <CheckoutPageContent />;
}
