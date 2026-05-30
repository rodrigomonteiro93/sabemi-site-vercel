import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Saindo | Sabemi',
  description: 'Encerrando sua sessão na Sabemi.',
};

export default function LogoutPage() {
  redirect('/api/auth/logout');
}
