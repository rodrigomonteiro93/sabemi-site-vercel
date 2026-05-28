import styles from './FooterNewsletter.module.css';

export default function FooterNewsletter() {
  return (
    <div className={styles.footNewsletter}>
      <h4>Receba novidades em seu e-mail</h4>
      <div className={styles.row}>
        <input type="text" placeholder="Escreva seu nome *" />
      </div>
      <div className={[styles.row, styles.rowEmail].join(' ')}>
        <input type="email" placeholder="email@sabemi.com.br" />
      </div>
      <p className={styles.consent}>
        Ao informar seu e-mail, você concorda em receber comunicações da Sabemi e está de acordo com nossa Política de Privacidade.
      </p>
    </div>
  );
}
