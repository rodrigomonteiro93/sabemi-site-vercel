import type { NewsletterSubscribeRequest } from '@/lib/types/newsletter';

export async function subscribeNewsletter(data: NewsletterSubscribeRequest): Promise<void> {
  const response = await fetch('/api/newsletter/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.error ?? 'Falha ao inscrever na newsletter');
  }
}
