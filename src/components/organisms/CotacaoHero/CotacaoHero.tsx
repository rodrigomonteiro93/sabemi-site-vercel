import styles from './CotacaoHero.module.css';

export default function CotacaoHero() {
  return (
    <section className={styles.pageHero}>
      <div className={`container ${styles.container}`}>
        <div className={styles.duvidaCard}>
          <h2>Ficou com dúvida?</h2>
          <button className={styles.btnPill}>Saiba mais</button>
        </div>
      </div>
    </section>
  );
}
