import type { ApiProvider } from '@/lib/api/repositories';
import { httpVideosRepository } from '@/lib/api/http/videos';
import { httpNewsRepository } from '@/lib/api/http/news';
import { httpPartnersRepository } from '@/lib/api/http/partners';
import { httpAuthRepository } from '@/lib/api/http/auth';

export const httpProvider: ApiProvider = {
  videos: httpVideosRepository,
  news: httpNewsRepository,
  partners: httpPartnersRepository,
  auth: httpAuthRepository,
};
