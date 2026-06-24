import type { NewsletterRepository } from '@/lib/api/repositories';
import type {
  NewsletterSubscribeRequest,
  NewsletterSubscribeResponse,
} from '@/lib/types/newsletter';

export const mockNewsletterRepository: NewsletterRepository = {
  async subscribe({ nome, email }: NewsletterSubscribeRequest): Promise<NewsletterSubscribeResponse> {
    await new Promise((resolve) => setTimeout(resolve, 600));

    if (!nome.trim() || !email.trim()) {
      throw new Error('Nome e e-mail são obrigatórios');
    }

    return { ok: true };
  },
};
