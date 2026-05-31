export interface CotacaoParams {
  destino: string;   // value do select (ex: 'BR')
  ida: string;       // 'DD-MM-YYYY'
  retorno: string;   // 'DD-MM-YYYY'
  tipo: string;      // value do select (ex: 'lazer')
  ages: number[];    // lista de idades dos passageiros
  coberturas: string; // label do select; vazio = sem filtro
  ordenar: string;    // label do select (ex: 'Menor preço')
}

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
