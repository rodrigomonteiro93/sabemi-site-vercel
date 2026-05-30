import type { ApiProvider } from '@/lib/api/repositories';
import { httpProvider } from '@/lib/api/http';
import { mockProvider } from '@/lib/api/mock';

export type ApiMode = 'mock' | 'http';

export function getApiMode(): ApiMode {
  return process.env.API_MODE === 'http' ? 'http' : 'mock';
}

export function getProvider(): ApiProvider {
  return getApiMode() === 'http' ? httpProvider : mockProvider;
}
