import { apiFetch } from '@/lib/api/client';
import type { VideoItem } from '@/lib/types/videos';
import type { VideosRepository } from '@/lib/api/repositories';

export const httpVideosRepository: VideosRepository = {
  async getHomeVideos() {
    return apiFetch<VideoItem[]>('/videos/home');
  },
};
