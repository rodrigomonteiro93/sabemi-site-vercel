import FooterNewsletter from '@/components/molecules/FooterNewsletter';
import { EXTERNAL, ROUTES } from '@/lib/navigation/siteRoutes';
import styles from './SiteFooter.module.css';

export default function SiteFooter() {
  return (
    <footer className={styles.site}>
      <div className="container">
        <div className={styles.footGrid}>

          {/* Brand */}
          <div className={styles.footBrand}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/sabemi-seguradora-logo.png" alt="Sabemi" />
            <div className={styles.legal}>
              <b>SABEMI SEGURADORA S.A.</b>
            </div>
            <p>A Sabemi Seguros é uma empresa que traz para você a melhor consultoria para escolha do seu Seguro Viagem.</p>
            <div className={styles.addr}>R. Sete de Setembro, 515 — Centro Histórico, Porto Alegre — RS, 90010-190</div>
            <p style={{ marginTop: '6px' }}>
              <a href="mailto:contato@sabemi.com.br" className={styles.emailLink}>contato@sabemi.com.br</a>
            </p>
            <a href={EXTERNAL.googleMaps} className={styles.maps} target="_blank" rel="noopener noreferrer">
              ABRIR ENDEREÇO NO GOOGLE MAPS
            </a>
            <div className={styles.footSocial}>
              <a href={EXTERNAL.youtube} aria-label="YouTube" target="_blank" rel="noopener noreferrer">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z"/>
                </svg>
              </a>
              <a href={EXTERNAL.facebook} aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.7 0H1.3C.6 0 0 .6 0 1.3v21.3c0 .8.6 1.4 1.3 1.4h11.5v-9.3H9.7v-3.6h3.1V8.4c0-3.1 1.9-4.8 4.7-4.8 1.3 0 2.5.1 2.8.1v3.3h-1.9c-1.5 0-1.8.7-1.8 1.8v2.3h3.6l-.5 3.6h-3.1V24h6.1c.8 0 1.4-.6 1.4-1.3V1.3C24 .6 23.4 0 22.7 0z"/>
                </svg>
              </a>
              <a href={EXTERNAL.instagram} aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2 0 1.8.2 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c0 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2 0-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c0-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2M12 0C8.7 0 8.3 0 7.1.1c-1.3.1-2.2.3-3 .6-.8.3-1.5.7-2.2 1.4C1.2 2.8.8 3.5.5 4.3c-.3.8-.5 1.7-.6 3C-.1 8.5 0 8.9 0 12s0 3.5.1 4.7c.1 1.3.3 2.2.6 3 .3.8.7 1.5 1.4 2.2.7.7 1.4 1.1 2.2 1.4.8.3 1.7.5 3 .6 1.2.1 1.6.1 4.7.1s3.5 0 4.7-.1c1.3-.1 2.2-.3 3-.6.8-.3 1.5-.7 2.2-1.4.7-.7 1.1-1.4 1.4-2.2.3-.8.5-1.7.6-3 .1-1.2.1-1.6.1-4.7s0-3.5-.1-4.7c-.1-1.3-.3-2.2-.6-3-.3-.8-.7-1.5-1.4-2.2C21.2 1.2 20.5.8 19.7.5c-.8-.3-1.7-.5-3-.6C15.5 0 15.1 0 12 0zm0 5.8c-3.4 0-6.2 2.8-6.2 6.2s2.8 6.2 6.2 6.2 6.2-2.8 6.2-6.2-2.8-6.2-6.2-6.2zm0 10.2c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4zm6.4-11.8c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5 1.5-.7 1.5-1.5-.6-1.5-1.5-1.5z"/>
                </svg>
              </a>
              <a href={EXTERNAL.linkedin} aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.4 20.4h-3.6V14.8c0-1.3 0-3.1-1.9-3.1-1.9 0-2.2 1.5-2.2 3v5.7H9.2V9h3.4v1.6h.1c.5-.9 1.6-1.9 3.4-1.9 3.6 0 4.3 2.4 4.3 5.5v6.2zM5.2 7.4c-1.1 0-2.1-.9-2.1-2.1S4 3.2 5.2 3.2c1.1 0 2.1.9 2.1 2.1S6.3 7.4 5.2 7.4zM6.9 20.4H3.4V9h3.5v11.4zM22.2 0H1.8C.8 0 .8.8 0 1.7v20.5c0 1 .8 1.7 1.8 1.7h20.4c1 0 1.8-.8 1.8-1.7V1.7C24 .8 23.2 0 22.2 0z"/>
                </svg>
              </a>
              <a href={EXTERNAL.whatsApp} aria-label="WhatsApp" target="_blank" rel="noopener noreferrer">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-1.7-.9-2.9-1.6-4-3.5-.3-.5.3-.5.8-1.5.1-.2.1-.4 0-.5-.1-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5 1.9.8 2.6.9 3.6.7.6-.1 1.7-.7 1.9-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.4zM12 2.2C6.6 2.2 2.2 6.6 2.2 12c0 1.7.4 3.4 1.3 4.9L2.2 21.8l4.9-1.3c1.5.9 3.2 1.3 4.9 1.3 5.4 0 9.8-4.4 9.8-9.8s-4.4-9.8-9.8-9.8z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Parceiros */}
          <div className={styles.footCol}>
            <h4>Parceiros</h4>
            <ul>
              <li><a href={EXTERNAL.euViajoSeguro} target="_blank" rel="noopener noreferrer">EU VIAJO SEGURO</a></li>
              <li><a href={EXTERNAL.intermac} target="_blank" rel="noopener noreferrer">INTERMAC</a></li>
              <li><a href={ROUTES.cadastro}>SEJA NOSSO PARCEIRO</a></li>
            </ul>
          </div>

          {/* Links Úteis */}
          <div className={styles.footCol}>
            <h4>Links Úteis</h4>
            <ul>
              <li><a href={ROUTES.alterarCancelar}>Alterar / Cancelar o Seguro</a></li>
              <li><a href={ROUTES.dicasSeguro}>Dicas de como utilizar o seguro</a></li>
              <li><a href={ROUTES.coberturas}>Entenda as coberturas</a></li>
              <li><a href={ROUTES.seguroViagem}>O que é Seguro Viagem — Diferenças de Assistência e Seguro</a></li>
              <li><a href={ROUTES.faq}>Perguntas e Respostas</a></li>
              <li><a href={ROUTES.paisesCobertura}>Países que Exigem Cobertura de Seguro de Viagem</a></li>
              <li><a href={ROUTES.politicaCookies}>Política de Cookies</a></li>
              <li><a href={ROUTES.politicaPrivacidade}>Política de Privacidade</a></li>
              <li><a href={ROUTES.cadastro}>Seja nosso parceiro</a></li>
              <li><a href={ROUTES.termosDeUso}>Termos de Uso</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <FooterNewsletter />

        </div>

        <div className={styles.footBottom}>
          <span>© 2026 Sabemi Seguradora S.A. — Todos os direitos reservados.</span>
          <span>CNPJ: 87.163.234/0001-38 · SUSEP</span>
        </div>
      </div>
    </footer>
  );
}
