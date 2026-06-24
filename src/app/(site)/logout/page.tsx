import { createPageMetadata } from '@/lib/metadata/createPageMetadata';
import { redirect } from 'next/navigation';

export const generateMetadata = createPageMetadata('logout');

export default function LogoutPage() {
  redirect('/api/auth/logout');
}
