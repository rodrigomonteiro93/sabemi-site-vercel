import { createPageMetadata } from '@/lib/metadata/createPageMetadata';
import CadastroContent from './page-content';

export const generateMetadata = createPageMetadata('cadastro');

export default function CadastroPage() {
  return <CadastroContent />;
}
