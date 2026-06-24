import { createPageMetadata } from '@/lib/metadata/createPageMetadata';
import CheckoutPageContent from './page-content';

export const generateMetadata = createPageMetadata('checkout');

export default function CheckoutPage() {
  return <CheckoutPageContent />;
}
