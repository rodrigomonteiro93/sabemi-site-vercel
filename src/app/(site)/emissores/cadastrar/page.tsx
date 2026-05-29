import type { Metadata } from 'next';
import EmissorCadastrarContent from './page-content';

export const metadata: Metadata = {
  title: 'Cadastrar Emissor | Sabemi',
  description: 'Cadastre um novo emissor para sua agência parceira Sabemi.',
};

export default function EmissorCadastrarPage() {
  return <EmissorCadastrarContent />;
}
