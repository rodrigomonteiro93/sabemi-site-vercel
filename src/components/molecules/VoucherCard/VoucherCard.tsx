import StatusBadge from '@/components/atoms/StatusBadge';
import type { VoucherItem } from '@/lib/types/dashboard';
import styles from './VoucherCard.module.css';

type VoucherCardProps = VoucherItem;

export default function VoucherCard({
  id, total, nome, data, pedido, planos, status, urlPag,
}: VoucherCardProps) {
  return (
    <article className={styles.voucher}>
      <div className={styles.voucherHead}>VOUCHER #{id}</div>
      <div className={styles.voucherBody}>
        <div className={styles.summaryLabel}>Resumo da compra</div>
        <div className={styles.info}>

          <div className={styles.infoRow}>
            <span className={styles.k}>Total</span>
            <span className={`${styles.v} ${styles.price}`}>{total}</span>
            <span className={styles.k}>Status</span>
            <span className={styles.v}>
              <StatusBadge variant={status} />
              {urlPag && (
                <a href="#" className={styles.urlLink}>URL pagamento</a>
              )}
            </span>
            <span />
          </div>

          <div className={styles.infoRow}>
            <span className={styles.k}>Nome</span>
            <span className={styles.v}>{nome}</span>
            <span className={styles.k}>Pedido</span>
            <span className={styles.v}>{pedido}</span>
            <span />
          </div>

          <div className={styles.infoRow}>
            <span className={styles.k}>Data</span>
            <span className={styles.v}>{data}</span>
            <span className={styles.k}>Planos</span>
            <span className={styles.v}>{planos}</span>
            <a href="#" className={styles.det}>Mais detalhes →</a>
          </div>

        </div>
      </div>
    </article>
  );
}
