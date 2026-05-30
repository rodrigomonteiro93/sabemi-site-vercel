import { getProvider } from '@/lib/api/provider';
import type { DashboardData } from '@/lib/types/dashboard';

export async function getDashboard(): Promise<DashboardData> {
  return getProvider().dashboard.getDashboard();
}
