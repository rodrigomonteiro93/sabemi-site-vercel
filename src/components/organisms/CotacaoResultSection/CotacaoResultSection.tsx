'use client';
import { useCotacaoStore } from '@/lib/stores/cotacaoStore';
import ResultMeta from '@/components/molecules/ResultMeta/ResultMeta';
import PlanCard from '@/components/organisms/PlanCard/PlanCard';
import styles from './CotacaoResultSection.module.css';

const PASSAGEIROS = 1;
const DIAS = 5;

export default function CotacaoResultSection() {
  const {
    plans, destino, ida, retorno, sortBy, setSortBy,
    compared, markupHidden,
    toggleCompare, openEmailModal, openCovModal,
  } = useCotacaoStore();

  return (
    <section>
      <ResultMeta
        destination={destino}
        dateFrom={ida}
        dateTo={retorno}
        days={DIAS}
        pax={PASSAGEIROS}
        sortBy={sortBy}
        onSortChange={setSortBy}
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
