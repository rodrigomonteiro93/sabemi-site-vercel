import { cookies } from 'next/headers';

import { AUTH_COOKIE_NAME } from '@/lib/auth/session';

export async function clearAuthToken() {
  const cookieStore = await cookies();
  cookieStore.set(AUTH_COOKIE_NAME, '', { maxAge: 0, path: '/' });
}
