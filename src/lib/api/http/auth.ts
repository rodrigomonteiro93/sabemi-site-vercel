import type { AuthRepository } from '@/lib/api/repositories';
import type { LoginRequest, LoginResponse } from '@/lib/types/auth';
import { apiFetch } from '@/lib/api/client';

export const httpAuthRepository: AuthRepository = {
  login(data: LoginRequest): Promise<LoginResponse> {
    return apiFetch<LoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};
