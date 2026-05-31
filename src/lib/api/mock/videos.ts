import { HOME_VIDEOS_MOCK } from '@/lib/mocks/videos';
import type { VideosRepository } from '@/lib/api/repositories';

export const mockVideosRepository: VideosRepository = {
  async getHomeVideos() {
    return [...HOME_VIDEOS_MOCK];
  },
};
