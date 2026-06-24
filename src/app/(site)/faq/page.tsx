import { makeStaticPage } from '@/lib/content/makeStaticPage';

const { generateMetadata, Page } = makeStaticPage('faq');
export { generateMetadata };
export default Page;

