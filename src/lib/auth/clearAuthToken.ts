import { cookies } from 'next/headers';

export async function clearAuthToken() {
  const cookieStore = await cookies();
  cookieStore.set('auth-token', '', { maxAge: 0, path: '/' });
}
