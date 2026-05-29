export interface CotacaoPlan {
  brand: 'sabemi' | 'intermac';
  name: string;
  med: string;
  cov: boolean;
  bag: string | null;
  bagCov?: string;
  others: [string, string][];
  total: string;
  vista: string;
  comCard: string;
  comBoleto: string;
}

export const PLANS: CotacaoPlan[] = [
  {
    brand: 'sabemi', name: 'Sabemi 15K Brasil',
    med: '15.000', cov: false, bag: '1.000',
    others: [['Despesas Farmacêuticas','R$ 500'],['Traslado Médico','R$ 10.000'],['Cancelamento Padrão','Incluso'],['Cancelamento Plus','R$ 500']],
    total: '23,00', vista: '21,85', comCard: '6,98', comBoleto: '6,55',
  },
  {
    brand: 'sabemi', name: 'Sabemi 15K Brasil — com COVID',
    med: '15.000', cov: true, bag: null, bagCov: '15.000',
    others: [['Despesas Farmacêuticas','R$ 150'],['Traslado Médico','R$ 15.000']],
    total: '27,10', vista: '25,75', comCard: '8,13', comBoleto: '7,72',
  },
  {
    brand: 'sabemi', name: 'Sabemi 30K Brasil',
    med: '30.000', cov: false, bag: '1.000',
    others: [['Despesas Farmacêuticas','R$ 500'],['Traslado Médico','R$ 15.000'],['Cancelamento Padrão','Incluso'],['Cancelamento Plus','R$ 1.200']],
    total: '27,60', vista: '26,25', comCard: '8,28', comBoleto: '7,88',
  },
  {
    brand: 'sabemi', name: 'Sabemi 50K Brasil',
    med: '50.000', cov: false, bag: '1.000',
    others: [['Despesas Farmacêuticas','R$ 500'],['Traslado Médico','R$ 25.000'],['Cancelamento Padrão','Incluso'],['Cancelamento Plus','R$ 1.000']],
    total: '35,80', vista: '34,05', comCard: '10,74', comBoleto: '10,21',
  },
  {
    brand: 'sabemi', name: 'Sabemi 40K Brasil — com COVID',
    med: '40.000', cov: true, bag: null, bagCov: '40.000',
    others: [['Despesas Farmacêuticas','R$ 400'],['Traslado Médico','R$ 40.000']],
    total: '37,35', vista: '35,50', comCard: '11,21', comBoleto: '10,65',
  },
  {
    brand: 'sabemi', name: 'Sabemi 100K Brasil',
    med: '100.000', cov: false, bag: '1.500',
    others: [['Despesas Farmacêuticas','R$ 1.000'],['Traslado Médico','R$ 40.000'],['Cancelamento Padrão','Incluso'],['Cancelamento Plus','R$ 1.000']],
    total: '47,60', vista: '45,25', comCard: '14,28', comBoleto: '13,57',
  },
  {
    brand: 'sabemi', name: 'Sabemi 75K Brasil — com COVID',
    med: '75.000', cov: true, bag: null, bagCov: '75.000',
    others: [['Despesas Farmacêuticas','R$ 750'],['Traslado Médico','R$ 75.000']],
    total: '63,00', vista: '59,85', comCard: '18,90', comBoleto: '17,95',
  },
  {
    brand: 'sabemi', name: 'Sabemi 100K Brasil — com COVID',
    med: '100.000', cov: true, bag: null, bagCov: '100.000',
    others: [['Despesas Farmacêuticas','R$ 1.000'],['Traslado Médico','R$ 100.000']],
    total: '80,95', vista: '76,90', comCard: '24,29', comBoleto: '23,07',
  },
];

export function buildCoberturas(p: CotacaoPlan): [string, string][] {
  const others = Object.fromEntries(p.others);
  const rows: [string, string][] = [
    ['Despesas Médicas Hospitalares em Viagem', `R$ ${p.med} (por evento)`],
  ];
  if (p.cov) {
    rows.push(['Despesas Médicas e Hospitalares por COVID-19 diagnosticado durante a viagem', 'INCLUÍDO NO DMH']);
  } else {
    rows.push(['Extravio de Bagagem', `R$ ${p.bag}`]);
  }
  rows.push(
    ['Despesas Odontológicas em Viagem (DO)', 'R$ 500,00'],
    ['Despesas Farmacêuticas', others['Despesas Farmacêuticas'] || 'R$ 500'],
    ['Regresso Antecipado', 'R$ 1.500'],
    ['Regresso Sanitário', others['Regresso Sanitário'] || 'R$ 30.000,00'],
    ['Traslado de Corpo', 'R$ 15.000,00'],
    ['Traslado Médico', others['Traslado Médico'] || 'R$ 15.000,00'],
    ['Interrupção de Viagem', 'R$ 1.000,00'],
    ['Invalidez Total e Parcial por Acidente', 'R$ 30.000,00'],
    ['Morte Acidental em Viagem', 'R$ 30.000,00'],
  );
  if (!p.cov && others['Cancelamento Padrão']) rows.push(['Cancelamento de Viagem — Padrão', others['Cancelamento Padrão']]);
  if (!p.cov && others['Cancelamento Plus']) rows.push(['Cancelamento de Viagem — Plus', others['Cancelamento Plus']]);
  return rows;
}
