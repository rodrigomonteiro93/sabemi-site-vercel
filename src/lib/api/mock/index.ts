import type { ApiProvider } from '@/lib/api/repositories';
import { mockVideosRepository } from '@/lib/api/mock/videos';
import { mockNewsRepository } from '@/lib/api/mock/news';
import { mockPartnersRepository } from '@/lib/api/mock/partners';
import { mockAuthRepository } from '@/lib/api/mock/auth';

export const mockProvider: ApiProvider = {
  videos: mockVideosRepository,
  news: mockNewsRepository,
  partners: mockPartnersRepository,
  auth: mockAuthRepository,
};
