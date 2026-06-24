import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { sortPlans } from '@/lib/cotacao/sortPlans';
import { getDestinoLabel, getTipoLabel } from '@/lib/data/destinos';
import { PLANS_MOCK } from '@/lib/mocks/plans';
import type { CupomMock } from '@/lib/mocks/cupons';
import type { CotacaoPlan, CotacaoParams } from '@/lib/types/cotacao';
import type { PaxFormData } from '@/lib/types/carrinho';

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
  setPlans: (plans: CotacaoPlan[]) => void;
  initFromParams: (params: CotacaoParams, plans: CotacaoPlan[]) => void;
  selectedPlan: CotacaoPlan | null;
  selectPlan: (plan: CotacaoPlan) => void;
  clearSelectedPlan: () => void;
  paxData: Partial<PaxFormData>[];
  setPaxData: (index: number, data: Partial<PaxFormData>) => void;
  removePaxData: (index: number) => void;
  syncPaxDataLength: (count: number) => void;
  appliedCupom: CupomMock | null;
  setAppliedCupom: (cupom: CupomMock | null) => void;
}

const MAX_COMPARE = 3;
const MAX_PAX = 10;

export const useCotacaoStore = create<CotacaoStore>()(
  persist(
    (set) => ({
      destino: 'Brasil',
      ida: '06/07/2026',
      retorno: '10/07/2026',
      tipo: 'Lazer / Turismo / Negócios',
      coberturas: '',
      markup: 30,
      markupHidden: false,
      ages: [33],
      sortBy: 'Menor preço',
      plans: PLANS_MOCK,
      covModalOpen: false,
      covModalPlanIdx: null,
      emailModalOpen: false,
      emailModalPlanIdx: null,
      compareModalOpen: false,
      compared: [],
      selectedPlan: null,
      paxData: [],
      appliedCupom: null,

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

      setPlans: (plans) => set({ plans }),
      selectPlan: (plan) => set({ selectedPlan: plan, paxData: [], appliedCupom: null }),
      clearSelectedPlan: () => set({ selectedPlan: null, paxData: [], appliedCupom: null }),
      setAppliedCupom: (cupom) => set({ appliedCupom: cupom }),

      setPaxData: (index, data) => set((s) => {
        const paxData = [...s.paxData];
        while (paxData.length <= index) paxData.push({});
        paxData[index] = { ...paxData[index], ...data };
        return { paxData };
      }),
      removePaxData: (index) => set((s) => ({
        paxData: s.paxData.filter((_, i) => i !== index),
      })),
      syncPaxDataLength: (count) => set((s) => {
        if (s.paxData.length === count) return s;
        const paxData = s.paxData.slice(0, count);
        while (paxData.length < count) paxData.push({});
        return { paxData };
      }),

      initFromParams: (params, plans) => set({
        destino:  getDestinoLabel(params.destino),
        ida:      params.ida.split('-').join('/'),
        retorno:  params.retorno.split('-').join('/'),
        tipo:     getTipoLabel(params.tipo),
        ages:     params.ages,
        coberturas: params.coberturas,
        sortBy:   params.ordenar,
        plans:    sortPlans(plans, params.ordenar),
        compared: [],
      }),
    }),
    {
      name: 'sabemi-cotacao-cart',
      partialize: (state) => ({
        selectedPlan: state.selectedPlan,
        destino: state.destino,
        ida: state.ida,
        retorno: state.retorno,
        tipo: state.tipo,
        ages: state.ages,
        paxData: state.paxData,
        appliedCupom: state.appliedCupom,
      }),
    },
  ),
);
