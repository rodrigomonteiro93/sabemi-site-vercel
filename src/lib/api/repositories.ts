import type { CotacaoPlan, CotacaoParams } from '@/lib/types/cotacao';
import type { VideoItem } from '@/lib/types/videos';
import type { LoginRequest, LoginResponse } from '@/lib/types/auth';
import type { NewsItem } from '@/lib/types/news';
import type { PartnerData } from '@/lib/types/partners';
import type { ComissaoItem } from '@/lib/types/comissoes';
import type { FinanceiroItem } from '@/lib/types/financeiro';
import type { VoucherPageItem } from '@/lib/types/vouchers';
import type { EmissorItem } from '@/lib/types/emissores';
import type { DashboardData } from '@/lib/types/dashboard';
import type { PagesMetadata } from '@/lib/types/pages-metadata';
import type {
  NewsletterSubscribeRequest,
  NewsletterSubscribeResponse,
} from '@/lib/types/newsletter';
import type { CadastroRequest, CadastroResponse } from '@/lib/types/cadastro';

export interface VideosRepository {
  getHomeVideos(): Promise<VideoItem[]>;
}

export interface NewsRepository {
  getHomeNews(): Promise<NewsItem[]>;
}

export interface PartnersRepository {
  getHomePartners(): Promise<PartnerData[]>;
}

export interface AuthRepository {
  login(data: LoginRequest): Promise<LoginResponse>;
}

export interface DashboardRepository {
  getDashboard(): Promise<DashboardData>;
}

export interface ComissoesRepository {
  getComissoes(): Promise<ComissaoItem[]>;
}

export interface FinanceiroRepository {
  getFinanceiro(): Promise<FinanceiroItem[]>;
}

export interface VouchersRepository {
  getVouchers(): Promise<VoucherPageItem[]>;
}

export interface EmissoresRepository {
  getEmissores(): Promise<EmissorItem[]>;
}

export interface PlansRepository {
  getPlanos(params: CotacaoParams): Promise<CotacaoPlan[]>;
}

export interface PagesMetadataRepository {
  getPagesMetadata(): Promise<PagesMetadata>;
}

export interface NewsletterRepository {
  subscribe(data: NewsletterSubscribeRequest): Promise<NewsletterSubscribeResponse>;
}

export interface CadastroRepository {
  register(data: CadastroRequest): Promise<CadastroResponse>;
}

export interface ApiProvider {
  plans: PlansRepository;
  videos: VideosRepository;
  news: NewsRepository;
  partners: PartnersRepository;
  auth: AuthRepository;
  dashboard: DashboardRepository;
  comissoes: ComissoesRepository;
  financeiro: FinanceiroRepository;
  vouchers: VouchersRepository;
  emissores: EmissoresRepository;
  pagesMetadata: PagesMetadataRepository;
  newsletter: NewsletterRepository;
  cadastro: CadastroRepository;
}
