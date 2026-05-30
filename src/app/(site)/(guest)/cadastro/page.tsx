import type { Metadata } from 'next';
import CadastroContent from './page-content';

export const metadata: Metadata = {
  title: 'Cadastre-se | Sabemi Seguradora',
  description: 'Crie sua conta na Sabemi e comece a oferecer seguros de viagem.',
};

export default function CadastroPage() {
  return <CadastroContent />;
}
