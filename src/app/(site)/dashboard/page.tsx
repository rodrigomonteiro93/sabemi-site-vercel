import type { Metadata } from 'next';
import DashboardPageContent from './page-content';
import type { ComissaoRow, VoucherItem, KpiItemData } from '@/lib/types/dashboard';

export const metadata: Metadata = {
  title: 'Dashboard | Sabemi',
  description: 'Painel de controle da sua agência parceira Sabemi.',
};

const VOUCHERS: VoucherItem[] = [
  { id: '27270', total: 'R$ 217,96', nome: 'Juliano da Silva Monteiro', data: '19/04/2026', pedido: '#27270', planos: 1, status: 'cancel',   urlPag: false },
  { id: '27059', total: 'R$ 27,69',  nome: 'Michael Jordan',           data: '13/04/2026', pedido: '#27059', planos: 1, status: 'pendente', urlPag: true  },
  { id: '26736', total: 'R$ 26,25',  nome: 'Juliano da Silva Monteiro', data: '27/03/2026', pedido: '#26736', planos: 1, status: 'emit',     urlPag: false },
];

const COMISSOES: ComissaoRow[] = [
  { voucher: '#27864', percent: '30,00%', comissao: 'R$ 8,74',   data: '26/05/2026' },
  { voucher: '#27637', percent: '10,00%', comissao: 'R$ 308,53', data: '20/05/2026' },
  { voucher: '#27571', percent: '30,00%', comissao: 'R$ 21,85',  data: '14/05/2026' },
  { voucher: '#27391', percent: '30,00%', comissao: 'R$ 173,25', data: '09/05/2026' },
  { voucher: '#27271', percent: '30,00%', comissao: 'R$ 21,85',  data: '04/05/2026' },
  { voucher: '#27190', percent: '30,00%', comissao: 'R$ 57,40',  data: '02/05/2026' },
];

const KPIS: KpiItemData[] = [
  { variant: 'vouchers',  label: 'Vouchers emitidos',  value: '38',       valueSmall: 'vouchers', sub: '↑ <b>+12%</b> vs. período anterior'       },
  { variant: 'comissoes', label: 'Total em comissões', value: 'R$ 2.143', valueSmall: ',80',      sub: '23 lançamentos · média <b>R$ 93,21</b>'    },
  { variant: 'faturas',   label: 'Faturas a vencer',   value: 'R$ 487',   valueSmall: ',20',      sub: '<b>3</b> faturas · próxima em 31/05'        },
];

export default function DashboardPage() {
  return (
    <DashboardPageContent
      agencyName="Agência Teste"
      cambio={{
        date: '27 de maio de 2026',
        pair: 'USD → BRL · Dólar comercial',
        currency: 'R$',
        value: '5,12',
        delta: '+ R$ 0,08 (1,59%) vs. ontem',
        deltaType: 'up',
        updatedAt: 'Atualizado às 09:15 — fonte BCB · PTAX',
        histHref: '#',
      }}
      comissoes={{ rows: COMISSOES, allHref: '/comissoes' }}
      kpis={{ title: 'Resumo dos últimos 30 dias', items: KPIS }}
      vouchers={{ title: 'Últimos Vouchers', vouchers: VOUCHERS, allHref: '/vouchers' }}
    />
  );
}
