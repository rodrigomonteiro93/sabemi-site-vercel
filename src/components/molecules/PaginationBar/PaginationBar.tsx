'use client';

import styles from './PaginationBar.module.css';

interface PaginationBarProps {
  pageFrom: number;
  pageTo: number;
  total: number;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function buildPages(current: number, total: number): (number | '...')[] {
  const pages: (number | '...')[] = [];
  for (let p = 1; p <= total; p++) {
    if (p === 1 || p === total || (p >= current - 2 && p <= current + 2)) {
      pages.push(p);
    } else if (pages[pages.length - 1] !== '...') {
      pages.push('...');
    }
  }
  return pages;
}

export default function PaginationBar({
  pageFrom, pageTo, total, currentPage, totalPages, onPageChange,
}: PaginationBarProps) {
  const pages = buildPages(currentPage, totalPages);

  return (
    <div className={styles.pagination}>
      <div className={styles.meta}>
        Mostrando <b>{pageFrom}</b>–<b>{pageTo}</b> de <b>{total}</b>
      </div>
      <div className={styles.pagi}>
        <button
          className={styles.pageBtn}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          ‹
        </button>
        {pages.map((p, i) =>
          p === '...' ? (
            <span key={`e-${i}`} className={styles.ellipsis}>…</span>
          ) : (
            <button
              key={p}
              className={`${styles.pageBtn} ${p === currentPage ? styles.active : ''}`}
              onClick={() => onPageChange(p)}
            >
              {p}
            </button>
          )
        )}
        <button
          className={styles.pageBtn}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          ›
        </button>
      </div>
    </div>
  );
}
