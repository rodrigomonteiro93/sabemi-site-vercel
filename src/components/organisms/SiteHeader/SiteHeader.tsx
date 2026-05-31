import NavLinks from '@/components/molecules/NavLinks';
import LoginLink from '@/components/molecules/LoginLink';
import IconButton from '@/components/atoms/IconButton';
import styles from './SiteHeader.module.css';

const NAV_ITEMS = [
  { label: 'Home', href: '#', active: true },
  { label: 'Quem Somos', href: '#' },
  { label: 'Como Funciona', href: '#' },
  { label: 'Blog', href: '#' },
  { label: 'Seja nosso Parceiro', href: '#' },
];

export default function SiteHeader() {
  return (
    <header className={styles.site}>
      <div className={`container ${styles.navRow}`}>
        <a href="/" className={styles.logo} aria-label="Sabemi">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/sabemi-seguradora-logo.png" alt="Sabemi Seguradora" />
        </a>
        <nav>
          <NavLinks items={NAV_ITEMS} />
        </nav>
        <div className={styles.navRight}>
          <LoginLink />
          <IconButton ariaLabel="Carrinho" hasDot>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/>
            </svg>
          </IconButton>
        </div>
      </div>
    </header>
  );
}
