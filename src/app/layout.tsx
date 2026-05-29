import type { Metadata } from 'next';
import { Mulish } from 'next/font/google';
import '@/styles/globals.css';

const mulish = Mulish({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-mulish',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Sabemi — Seguros de Viagem',
    template: '%s | Sabemi',
  },
  description:
    'Seguros de viagem com cobertura completa. Viaje com tranquilidade nacional e internacionalmente.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={mulish.variable}>
      <body>{children}</body>
    </html>
  );
}
