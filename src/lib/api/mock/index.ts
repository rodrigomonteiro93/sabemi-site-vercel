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
import { mockPlansRepository } from '@/lib/api/mock/plans';
import { mockPagesMetadataRepository } from '@/lib/api/mock/pages-metadata';
import { mockNewsletterRepository } from '@/lib/api/mock/newsletter';
import { mockCadastroRepository } from '@/lib/api/mock/cadastro';

export const mockProvider: ApiProvider = {
  plans: mockPlansRepository,
  videos: mockVideosRepository,
  news: mockNewsRepository,
  partners: mockPartnersRepository,
  auth: mockAuthRepository,
  dashboard: mockDashboardRepository,
  comissoes: mockComissoesRepository,
  financeiro: mockFinanceiroRepository,
  vouchers: mockVouchersRepository,
  emissores: mockEmissoresRepository,
  pagesMetadata: mockPagesMetadataRepository,
  newsletter: mockNewsletterRepository,
  cadastro: mockCadastroRepository,
};
