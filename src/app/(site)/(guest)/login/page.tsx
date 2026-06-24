import { createPageMetadata } from '@/lib/metadata/createPageMetadata';
import LoginContent from './page-content';

export const generateMetadata = createPageMetadata('login');

export default function LoginPage() {
  return <LoginContent />;
}
