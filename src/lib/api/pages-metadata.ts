import type { Metadata } from 'next';
import { cache } from 'react';
import { getProvider } from '@/lib/api/provider';
import type { PageKey } from '@/lib/types/pages-metadata';

export const getPagesMetadata = cache(async () => {
  return getProvider().pagesMetadata.getPagesMetadata();
});

function interpolate(text: string, vars?: Record<string, string>): string {
  if (!vars) return text;
  return text.replace(/\{(\w+)\}/g, (_, key) => vars[key] ?? `{${key}}`);
}

export async function getPageMetadata(key: PageKey, vars?: Record<string, string>): Promise<Metadata> {
  const all = await getPagesMetadata();
  const entry = all[key];

  if (!entry) {
    throw new Error(`Metadados não encontrados para a página: ${key}`);
  }

  return {
    title: interpolate(entry.title, vars),
    ...(entry.description ? { description: interpolate(entry.description, vars) } : {}),
  };
}
