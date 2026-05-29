import React from 'react';
import Button from '@/components/atoms/Button/Button';
import styles from './PageTitleBar.module.css';

export interface PageTitleBarAction {
  label: string;
  icon?: React.ReactNode;
  variant: 'outline' | 'primary';
  onClick: () => void;
}

interface PageTitleBarProps {
  title: string;
  subtitle?: string;
  actions?: PageTitleBarAction[];
}

export default function PageTitleBar({ title, subtitle, actions }: PageTitleBarProps) {
  return (
    <div className={styles.titleBar}>
      <h1 className={styles.title}>
        {title}
        {subtitle && <small className={styles.subtitle}>{subtitle}</small>}
      </h1>
      {actions && actions.length > 0 && (
        <div className={styles.actions}>
          {actions.map((action, i) => (
            <Button key={i} variant={action.variant} onClick={action.onClick}>
              {action.icon}
              {action.label}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
