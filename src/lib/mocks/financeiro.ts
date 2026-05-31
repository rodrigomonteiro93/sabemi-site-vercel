import type { FinanceiroItem } from '@/lib/types/financeiro';

export function generateMockFaturas(): FinanceiroItem[] {
  const HOJE = new Date(2026, 4, 27);
  let seed = 7;
  function srand() {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  }
  function srandInt(a: number, b: number) {
    return Math.floor(srand() * (b - a + 1)) + a;
  }
  function pad2(n: number) {
    return String(n).padStart(2, '0');
  }

  const items: FinanceiroItem[] = [];
  for (let i = 0; i < 132; i++) {
    const day = srandInt(1, 28);
    const mon = srandInt(1, 12);
    const year = 2022 + srandInt(0, 4);
    const dateStr = `${pad2(day)}/${pad2(mon)}/${year}`;
    const dateObj = new Date(year, mon - 1, day);
    const venc = new Date(dateObj);
    venc.setDate(venc.getDate() + 10);

    const qPedidos = srandInt(1, 70);
    const totalPedidos = +(srandInt(1000, 9550000) / 100).toFixed(2);
    const qComissoes = srandInt(0, Math.min(qPedidos * 2, 70));
    const totalComissoes = +(totalPedidos * (srandInt(5, 30) / 100)).toFixed(2);
    const total = +(totalPedidos - totalComissoes).toFixed(2);

    let status: FinanceiroItem['status'];
    const r = srand();
    if (venc < HOJE) {
      status = r < 0.8 ? 'recebida' : 'vencida';
    } else if (Math.abs(venc.getTime() - HOJE.getTime()) < 5 * 86400000) {
      status = r < 0.5 ? 'aberta' : 'processando';
    } else {
      status = r < 0.6 ? 'aberta' : 'recebida';
    }

    items.push({
      id: 1000 + (132 - i),
      date: dateStr,
      dateObj,
      venc,
      qPedidos,
      totalPedidos,
      qComissoes,
      totalComissoes,
      total,
      status,
      hasBoleto: srand() > 0.1,
    });
  }

  return items.sort((a, b) => b.dateObj.getTime() - a.dateObj.getTime());
}

export const FINANCEIRO_MOCK: FinanceiroItem[] = generateMockFaturas();
