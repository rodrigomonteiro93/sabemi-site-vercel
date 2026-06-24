'use client';

import MarkupBlock from '@/components/molecules/MarkupBlock/MarkupBlock';
import { useCotacaoStore } from '@/lib/stores/cotacaoStore';
import styles from './page-content.module.css';

interface MarkupSettingsSectionProps {
  cotacaoHref: string;
}

export default function MarkupSettingsSection({ cotacaoHref }: MarkupSettingsSectionProps) {
  const { markup, setMarkup, markupHidden, toggleMarkupHidden } = useCotacaoStore();

  return (
    <div className={styles.wrap}>
      <MarkupBlock
        value={markup}
        hidden={markupHidden}
        onChange={setMarkup}
        onToggleHidden={toggleMarkupHidden}
      />
      <p className={styles.hint}>
        O markup configurado aqui é aplicado nas próximas cotações. Para testar, acesse{' '}
        <a href={cotacaoHref}>Cotar / Emitir</a>.
      </p>
    </div>
  );
}
