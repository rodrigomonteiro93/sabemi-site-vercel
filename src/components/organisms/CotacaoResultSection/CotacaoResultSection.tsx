'use client';
import { useRouter } from 'next/navigation';
import { buildCotacaoQueryString } from '@/lib/cotacao/urlParams';
import { useCotacaoStore } from '@/lib/stores/cotacaoStore';
import ResultMeta from '@/components/molecules/ResultMeta/ResultMeta';
import PlanCard from '@/components/organisms/PlanCard/PlanCard';
import styles from './CotacaoResultSection.module.css';

const PASSAGEIROS = 1;
const DIAS = 5;

export default function CotacaoResultSection() {
  const router = useRouter();
  const {
    plans, destino, ida, retorno, tipo, coberturas, ages,
    sortBy, compared, markupHidden,
    toggleCompare, openEmailModal, openCovModal,
  } = useCotacaoStore();

  function handleSortChange(value: string) {
    const query = buildCotacaoQueryString({
      destino, ida, retorno, tipo, ages, coberturas, ordenar: value,
    });
    router.push(`/cotacao?${query}`);
  }

  return (
    <section>
      <ResultMeta
        destination={destino}
        dateFrom={ida}
        dateTo={retorno}
        days={DIAS}
        pax={PASSAGEIROS}
        sortBy={sortBy}
        onSortChange={handleSortChange}
      />
      <div className={styles.planList}>
        {plans.map((plan, i) => (
          <PlanCard
            key={i}
            plan={plan}
            index={i}
            passageiros={PASSAGEIROS}
            dias={DIAS}
            isCompared={compared.includes(i)}
            markupHidden={markupHidden}
            onToggleCompare={toggleCompare}
            onOpenEmail={openEmailModal}
            onOpenCobertura={openCovModal}
          />
        ))}
      </div>
    </section>
  );
}
