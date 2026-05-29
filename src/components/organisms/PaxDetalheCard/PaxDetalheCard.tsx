import PaxAvatar from '@/components/atoms/PaxAvatar/PaxAvatar';
import InfoRow from '@/components/molecules/InfoRow/InfoRow';
import type { PaxInfoItem } from '@/lib/types/pedidos';
import styles from './PaxDetalheCard.module.css';

interface PaxDetalheCardProps {
  voucherId: string;
  passengerName: string;
  initials: string;
  avatarColorIndex: 1 | 2 | 3 | 4 | 5;
  statusLabel: string;
  statusVariant: 'cancel' | 'emit' | 'ongoing' | 'pendente';
  conditionsHref: string;
  comissaoValue: string;
  comissaoPct: string;
  netValue: string;
  infoItems: PaxInfoItem[];
  voucherNumero?: string;
  voucherActions: 'view-download' | 'none';
  cancelDisabled?: boolean;
  cancelLabel: string;
  onCancelClick: () => void;
  onVoucherView?: () => void;
  onVoucherDownload?: () => void;
}

export default function PaxDetalheCard({
  voucherId,
  passengerName,
  initials,
  avatarColorIndex,
  statusLabel,
  statusVariant,
  conditionsHref,
  comissaoValue,
  comissaoPct,
  netValue,
  infoItems,
  voucherNumero,
  voucherActions,
  cancelDisabled = false,
  cancelLabel,
  onCancelClick,
  onVoucherView,
  onVoucherDownload,
}: PaxDetalheCardProps) {
  const badgeClass = [
    styles.badgeMini,
    statusVariant === 'cancel' && styles.badgeMiniCancel,
  ]
    .filter(Boolean)
    .join(' ');

  const cancelBtnClass = [
    styles.btnCancelVch,
    cancelDisabled && styles.btnCancelVchDisabled,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <article className={styles.card}>
      <div className={styles.paxHead}>
        <PaxAvatar initials={initials} colorIndex={avatarColorIndex} />
        <span>#{voucherId} | {passengerName}</span>
        <span className={badgeClass}>{statusLabel}</span>
      </div>

      <div className={styles.paxBody}>
        <div className={styles.brandCell}>
          <span className={styles.logo}>
            <svg viewBox="0 0 130 42" width="120" height="38" aria-label="Sabemi">
              <path d="M6 34 L20 8 L34 34 Z" fill="#004077"/>
              <text x="42" y="26" fontFamily="Mulish, sans-serif" fontSize="22" fontWeight="800" fill="#004077" letterSpacing="-0.5">Sabemi</text>
            </svg>
          </span>
          <a href={conditionsHref} className={styles.pdfLink}>
            <span className={styles.pdfIco}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM7 14h2v1.5H7V17h2v1.5H7V20H5.5v-7H7v1zm5 6h-2v-7h2c1.1 0 2 .9 2 2v3c0 1.1-.9 2-2 2zm6-5h-2v1.5h2V18h-2v2h-1.5v-7H18v2zm-6 .5v3h-.5v-3h.5z"/>
              </svg>
            </span>
            Condições Gerais
          </a>
          <div className={styles.note}>
            *O seguro não é válido para pessoas que já se encontram no destino da viagem.
          </div>
        </div>

        <div className={styles.rightCol}>
          <div className={styles.paxComm}>
            <div className={styles.commItem}>
              <span className={styles.commK}>Valor Comissão</span>
              <span className={`${styles.commV} ${styles.green}`}>{comissaoValue}</span>
            </div>
            <div className={styles.commItem}>
              <span className={styles.commK}>Comissão</span>
              <span className={styles.commV}>{comissaoPct}</span>
            </div>
            <div className={styles.commItem}>
              <span className={styles.commK}>Valor NET</span>
              <span className={styles.commV}>{netValue}</span>
            </div>
          </div>

          <div className={styles.sectionTitle}>
            <span>Dados do Passageiro</span>
            <div className={styles.sectionActions}>
              <button
                className={cancelBtnClass}
                type="button"
                disabled={cancelDisabled}
                onClick={onCancelClick}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="15" y1="9" x2="9" y2="15"/>
                  <line x1="9" y1="9" x2="15" y2="15"/>
                </svg>
                {cancelLabel}
              </button>
            </div>
          </div>

          <div className={styles.paxInfoGrid}>
            {infoItems.map((item, i) => (
              <InfoRow
                key={i}
                icon={item.icon}
                label={item.label}
                value={item.value}
                valueVariant={item.valueVariant}
                variant={item.variant}
              >
                {item.children}
              </InfoRow>
            ))}

            <InfoRow
              icon={
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 7a2 2 0 0 1 2-2h11l5 5v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  <polyline points="14 5 14 9 19 9"/>
                </svg>
              }
              label="Número Voucher"
              value={voucherNumero ?? '— Não emitido —'}
              valueVariant={voucherNumero ? 'mono' : 'default'}
              variant="voucher"
            />

            <InfoRow
              icon={
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
              }
              label="Voucher"
              variant="voucher"
            >
              {voucherActions === 'view-download' ? (
                <div className={styles.voucherBtns}>
                  <button className={styles.btnVis} type="button" onClick={onVoucherView}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                    Visualizar
                  </button>
                  <button className={styles.btnDown} type="button" onClick={onVoucherDownload}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <polyline points="7 10 12 15 17 10"/>
                      <line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                    Download
                  </button>
                </div>
              ) : (
                <span className={styles.voucherEmpty}>— Não disponível —</span>
              )}
            </InfoRow>
          </div>
        </div>
      </div>
    </article>
  );
}
