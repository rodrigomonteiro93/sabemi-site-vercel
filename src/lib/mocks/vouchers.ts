import type { VoucherPageItem, VoucherStatus } from '@/lib/types/vouchers';

export function generateMockVouchers(): VoucherPageItem[] {
  const NOMES = [
    'Mariana Castro', 'Carlos Eduardo Pereira', 'Juliano da Silva Monteiro', 'Ana Paula Rodrigues',
    'Michael Jordan', 'Beatriz Oliveira', 'Roberto Almeida', 'Fernanda Costa', 'Lucas Martins',
    'Patrícia Souza', 'Rafael Mendes', 'Camila Ribeiro', 'Eduardo Lima', 'Juliana Gomes',
    'Pedro Henrique', 'Larissa Fernandes', 'Gustavo Barbosa', 'Renata Cardoso', 'Thiago Carvalho',
    'Vanessa Pinto', 'Bruno Araújo', 'Daniela Cunha', 'Felipe Nascimento', 'Adriana Moreira',
    'Marcelo Dias', 'Cristina Vieira', 'André Reis', 'Bianca Teixeira', 'Henrique Sales',
  ];
  const DESTINOS = [
    'Portugal', 'Estados Unidos', 'Argentina', 'Europa (Schengen)',
    'Brasil', 'Chile', 'Itália', 'França', 'Espanha',
    'Reino Unido', 'México', 'Canadá', 'Uruguai', 'Peru',
  ];
  const STATUSES: VoucherStatus[] = ['emit', 'emit', 'emit', 'emit', 'pendente', 'cancel'];

  const HOJE = new Date(2026, 4, 27);
  let seed = 1;
  const srand = () => { const x = Math.sin(seed++) * 10000; return x - Math.floor(x); };
  const srandInt = (a: number, b: number) => Math.floor(srand() * (b - a + 1)) + a;
  const spick = <T,>(arr: T[]): T => arr[Math.floor(srand() * arr.length)];
  const pad2 = (n: number) => String(n).padStart(2, '0');
  const fmt = (d: Date) => `${pad2(d.getDate())}/${pad2(d.getMonth() + 1)}/${d.getFullYear()}`;

  const vouchers: VoucherPageItem[] = [];
  for (let i = 0; i < 318; i++) {
    const id = 27864 - i;
    const nome = spick(NOMES);
    const destino = spick(DESTINOS);
    const dias = srandInt(3, 30);
    const startOffset = srandInt(-60, 60);
    const start = new Date(HOJE);
    start.setDate(HOJE.getDate() + startOffset);
    const end = new Date(start);
    end.setDate(start.getDate() + dias - 1);
    const totalNum = srandInt(50, 200000) / 100;
    const totalStr = `R$ ${totalNum.toFixed(2).replace('.', ',')}`;
    const status = STATUSES[srandInt(0, STATUSES.length - 1)];
    const comissao = status === 'cancel'
      ? null
      : `R$ ${(totalNum * (srandInt(10, 30) / 100)).toFixed(2).replace('.', ',')}`;
    vouchers.push({ id, nome, destino, dias, start: fmt(start), end: fmt(end), total: totalStr, comissao, status });
  }
  return vouchers;
}

export const VOUCHERS_MOCK: VoucherPageItem[] = generateMockVouchers();
