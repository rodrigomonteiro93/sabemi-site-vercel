import { makeStaticPage } from '@/lib/content/makeStaticPage';

const { generateMetadata, Page } = makeStaticPage('blog');
export { generateMetadata };
export default Page;

