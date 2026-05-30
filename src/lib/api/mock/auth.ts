import type { AuthRepository } from '@/lib/api/repositories';
import type { LoginRequest, LoginResponse } from '@/lib/types/auth';

const MOCK_USER_ID  = '999.999.999-99';
const MOCK_PASSWORD = '123456';
const MOCK_TOKEN    = 'mock-token-sabemi';

function normalize(value: string) {
  return value.replace(/\D/g, '');
}

export const mockAuthRepository: AuthRepository = {
  async login({ userId, password }: LoginRequest): Promise<LoginResponse> {
    await new Promise(r => setTimeout(r, 300));
    if (normalize(userId) === normalize(MOCK_USER_ID) && password === MOCK_PASSWORD) {
      return { token: MOCK_TOKEN };
    }
    throw new Error('Credenciais inválidas');
  },
};
