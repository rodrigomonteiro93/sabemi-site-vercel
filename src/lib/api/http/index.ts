import type { ApiProvider } from '@/lib/api/repositories';
import { httpVideosRepository } from '@/lib/api/http/videos';
import { httpNewsRepository } from '@/lib/api/http/news';
import { httpPartnersRepository } from '@/lib/api/http/partners';
import { httpAuthRepository } from '@/lib/api/http/auth';
import { httpDashboardRepository } from '@/lib/api/http/dashboard';
import { httpComissoesRepository } from '@/lib/api/http/comissoes';
import { httpFinanceiroRepository } from '@/lib/api/http/financeiro';
import { httpVouchersRepository } from '@/lib/api/http/vouchers';
import { httpEmissoresRepository } from '@/lib/api/http/emissores';
import { httpPlansRepository } from '@/lib/api/http/plans';
import { httpPagesMetadataRepository } from '@/lib/api/http/pages-metadata';
import { httpNewsletterRepository } from '@/lib/api/http/newsletter';
import { httpCadastroRepository } from '@/lib/api/http/cadastro';

export const httpProvider: ApiProvider = {
  plans: httpPlansRepository,
  videos: httpVideosRepository,
  news: httpNewsRepository,
  partners: httpPartnersRepository,
  auth: httpAuthRepository,
  dashboard: httpDashboardRepository,
  comissoes: httpComissoesRepository,
  financeiro: httpFinanceiroRepository,
  vouchers: httpVouchersRepository,
  emissores: httpEmissoresRepository,
  pagesMetadata: httpPagesMetadataRepository,
  newsletter: httpNewsletterRepository,
  cadastro: httpCadastroRepository,
};
