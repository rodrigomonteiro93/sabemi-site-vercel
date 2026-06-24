import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getEmissorById } from '@/lib/api/emissores';
import { getPageMetadata } from '@/lib/api/pages-metadata';
import EmissorEditarContent from './page-content';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const emissor = await getEmissorById(Number(id));

  if (!emissor) {
    return getPageMetadata('emissor-editar-not-found');
  }

  return getPageMetadata('emissor-editar', { nome: emissor.nome });
}

export default async function EmissorEditarPage({ params }: PageProps) {
  const { id } = await params;
  const emissor = await getEmissorById(Number(id));

  if (!emissor) {
    notFound();
  }

  return <EmissorEditarContent emissor={emissor} />;
}
