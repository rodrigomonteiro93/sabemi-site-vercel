import Button from '@/components/atoms/Button';
import VoucherCard from '@/components/molecules/VoucherCard';
import type { VoucherItem } from '@/lib/types/dashboard';
import styles from './VoucherListSection.module.css';

interface VoucherListSectionProps {
  title: string;
  vouchers: VoucherItem[];
  allHref: string;
}

export default function VoucherListSection({ title, vouchers, allHref }: VoucherListSectionProps) {
  return (
    <div>
      <div className={styles.sectionTtl2}>{title}</div>
      <div className={styles.voucherList}>
        {vouchers.map((v) => (
          <VoucherCard key={v.id} {...v} />
        ))}
      </div>
      <div className={styles.showAllWrap}>
        <Button variant="primary" href={allHref}>Todos vouchers →</Button>
      </div>
    </div>
  );
}
