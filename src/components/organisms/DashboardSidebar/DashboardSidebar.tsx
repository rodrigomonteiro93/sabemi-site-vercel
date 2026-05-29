'use client';

import { useState } from 'react';
import Button from '@/components/atoms/Button';
import type { SideNavItem } from '@/lib/types/dashboard';
import styles from './DashboardSidebar.module.css';

interface DashboardSidebarProps {
  agencyName: string;
  navItems: SideNavItem[];
  cotarHref: string;
  copyLinkValue: string;
  copyRegisterLinkValue: string;
}

const ChevronRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 6 15 12 9 18" />
  </svg>
);

const LogoutIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
    <polyline points="16 17 21 12 16 7"/>
    <line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
);

export default function DashboardSidebar({
  agencyName,
  navItems,
  cotarHref,
  copyLinkValue,
  copyRegisterLinkValue,
}: DashboardSidebarProps) {
  const [copied, setCopied] = useState<'link' | 'register' | null>(null);

  async function handleCopy(type: 'link' | 'register') {
    const value = type === 'link' ? copyLinkValue : copyRegisterLinkValue;
    await navigator.clipboard.writeText(value);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  }

  return (
    <aside className={styles.side}>
      <div className={styles.sideHead}>
        <div className={styles.label}>Minha Conta</div>
        <div className={styles.hello}>
          Olá, <b>{agencyName}</b>
        </div>
        <Button variant="primary" href={cotarHref} className={styles.btnCotar}>
          Cotar / Emitir
        </Button>
        <button
          type="button"
          className={styles.btnSideOutline}
          onClick={() => handleCopy('link')}
        >
          {copied === 'link' ? 'Link copiado!' : 'Copiar meu link'}
        </button>
        <button
          type="button"
          className={styles.btnSideOutline}
          onClick={() => handleCopy('register')}
        >
          {copied === 'register' ? 'Link copiado!' : 'Copiar meu link de cadastro'}
        </button>
      </div>

      <ul className={styles.sideNav}>
        {navItems.map((item) => {
          const linkClass = [
            styles.navLink,
            item.active ? styles.navLinkActive : '',
            item.isSair ? styles.navLinkSair : '',
          ].filter(Boolean).join(' ');

          return (
            <li key={item.href}>
              <a href={item.href} className={linkClass}>
                {item.label}
                <span className={styles.chev}>
                  {item.isSair ? <LogoutIcon /> : <ChevronRight />}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
