import { getProvider } from '@/lib/api/provider';
import type { VideoItem } from '@/lib/types/videos';

export async function getHomeVideos(): Promise<VideoItem[]> {
  return getProvider().videos.getHomeVideos();
}
