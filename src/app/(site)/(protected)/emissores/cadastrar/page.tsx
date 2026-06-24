import { createPageMetadata } from '@/lib/metadata/createPageMetadata';
import EmissorCadastrarContent from './page-content';

export const generateMetadata = createPageMetadata('emissores-cadastrar');

export default function EmissorCadastrarPage() {
  return <EmissorCadastrarContent />;
}
