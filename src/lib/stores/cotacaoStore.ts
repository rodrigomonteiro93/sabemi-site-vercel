import { create } from 'zustand';
import { CotacaoPlan, PLANS } from '@/lib/types/cotacao';

interface CotacaoStore {
  destino: string;
  ida: string;
  retorno: string;
  tipo: string;
  coberturas: string;
  markup: number;
  markupHidden: boolean;
  ages: number[];
  sortBy: string;
  plans: CotacaoPlan[];
  covModalOpen: boolean;
  covModalPlanIdx: number | null;
  emailModalOpen: boolean;
  emailModalPlanIdx: number | null;
  compareModalOpen: boolean;
  compared: number[];
  setDestino: (v: string) => void;
  setIda: (v: string) => void;
  setRetorno: (v: string) => void;
  setTipo: (v: string) => void;
  setCoberturas: (v: string) => void;
  setMarkup: (v: number) => void;
  toggleMarkupHidden: () => void;
  setSortBy: (v: string) => void;
  addAge: () => void;
  removeAge: (i: number) => void;
  setAge: (i: number, value: number) => void;
  openCovModal: (idx: number) => void;
  closeCovModal: () => void;
  openEmailModal: (idx: number) => void;
  closeEmailModal: () => void;
  toggleCompare: (idx: number) => void;
  clearCompare: () => void;
  openCompareModal: () => void;
  closeCompareModal: () => void;
}

const MAX_COMPARE = 3;
const MAX_PAX = 10;

export const useCotacaoStore = create<CotacaoStore>((set) => ({
  destino: 'Brasil',
  ida: '06/07/2026',
  retorno: '10/07/2026',
  tipo: 'Lazer / Turismo / Negócios',
  coberturas: '',
  markup: 30,
  markupHidden: false,
  ages: [33],
  sortBy: 'Menor preço',
  plans: PLANS,
  covModalOpen: false,
  covModalPlanIdx: null,
  emailModalOpen: false,
  emailModalPlanIdx: null,
  compareModalOpen: false,
  compared: [],

  setDestino: (v) => set({ destino: v }),
  setIda: (v) => set({ ida: v }),
  setRetorno: (v) => set({ retorno: v }),
  setTipo: (v) => set({ tipo: v }),
  setCoberturas: (v) => set({ coberturas: v }),
  setMarkup: (v) => set({ markup: v }),
  toggleMarkupHidden: () => set((s) => ({ markupHidden: !s.markupHidden })),
  setSortBy: (v) => set({ sortBy: v }),

  addAge: () => set((s) => {
    if (s.ages.length >= MAX_PAX) return s;
    return { ages: [...s.ages, 30] };
  }),
  removeAge: (i) => set((s) => {
    if (s.ages.length <= 1) return s;
    return { ages: s.ages.filter((_, idx) => idx !== i) };
  }),
  setAge: (i, value) => set((s) => {
    const ages = [...s.ages];
    ages[i] = value;
    return { ages };
  }),

  openCovModal: (idx) => set({ covModalOpen: true, covModalPlanIdx: idx }),
  closeCovModal: () => set({ covModalOpen: false, covModalPlanIdx: null }),
  openEmailModal: (idx) => set({ emailModalOpen: true, emailModalPlanIdx: idx }),
  closeEmailModal: () => set({ emailModalOpen: false, emailModalPlanIdx: null }),

  toggleCompare: (idx) => set((s) => {
    const has = s.compared.includes(idx);
    if (!has && s.compared.length >= MAX_COMPARE) return s;
    return {
      compared: has ? s.compared.filter((i) => i !== idx) : [...s.compared, idx],
    };
  }),
  clearCompare: () => set({ compared: [] }),
  openCompareModal: () => set({ compareModalOpen: true }),
  closeCompareModal: () => set({ compareModalOpen: false }),
}));
