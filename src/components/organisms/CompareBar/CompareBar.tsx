'use client';
import { useCotacaoStore } from '@/lib/stores/cotacaoStore';
import styles from './CompareBar.module.css';

export default function CompareBar() {
  const { compared, openCompareModal, clearCompare } = useCotacaoStore();
  const count = compared.length;

  if (count < 2) return null;

  return (
    <div className={styles.compareBar}>
      <span className={styles.count}>{count} planos selecionados</span>
      <button type="button" className={styles.compareBtn} onClick={openCompareModal}>
        Comparar planos selecionados
      </button>
      <button type="button" className={styles.clearBtn} onClick={clearCompare}>
        Limpar
      </button>
    </div>
  );
}
