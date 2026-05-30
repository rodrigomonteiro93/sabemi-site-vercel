import type { VideoItem } from '@/lib/types/videos';
import type { LoginRequest, LoginResponse } from '@/lib/types/auth';
import type { NewsItem } from '@/lib/types/news';
import type { PartnerData } from '@/lib/types/partners';

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

export interface ApiProvider {
  videos: VideosRepository;
  news: NewsRepository;
  partners: PartnersRepository;
  auth: AuthRepository;
}
