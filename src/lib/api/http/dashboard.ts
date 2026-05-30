import type { DashboardRepository } from '@/lib/api/repositories';

export const httpDashboardRepository: DashboardRepository = {
  async getDashboard() {
    throw new Error('getDashboard: not implemented');
  },
};
