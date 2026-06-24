export const ROUTES = {
  home: '/',
  login: '/login',
  cadastro: '/cadastro',
  logout: '/logout',
  cotacao: '/cotacao',
  carrinho: '/carrinho',
  checkout: '/checkout',
  dashboard: '/dashboard',
  blog: '/blog',
  quemSomos: '/quem-somos',
  comoFunciona: '/como-funciona',
  alterarCancelar: '/alterar-cancelar-seguro',
  dicasSeguro: '/dicas-seguro',
  coberturas: '/coberturas',
  seguroViagem: '/seguro-viagem',
  faq: '/faq',
  paisesCobertura: '/paises-cobertura',
  politicaCookies: '/politica-cookies',
  politicaPrivacidade: '/politica-privacidade',
  termosDeUso: '/termos-de-uso',
  recuperarSenha: '/recuperar-senha',
  tarifasEspeciais: '/tarifas-especiais',
  markup: '/markup',
  whiteLabel: '/white-label',
  emissores: '/emissores',
  vouchers: '/vouchers',
} as const;

export const EXTERNAL = {
  googleMaps:
    'https://www.google.com/maps/search/?api=1&query=R.+Sete+de+Setembro,+515,+Centro+Histórico,+Porto+Alegre,+RS',
  whatsApp: 'https://wa.me/5551987654321?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20o%20Seguro%20Viagem%20Sabemi.',
  euViajoSeguro: 'https://www.euviajoseguro.com.br',
  intermac: 'https://www.intermacseguros.com.br',
  youtube: 'https://www.youtube.com/@sabemi',
  facebook: 'https://www.facebook.com/sabemi',
  instagram: 'https://www.instagram.com/sabemi',
  linkedin: 'https://www.linkedin.com/company/sabemi',
} as const;

export const HEADER_NAV = [
  { label: 'Home', href: ROUTES.home },
  { label: 'Quem Somos', href: ROUTES.quemSomos },
  { label: 'Como Funciona', href: ROUTES.comoFunciona },
  { label: 'Blog', href: ROUTES.blog },
  { label: 'Seja nosso Parceiro', href: ROUTES.cadastro },
] as const;
