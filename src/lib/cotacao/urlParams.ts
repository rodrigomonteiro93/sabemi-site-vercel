import { DEFAULT_COTACAO_SORT } from '@/lib/cotacao/sortPlans';
import { getDestinoValue, getTipoValue } from '@/lib/data/destinos';

export function displayDateToUrl(date: string): string {
  return date.split('/').join('-');
}

export function buildCotacaoQueryString(state: {
  destino: string;
  ida: string;
  retorno: string;
  tipo: string;
  ages: number[];
  coberturas: string;
  ordenar: string;
}): string {
  const params = new URLSearchParams({
    destino: getDestinoValue(state.destino),
    ida: displayDateToUrl(state.ida),
    retorno: displayDateToUrl(state.retorno),
    tipo: getTipoValue(state.tipo),
    ages: state.ages.join(','),
    ordenar: state.ordenar || DEFAULT_COTACAO_SORT,
  });
  if (state.coberturas) {
    params.set('coberturas', state.coberturas);
  }
  return params.toString();
}
