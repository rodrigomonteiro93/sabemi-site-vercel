export const TRIP_DAYS = 5;
export const AGE_RANGE = '0 a 60 anos';

export function formatCurrency(value: number): string {
  return 'R$ ' + value.toFixed(2).replace('.', ',');
}

export function parsePrice(value: string): number {
  return parseFloat(value.replace(',', '.'));
}

export function parseCurrency(value: string): number {
  return parseFloat(value.replace(/[^\d,]/g, '').replace(',', '.'));
}

export function getCartTotals(priceVista: string, priceTotal: string, paxCount: number) {
  const vistaNum = parsePrice(priceVista) * paxCount;
  const cartaoNum = parsePrice(priceTotal) * paxCount;

  return {
    totalVista: formatCurrency(vistaNum),
    totalCartao: formatCurrency(cartaoNum),
    valorCartao: cartaoNum,
  };
}

export function buildPaxLabels(paxCount: number): string[] {
  return Array.from({ length: paxCount }, (_, i) => `Passageiro ${i + 1}`);
}

export function buildPaxDisplayNames(
  paxData: Array<{ nome?: string }>,
  paxCount: number,
): string[] {
  return Array.from({ length: paxCount }, (_, i) => {
    const nome = paxData[i]?.nome?.trim();
    return nome || `Passageiro ${i + 1}`;
  });
}
