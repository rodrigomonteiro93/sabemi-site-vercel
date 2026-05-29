import { ComissaoItem } from '@/lib/types/comissoes';

const NOMES = [
  'Juliano da Silva Monteiro', 'mauricio xavier pereira', 'Michael', 'Francine de Oliveira',
  'Juliana Monteiro', 'Juliano Monteiro', 'Michael Jordan', 'juliano proibiu testes',
  'juliano viado proibiu testar nome', 'Manuel Silva', 'Maria Eduarda Castro', 'Ana Paula Rodrigues',
  'Carlos Eduardo Pereira', 'Beatriz Oliveira', 'Rafael Mendes', 'Patrícia Souza', 'Lucas Martins',
  'Camila Ribeiro', 'Eduardo Lima', 'Roberto Almeida', 'Renata Cardoso', 'Felipe Nascimento',
];
const EMISSORES = ['Agência Teste', 'Agência Teste', 'Agência Teste', 'Joao teste', 'Sua Corretora', 'Agencia de viagens'];
const STATUSES = ['liberada', 'liberada', 'liberada', 'liberada', 'aguardando', 'aguardando', 'bloqueada'] as const;

let seed = 1;
function srand() { const x = Math.sin(seed++) * 10000; return x - Math.floor(x); }
function spick<T>(a: T[]): T { return a[Math.floor(srand() * a.length)]; }
function srandInt(a: number, b: number) { return Math.floor(srand() * (b - a + 1)) + a; }
function pad2(n: number) { return String(n).padStart(2, '0'); }
function fakeDoc() {
  return `${pad2(srandInt(0, 999))}.${pad2(srandInt(0, 999))}.${pad2(srandInt(0, 999))}-${pad2(srandInt(0, 99))}`;
}

export const COMISSOES_MOCK: ComissaoItem[] = Array.from({ length: 238 }, (_, i) => {
  const id = 27864 - i;
  const nome = spick(NOMES);
  const emissor = spick(EMISSORES);
  const pct = [10, 20, 30, 30, 30][srandInt(0, 4)];
  const net = srandInt(2000, 35000) / 100;
  const com = parseFloat((net * pct / 100).toFixed(2));
  const doc = fakeDoc();
  const day = pad2(srandInt(1, 28));
  const mon = pad2(srandInt(1, 5));
  const status = spick([...STATUSES]);
  return {
    id,
    emissor,
    paxName: nome,
    paxDoc: doc,
    paxAvatarIndex: ((i % 5) + 1) as 1 | 2 | 3 | 4 | 5,
    netValue: `R$ ${net.toFixed(2).replace('.', ',')}`,
    comValue: `R$ ${com.toFixed(2).replace('.', ',')}`,
    comPct: `${pct},00%`,
    date: `${day}/${mon}/2026`,
    status,
    _comNum: com,
  } satisfies ComissaoItem;
});
