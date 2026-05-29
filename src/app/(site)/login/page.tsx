import type { Metadata } from 'next';
import LoginContent from './page-content';

export const metadata: Metadata = {
  title: 'Login | Sabemi Seguradora',
  description: 'Acesse sua conta na Sabemi Seguradora.',
};

export default function LoginPage() {
  return <LoginContent />;
}
