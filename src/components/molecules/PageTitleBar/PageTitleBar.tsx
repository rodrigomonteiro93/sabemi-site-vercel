import React from 'react';
import styles from './PageTitleBar.module.css';

export interface PageTitleBarAction {
  label: string;
  icon?: React.ReactNode;
  variant: 'outline' | 'primary' | 'danger';
  onClick: () => void;
  disabled?: boolean;
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
          {actions.map((action, i) => {
            const actionClass = [
              styles.action,
              action.variant === 'primary' && styles.actionPrimary,
              action.variant === 'danger' && styles.actionDanger,
            ]
              .filter(Boolean)
              .join(' ');

            return (
              <button
                key={i}
                type="button"
                className={actionClass}
                onClick={action.onClick}
                disabled={action.disabled}
              >
                {action.icon}
                {action.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
