'use client';

import { usePathname } from 'next/navigation';
import NavLinks from '@/components/molecules/NavLinks';
import LoginLink from '@/components/molecules/LoginLink';
import HeaderCartLink from '@/components/molecules/HeaderCartLink';
import { HEADER_NAV, ROUTES } from '@/lib/navigation/siteRoutes';
import styles from './SiteHeader.module.css';

export default function SiteHeader() {
  const pathname = usePathname();

  const navItems = HEADER_NAV.map((item) => ({
    ...item,
    active: item.href === ROUTES.home ? pathname === ROUTES.home : pathname.startsWith(item.href),
  }));

  return (
    <header className={styles.site}>
      <div className={`container ${styles.navRow}`}>
        <a href={ROUTES.home} className={styles.logo} aria-label="Sabemi">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/sabemi-seguradora-logo.png" alt="Sabemi Seguradora" />
        </a>
        <nav>
          <NavLinks items={navItems} />
        </nav>
        <div className={styles.navRight}>
          <LoginLink />
          <HeaderCartLink />
        </div>
      </div>
    </header>
  );
}
