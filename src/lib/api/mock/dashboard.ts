import { DASHBOARD_MOCK } from '@/lib/mocks/dashboard';
import type { DashboardRepository } from '@/lib/api/repositories';

export const mockDashboardRepository: DashboardRepository = {
  async getDashboard() {
    return { ...DASHBOARD_MOCK };
  },
};
