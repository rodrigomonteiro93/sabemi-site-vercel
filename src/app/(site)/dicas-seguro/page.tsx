import { makeStaticPage } from '@/lib/content/makeStaticPage';

const { generateMetadata, Page } = makeStaticPage('dicas-seguro');
export { generateMetadata };
export default Page;

