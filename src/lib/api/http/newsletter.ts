import { apiFetch } from '@/lib/api/client';
import type { NewsletterRepository } from '@/lib/api/repositories';
import type {
  NewsletterSubscribeRequest,
  NewsletterSubscribeResponse,
} from '@/lib/types/newsletter';

export const httpNewsletterRepository: NewsletterRepository = {
  subscribe(data: NewsletterSubscribeRequest): Promise<NewsletterSubscribeResponse> {
    return apiFetch<NewsletterSubscribeResponse>('/newsletter/subscribe', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};
