import { makeStaticPage } from '@/lib/content/makeStaticPage';

const { generateMetadata, Page } = makeStaticPage('paises-cobertura');
export { generateMetadata };
export default Page;

