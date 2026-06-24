export type PageKey =
  | 'home'
  | 'login'
  | 'cadastro'
  | 'logout'
  | 'cotacao'
  | 'carrinho'
  | 'checkout'
  | 'dashboard'
  | 'comissoes'
  | 'financeiro'
  | 'financeiro-detalhe'
  | 'emissores'
  | 'emissores-cadastrar'
  | 'emissor-editar'
  | 'emissor-editar-not-found'
  | 'vouchers'
  | 'voucher-detalhe'
  | 'markup'
  | 'white-label'
  | 'tarifas-especiais'
  | 'quem-somos'
  | 'como-funciona'
  | 'blog'
  | 'alterar-cancelar-seguro'
  | 'dicas-seguro'
  | 'coberturas'
  | 'seguro-viagem'
  | 'faq'
  | 'paises-cobertura'
  | 'politica-cookies'
  | 'politica-privacidade'
  | 'termos-de-uso'
  | 'recuperar-senha';

export interface PageMetaEntry {
  title: string;
  description?: string;
}

export type PagesMetadata = Record<PageKey, PageMetaEntry>;
