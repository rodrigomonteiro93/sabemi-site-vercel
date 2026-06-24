import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { AUTH_COOKIE_NAME, hasAuthToken } from '@/lib/auth/session';

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME);

  if (!hasAuthToken(token?.value)) {
    const headerList = await headers();
    const pathname = headerList.get('x-pathname') ?? headerList.get('x-url') ?? '';
    const loginUrl = pathname
      ? `/login?callbackUrl=${encodeURIComponent(pathname)}`
      : '/login';
    redirect(loginUrl);
  }

  return <>{children}</>;
}
