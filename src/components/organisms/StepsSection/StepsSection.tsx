import StepItem from '@/components/molecules/StepItem';
import styles from './StepsSection.module.css';

const STEPS = [
  {
    icon: (
      <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9"/>
        <path d="M3 12h18"/>
        <path d="M12 3a14.5 14.5 0 0 1 4 9 14.5 14.5 0 0 1-4 9 14.5 14.5 0 0 1-4-9 14.5 14.5 0 0 1 4-9z"/>
        <path d="M16 7l3-1-1 3"/>
      </svg>
    ),
    description: 'Informe os dados da viagem para ver uma cotação.',
  },
  {
    icon: (
      <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3v18"/><path d="M5 21h14"/>
        <path d="M6 11l-3 4h8l-2-4z"/>
        <path d="M18 11l-3 4h8l-2-4z"/>
        <circle cx="6" cy="6" r="1.5"/>
        <circle cx="18" cy="8" r="1.5"/>
        <path d="M7 6h5M12 8h6"/>
      </svg>
    ),
    description: 'Compare planos, seguradoras, coberturas e preços.',
  },
  {
    icon: (
      <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="7" width="18" height="11" rx="2"/>
        <circle cx="12" cy="12.5" r="2.5"/>
        <path d="M7 11.5h.5M16.5 11.5h.5"/>
        <path d="M20 7V5"/>
      </svg>
    ),
    description: <>Escolha um plano e compre online pagando em até <b>10x sem juros</b>*.</>,
  },
  {
    icon: (
      <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="6" width="13" height="15" rx="1.5"/>
        <rect x="7" y="3" width="13" height="15" rx="1.5"/>
        <path d="M11 8h5M11 11h5M11 14h3"/>
      </svg>
    ),
    description: 'Receba a apólice digital por e-mail!',
  },
];

export default function StepsSection() {
  return (
    <section className={styles.steps}>
      <div className="container">
        <div className={styles.stepsHead}>
          <h2>Conheça os passos para emitir com a Sabemi Seguros!</h2>
          <p>É simples, fácil e prático!</p>
        </div>
        <div className={styles.stepsGrid}>
          {STEPS.map((step, i) => (
            <StepItem key={i} icon={step.icon} description={step.description} />
          ))}
        </div>
      </div>
    </section>
  );
}
