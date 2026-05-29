import FaturaComRow from '@/components/molecules/FaturaComRow';
import PaginationBar from '@/components/molecules/PaginationBar';
import type { FaturaComissaoItem } from '@/lib/types/financeiro';
import styles from './FaturaComissoesSection.module.css';

interface FaturaComissoesSectionProps {
  items: FaturaComissaoItem[];
  netTotal: string;
  comissaoTotal: string;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

export default function FaturaComissoesSection({
  items,
  netTotal,
  comissaoTotal,
  currentPage,
  totalPages,
  totalItems,
  onPageChange,
}: FaturaComissoesSectionProps) {
  const showingCount = items.length;

  return (
    <div className={styles.wrap}>
      <div className={styles.sectionHead}>
        <h2 className={styles.sectionTitle}>Comissões da fatura</h2>
        <div className={styles.sectionMeta}>
          Mostrando <b>{showingCount}</b> de <b>{totalItems}</b> comissões nesta fatura
        </div>
      </div>

      <div className={styles.ctbl}>
        <div className={styles.ctblHead}>
          <h3 className={styles.ctblTitle}>Detalhamento</h3>
          <div className={styles.totals}>
            <span>Valor NET total: <b>{netTotal}</b></span>
            <span>Comissão total: <b className={styles.totalComissao}>{comissaoTotal}</b></span>
          </div>
        </div>

        <div className={`${styles.crowHead} ${styles.crowGrid}`}>
          <div>Voucher</div>
          <div>Plano</div>
          <div>Passageiro</div>
          <div>Emissor</div>
          <div className={styles.colR}>Valor comissão</div>
          <div className={styles.colR}>Valor NET</div>
        </div>

        {items.map((item, i) => (
          <FaturaComRow
            key={`${item.id}-${i}`}
            item={item}
            avatarColorIndex={((i % 5) + 1) as 1 | 2 | 3 | 4 | 5}
          />
        ))}

        <div className={styles.ctblFoot}>
          <div className={styles.footMeta}>
            Página <b>{currentPage}</b> de <b>{totalPages}</b> · {totalItems} lançamentos
          </div>
          <PaginationBar
            pageFrom={(currentPage - 1) * items.length + 1}
            pageTo={Math.min(currentPage * items.length, totalItems)}
            total={totalItems}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
            showRangeMeta={false}
            embedded
          />
        </div>
      </div>
    </div>
  );
}
