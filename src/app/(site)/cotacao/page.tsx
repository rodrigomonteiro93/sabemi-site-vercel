import type { Metadata } from 'next';
import { getPlanos } from '@/lib/api/plans';
import { DEFAULT_COTACAO_SORT, parseCotacaoSort } from '@/lib/cotacao/sortPlans';
import type { CotacaoParams } from '@/lib/types/cotacao';
import CotacaoContent from './page-content';

export const metadata: Metadata = {
  title: 'Cotação de Seguro Viagem — Sabemi',
  description: 'Compare planos de seguro viagem e encontre a melhor cobertura para o seu destino.',
};

function parseSearchParams(sp: Record<string, string | string[] | undefined>): CotacaoParams {
  const get = (k: string, fallback: string): string =>
    typeof sp[k] === 'string' ? (sp[k] as string) : fallback;
  const agesRaw = get('ages', '30');
  const ages = agesRaw.split(',').map(a => parseInt(a, 10) || 30);
  return {
    destino: get('destino', 'BR'),
    ida:     get('ida',     '06-07-2026'),
    retorno: get('retorno', '10-07-2026'),
    tipo:    get('tipo',    'lazer'),
    ages,
    coberturas: get('coberturas', ''),
    ordenar:    parseCotacaoSort(get('ordenar', DEFAULT_COTACAO_SORT)),
  };
}

export default async function CotacaoPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const params = parseSearchParams(searchParams);
  const plans  = await getPlanos(params);
  return <CotacaoContent initialParams={params} initialPlans={plans} />;
}
