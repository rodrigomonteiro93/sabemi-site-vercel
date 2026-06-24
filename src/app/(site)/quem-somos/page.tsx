import { makeStaticPage } from '@/lib/content/makeStaticPage';

const { generateMetadata, Page } = makeStaticPage('quem-somos');
export { generateMetadata };
export default Page;

