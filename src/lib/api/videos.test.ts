import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { HOME_VIDEOS_MOCK } from '@/lib/mocks/videos';

describe('getHomeVideos', () => {
  const originalApiMode = process.env.API_MODE;

  beforeEach(() => {
    vi.resetModules();
  });

  afterEach(() => {
    if (originalApiMode === undefined) {
      delete process.env.API_MODE;
    } else {
      process.env.API_MODE = originalApiMode;
    }
  });

  it('retorna mock quando API_MODE não é http', async () => {
    process.env.API_MODE = 'mock';
    const { getHomeVideos } = await import('@/lib/api/videos');
    const videos = await getHomeVideos();
    expect(videos).toEqual(HOME_VIDEOS_MOCK);
  });

  it('usa provider mock por padrão sem API_MODE', async () => {
    delete process.env.API_MODE;
    const { getHomeVideos } = await import('@/lib/api/videos');
    const videos = await getHomeVideos();
    expect(videos).toHaveLength(7);
    expect(videos[0].id).toBe('morte-acidental');
  });
});
