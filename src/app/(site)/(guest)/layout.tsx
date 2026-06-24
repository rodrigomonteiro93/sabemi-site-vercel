import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { AUTH_COOKIE_NAME, hasAuthToken } from '@/lib/auth/session';

export default async function GuestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME);

  if (hasAuthToken(token?.value)) {
    redirect('/dashboard');
  }

  return <>{children}</>;
}
