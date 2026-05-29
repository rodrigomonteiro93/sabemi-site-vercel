'use client';

import { useState } from 'react';
import SiteHeader from '@/components/organisms/SiteHeader/SiteHeader';
import SiteFooter from '@/components/organisms/SiteFooter/SiteFooter';
import WhatsAppFab from '@/components/atoms/WhatsAppFab/WhatsAppFab';
import UserSidebar from '@/components/organisms/UserSidebar/UserSidebar';
import BackLink from '@/components/atoms/BackLink/BackLink';
import PageTitleBar from '@/components/molecules/PageTitleBar/PageTitleBar';
import ComKpiCard from '@/components/molecules/ComKpiCard/ComKpiCard';
import PedidoCard from '@/components/organisms/PedidoCard/PedidoCard';
import PaxDetalheCard from '@/components/organisms/PaxDetalheCard/PaxDetalheCard';
import CancelModal from '@/components/organisms/CancelModal/CancelModal';
import styles from './page-content.module.css';

const icoUser = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);
const icoEmail = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);
const icoPhone = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);
const icoDoc = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="16" rx="2"/>
    <line x1="7" y1="9" x2="17" y2="9"/>
    <line x1="7" y1="13" x2="13" y2="13"/>
  </svg>
);
const icoCal = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="16" rx="2"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);
const icoLayers = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L2 7l10 5 10-5-10-5z"/>
    <polyline points="2 17 12 22 22 17"/>
    <polyline points="2 12 12 17 22 12"/>
  </svg>
);
const icoPin = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);
const icoPlane = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>
  </svg>
);
const icoArrowRight = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
);
const icoArrowLeft = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12"/>
    <polyline points="12 19 5 12 12 5"/>
  </svg>
);
const icoDownload = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);
const icoX = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="15" y1="9" x2="9" y2="15"/>
    <line x1="9" y1="9" x2="15" y2="15"/>
  </svg>
);

const ORDER_REASON_OPTIONS = [
  'Viagem desmarcada / remarcada',
  'Cliente desistiu da contratação',
  'Erro no cadastro do passageiro',
  'Pagamento não realizado',
  'Duplicidade de emissão',
  'Outro motivo (descrever abaixo)',
];

const PAX_REASON_OPTIONS = [
  'Passageiro não viajará',
  'Mudança de período da viagem',
  'Mudança de destino',
  'Erro no cadastro do passageiro',
  'Duplicidade de emissão',
  'Outro motivo (descrever abaixo)',
];

