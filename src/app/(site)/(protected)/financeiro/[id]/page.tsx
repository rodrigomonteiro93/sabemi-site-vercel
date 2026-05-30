import type { Metadata } from 'next';
import FaturaDetalheContent from './page-content';
import type { FaturaDetalheData } from '@/lib/types/financeiro';

interface PageProps {
  params: { id: string };
}

export function generateMetadata({ params }: PageProps): Metadata {
  return {
    title: `Fatura #${params.id} — Sabemi`,
    description: `Detalhe da fatura #${params.id} da área do parceiro Sabemi.`,
  };
}

// Dados estáticos — Fase 2
// Em Fase 5: substituir por chamada a lib/api/financeiro.ts
const MOCK_FATURA: FaturaDetalheData = {
  id: '5069',
  geradaEm: 'Gerada em 25/01/2026 às 06:00',
  heroTotalLabel: 'Total a pagar',
  heroTotal: 'R$ 116,24',
  heroTotalSub: '1 pedido · 2 comissões deduzidas',
  statusVariant: 'vencida',
  statusSub: 'Venceu em 04/02/2026 (113 dias em atraso)',
  statusSubLate: true,
  infoItems: [
    {
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="16" rx="2"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
      ),
      label: 'Data emissão',
      value: '25/01/2026 06:00:09',
    },
    {
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
        </svg>
      ),
      label: 'Vencimento',
      value: '04/02/2026',
      valueVariant: 'danger',
    },
    {
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
      ),
      label: 'Período',
      value: '01/01 → 24/01/2026',
    },
    {
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 7a2 2 0 0 1 2-2h11l5 5v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="14 5 14 9 19 9"/>
        </svg>
      ),
      label: 'Qtde pedidos',
      value: '1',
    },
    {
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/><path d="M9.5 9a2.5 2.5 0 0 1 5 0c0 1-1 2-2.5 2v1"/><line x1="12" y1="15.5" x2="12" y2="15.5"/>
        </svg>
      ),
      label: 'Total pedidos',
      value: 'R$ 166,06',
    },
    {
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
        </svg>
      ),
      label: 'Qtde comissões',
      value: '2',
    },
    {
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
        </svg>
      ),
      label: 'Total comissões',
      value: '– R$ 49,82',
      valueVariant: 'success',
    },
    {
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9"/><path d="M14.5 9a2.5 2.5 0 0 0-5 0c0 1.5 2.5 2.5 2.5 3.5"/><line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
      ),
      label: 'Forma de pagamento',
      value: 'Boleto bancário',
    },
    {
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
        </svg>
      ),
      label: 'Nota fiscal',
      value: 'NF-e 2026/00482',
      valueVariant: 'mono',
    },
  ],
  comissoes: [
    {
      id: '25299',
      plano: 'SABEMI 15K Brasil',
      cliente: 'Joao Silva',
      cpf: '881.344.970-47',
      emissor: 'Agência Teste',
      comissao: 'R$ 0,00',
      comissaoPct: '0,00%',
      net: 'R$ 83,03',
    },
    {
      id: '25299',
      plano: 'SABEMI 15K Brasil',
      cliente: 'Manuel Silva',
      cpf: '996.314.800-03',
      emissor: 'Agência Teste',
      comissao: 'R$ 0,00',
      comissaoPct: '0,00%',
      net: 'R$ 83,03',
    },
  ],
  netTotal: 'R$ 166,06',
  comissaoTotal: 'R$ 49,82',
  totalItems: 2,
};

export default function Page({ params }: PageProps) {
  return <FaturaDetalheContent fatura={{ ...MOCK_FATURA, id: params.id }} />;
}
