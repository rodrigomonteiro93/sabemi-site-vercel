import type { ApiProvider } from '@/lib/api/repositories';
import { mockVideosRepository } from '@/lib/api/mock/videos';
import { mockNewsRepository } from '@/lib/api/mock/news';
import { mockPartnersRepository } from '@/lib/api/mock/partners';
import { mockAuthRepository } from '@/lib/api/mock/auth';
import { mockDashboardRepository } from '@/lib/api/mock/dashboard';
import { mockComissoesRepository } from '@/lib/api/mock/comissoes';
import { mockFinanceiroRepository } from '@/lib/api/mock/financeiro';
import { mockVouchersRepository } from '@/lib/api/mock/vouchers';
import { mockEmissoresRepository } from '@/lib/api/mock/emissores';

export const mockProvider: ApiProvider = {
  videos: mockVideosRepository,
  news: mockNewsRepository,
  partners: mockPartnersRepository,
  auth: mockAuthRepository,
  dashboard: mockDashboardRepository,
  comissoes: mockComissoesRepository,
  financeiro: mockFinanceiroRepository,
  vouchers: mockVouchersRepository,
  emissores: mockEmissoresRepository,
};
