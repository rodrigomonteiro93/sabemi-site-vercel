import type { ComissaoRow } from '@/lib/types/dashboard';
import styles from './ComissoesPanel.module.css';

interface ComissoesPanelProps {
  rows: ComissaoRow[];
  allHref: string;
}

export default function ComissoesPanel({ rows, allHref }: ComissoesPanelProps) {
  return (
    <div className={styles.panel}>
      <div className={styles.commHead}>
        <h2>Últimas comissões</h2>
        <a href={allHref}>Todas comissões →</a>
      </div>
      <table className={styles.t}>
        <thead>
          <tr>
            <th>Voucher</th>
            <th>%</th>
            <th>Comissão</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.voucher}>
              <td>{row.voucher}</td>
              <td>{row.percent}</td>
              <td className={styles.v}>{row.comissao}</td>
              <td>{row.data}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
