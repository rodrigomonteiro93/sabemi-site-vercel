import { makeStaticPage } from '@/lib/content/makeStaticPage';

const { generateMetadata, Page } = makeStaticPage('seguro-viagem');
export { generateMetadata };
export default Page;

