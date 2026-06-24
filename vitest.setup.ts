import '@testing-library/jest-dom/vitest';
import { beforeEach } from 'vitest';
import { useCotacaoStore } from '@/lib/stores/cotacaoStore';

beforeEach(() => {
  localStorage.clear();
  useCotacaoStore.persist.clearStorage();
});