export default function VoucherDetalheContent() {
  const [cancelOrderOpen, setCancelOrderOpen] = useState(false);
  const [cancelPaxTarget, setCancelPaxTarget] = useState<{ nome: string; voucherId: string } | null>(null);

  return (
    <>
      <SiteHeader />
      <main className={styles.page}>
        <div className={styles.container}>
          <div className={styles.pageGrid}>
            <UserSidebar
              agencyName="Agência Teste"
              cotarHref="/cotacao"
              copyLinkValue="https://sabemi.com.br/?ref=agencia-teste"
              copyRegisterLinkValue="https://sabemi.com.br/cadastro/?ref=agencia-teste"
            />

            <section className={styles.content}>
              <BackLink href="/vouchers">Voltar para Vouchers</BackLink>

              <PageTitleBar
                title="Detalhes do Pedido"
                subtitle="Pedido emitido em 19/04/2026 às 09:30 · 2 passageiros"
                actions={[
                  {
                    label: 'Baixar pedido (PDF)',
                    icon: icoDownload,
                    variant: 'outline',
                    onClick: () => {},
                  },
                  {
                    label: 'Solicitar cancelamento',
                    icon: icoX,
                    variant: 'danger',
                    onClick: () => setCancelOrderOpen(true),
                  },
                ]}
              />

              <div className={styles.kpiStrip}>
                <ComKpiCard
                  label="Status do pedido"
                  value="Cancelado"
                  sub="cancelado em 23/04/2026"
                  colorVariant="danger"
                  valueSize="compact"
                />
                <ComKpiCard
                  label="Valor total"
                  value="R$ 217,96"
                  sub="2 passageiros"
                />
                <ComKpiCard
                  label="Comissão total"
                  value="R$ 124,48"
                  sub="média 30,00%"
                  colorVariant="success"
                />
                <ComKpiCard
                  label="Valor NET"
                  value="R$ 290,46"
                  sub="a receber líquido"
                />
              </div>

              <PedidoCard
                pedidoId="27270"
                heroTotalLabel="Valor total do pedido"
                heroTotal="R$ 217,96"
                heroTotalSub="2 passageiros · FATURADO"
                statusVariant="cancel"
                statusSub="cancelado em 23/04/2026"
                emitidoEm="19/04/2026 · 09:30"
                infoItems={[
                  { icon: icoUser, label: 'Cliente', value: 'Agencia Teste' },
                  { icon: icoEmail, label: 'E-mail', value: 'julianodesenv@gmail.com' },
                  { icon: icoPhone, label: 'Telefone', value: '(56) 4456-54564' },
                  { label: 'CPF / CNPJ', value: '29.581.218/0001-69' },
                  { label: 'Cupom desconto', value: '—' },
                  { label: 'Planos', value: '2 vouchers' },
                ]}
              />

              <h2 className={styles.paxTitle}>Passageiros do pedido</h2>

              <PaxDetalheCard
                voucherId="168071"
                passengerName="Juliano da Silva Monteiro"
                initials="JM"
                avatarColorIndex={1}
                statusLabel="CANCELADO"
                statusVariant="cancel"
                conditionsHref="#"
                comissaoValue="R$ 65,39"
                comissaoPct="30,00%"
                netValue="R$ 152,57"
                cancelDisabled
                cancelLabel="Cancelado"
                onCancelClick={() => {}}
                voucherActions="none"
                infoItems={[
                  { icon: icoUser, label: 'Nome', value: 'Juliano da Silva Monteiro' },
                  { icon: icoEmail, label: 'E-mail', value: 'juliano@sabemi.com.br' },
                  { icon: icoDoc, label: 'Documento', value: 'CPF: 025.765.530-10' },
                  { icon: icoPhone, label: 'Telefone', value: '(51) 98041-1919' },
                  { icon: icoCal, label: 'Data Nascimento', value: '23/08/1991' },
                  { icon: icoLayers, label: 'Plano', value: 'SABEMI MAX 30K EUA C/ COVID-19 — até 65 anos' },
                  { icon: icoPin, label: 'Destino', value: 'América do Norte — EUA' },
                  { icon: icoPlane, label: 'Tipo Viagem', value: 'Lazer / Turismo / Negócios' },
                  { icon: icoArrowRight, label: 'Partida', value: '28/05/2026' },
                  { icon: icoArrowLeft, label: 'Retorno', value: '04/06/2026' },
                ]}
              />

              <PaxDetalheCard
                voucherId="164571"
                passengerName="Maria Eduarda Monteiro"
                initials="ME"
                avatarColorIndex={2}
                statusLabel="EMITIDO"
                statusVariant="emit"
                conditionsHref="#"
                comissaoValue="R$ 59,09"
                comissaoPct="30,00%"
                netValue="R$ 137,89"
                cancelDisabled={false}
                cancelLabel="Solicitar cancelamento"
                onCancelClick={() => setCancelPaxTarget({ nome: 'Maria Eduarda Monteiro', voucherId: '164571' })}
                voucherNumero="SA-202604027707"
                voucherActions="view-download"
                onVoucherView={() => {}}
                onVoucherDownload={() => {}}
                infoItems={[
                  { icon: icoUser, label: 'Nome', value: 'Maria Eduarda Monteiro' },
                  { icon: icoEmail, label: 'E-mail', value: 'maria@sabemi.com.br' },
                  { icon: icoDoc, label: 'Documento', value: 'Passaporte: NHFL0938' },
                  { icon: icoPhone, label: 'Telefone', value: '(51) 98041-1919' },
                  { icon: icoCal, label: 'Data Nascimento', value: '12/03/1995' },
                  { icon: icoLayers, label: 'Plano', value: 'SABEMI 70 — internacional' },
                  { icon: icoPin, label: 'Destino', value: 'América do Sul' },
                  { icon: icoPlane, label: 'Tipo Viagem', value: 'Emissivo para estrangeiros' },
                  { icon: icoArrowRight, label: 'Partida', value: '17/04/2026' },
                  { icon: icoArrowLeft, label: 'Retorno', value: '23/04/2026' },
                ]}
              />
            </section>
          </div>
        </div>
      </main>

      <CancelModal
        isOpen={cancelOrderOpen}
        title="Solicitar cancelamento do pedido"
        alertText={
          <>
            O cancelamento do pedido <b>encerra todos os vouchers</b> dos passageiros vinculados. A solicitação será analisada pela equipe Sabemi em até <b>24h úteis</b>.
          </>
        }
        subjectText={<>Pedido <b>#27270</b> · Agência Teste · R$ 217,96 · 2 passageiros</>}
        reasonOptions={ORDER_REASON_OPTIONS}
        onClose={() => setCancelOrderOpen(false)}
        onSubmit={() => {}}
      />

      <CancelModal
        isOpen={!!cancelPaxTarget}
        title="Solicitar cancelamento de voucher"
        alertText={
          <>
            Apenas <b>este voucher</b> será cancelado. Os demais passageiros do pedido continuam ativos. A solicitação é analisada pela Sabemi em até <b>24h úteis</b>.
          </>
        }
        subjectText={
          cancelPaxTarget
            ? <>Voucher <b>#{cancelPaxTarget.voucherId}</b> · <b>{cancelPaxTarget.nome}</b></>
            : null
        }
        reasonOptions={PAX_REASON_OPTIONS}
        onClose={() => setCancelPaxTarget(null)}
        onSubmit={() => {}}
      />

      <SiteFooter />
      <WhatsAppFab />
    </>
  );
}
