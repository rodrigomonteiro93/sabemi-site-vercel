export type StaticPageSlug =
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

export interface StaticPageContent {
  title: string;
  description: string;
  paragraphs: string[];
}

export const STATIC_PAGES: Record<StaticPageSlug, StaticPageContent> = {
  'quem-somos': {
    title: 'Quem Somos',
    description: 'Conheça a Sabemi Seguradora e nossa missão em seguro viagem.',
    paragraphs: [
      'A Sabemi Seguradora S.A. oferece soluções completas em seguro viagem para passageiros, agências e corretoras parceiras em todo o Brasil.',
      'Com sede em Porto Alegre, combinamos atendimento consultivo, produtos flexíveis e uma plataforma digital pensada para facilitar cotações, emissões e gestão de vouchers.',
      'Nossa equipe acompanha parceiros em todas as etapas — da contratação ao suporte em viagem — com foco em agilidade, transparência e confiança.',
    ],
  },
  'como-funciona': {
    title: 'Como Funciona',
    description: 'Entenda como cotar, contratar e utilizar o seguro viagem Sabemi.',
    paragraphs: [
      'Na página inicial ou na área do parceiro, informe destino, datas da viagem, tipo de viagem e idades dos passageiros para receber cotações em tempo real.',
      'Compare planos, coberturas e valores, selecione a opção ideal e preencha os dados dos passageiros no carrinho.',
      'Finalize o pagamento por cartão, Pix ou boleto. Após a confirmação, os vouchers são emitidos e enviados por e-mail.',
      'Em viagem, utilize a central de assistência 24h indicada no voucher para acionamento de coberturas e serviços.',
    ],
  },
  blog: {
    title: 'Blog',
    description: 'Notícias e dicas para sua viagem com mais segurança.',
    paragraphs: [
      'Aqui você encontra conteúdos sobre destinos, documentação, exigências de seguro por país, dicas de viagem e novidades da Sabemi.',
      'Em breve publicaremos novos artigos. Enquanto isso, faça uma cotação na página inicial ou entre em contato com nossa equipe.',
    ],
  },
  'alterar-cancelar-seguro': {
    title: 'Alterar / Cancelar o Seguro',
    description: 'Saiba como solicitar alterações ou cancelamento do seu seguro viagem.',
    paragraphs: [
      'Alterações de datas, destino ou dados dos passageiros podem ser solicitadas antes do início da vigência, conforme condições do plano contratado.',
      'O cancelamento pode ser feito pela área do parceiro ou por contato com nosso atendimento, respeitando prazos e regras das condições gerais.',
      'Para vouchers já emitidos, acesse a área logada em Vouchers e utilize a opção de solicitar cancelamento.',
    ],
  },
  'dicas-seguro': {
    title: 'Dicas de como utilizar o seguro',
    description: 'Orientações práticas para usar seu seguro viagem com tranquilidade.',
    paragraphs: [
      'Guarde o voucher e o contato da central de assistência em local de fácil acesso durante a viagem.',
      'Em caso de emergência médica, acione a central antes de realizar procedimentos não urgentes, quando possível.',
      'Para bagagem extraviada ou danificada, registre ocorrência junto à companhia aérea e conserve comprovantes.',
      'Leia previamente as coberturas contratadas para saber limites, franquias e documentos exigidos.',
    ],
  },
  coberturas: {
    title: 'Entenda as coberturas',
    description: 'Visão geral das principais coberturas dos planos Sabemi.',
    paragraphs: [
      'Os planos podem incluir despesas médicas e hospitalares, odontológicas, farmacêuticas, repatriamento sanitário, entre outras.',
      'Cada produto possui limites, carências e exclusões descritos nas condições gerais disponíveis na cotação.',
      'Compare os planos na etapa de cotação para escolher a proteção mais adequada ao perfil da viagem.',
    ],
  },
  'seguro-viagem': {
    title: 'O que é Seguro Viagem',
    description: 'Diferenças entre assistência em viagem e seguro viagem.',
    paragraphs: [
      'O seguro viagem é um contrato de seguro regulado pela SUSEP, com coberturas definidas em apólice e indenização conforme condições contratadas.',
      'A assistência em viagem, por outro lado, oferece serviços de apoio e atendimento, mas não substitui a estrutura de um seguro regulamentado.',
      'Para destinos que exigem comprovação de cobertura — como países do Espaço Schengen — o seguro viagem é frequentemente necessário.',
    ],
  },
  faq: {
    title: 'Perguntas e Respostas',
    description: 'Respostas às dúvidas mais comuns sobre seguro viagem Sabemi.',
    paragraphs: [
      'Quando contratar? Recomendamos contratar antes da viagem, com antecedência suficiente para revisar coberturas e documentos.',
      'Posso contratar estando no exterior? Depende do produto e destino. Consulte disponibilidade na cotação.',
      'Como acionar o seguro? Utilize os canais da central de assistência informados no voucher.',
      'Parceiros Sabemi podem emitir vouchers pela área logada, com comissionamento conforme acordo comercial.',
    ],
  },
  'paises-cobertura': {
    title: 'Países que exigem cobertura',
    description: 'Informações sobre exigências de seguro viagem por destino.',
    paragraphs: [
      'Diversos países exigem comprovação de seguro viagem com cobertura mínima para despesas médicas, especialmente na Europa (Schengen).',
      'Verifique sempre os requisitos atualizados do país de destino antes da viagem.',
      'Na cotação Sabemi, selecione o destino correto para visualizar planos compatíveis com as exigências mais comuns.',
    ],
  },
  'politica-cookies': {
    title: 'Política de Cookies',
    description: 'Como utilizamos cookies em nosso site.',
    paragraphs: [
      'Utilizamos cookies essenciais para funcionamento do site, autenticação de parceiros e preferências de navegação.',
      'Cookies analíticos podem ser usados para entender o uso do site e melhorar a experiência, sempre respeitando sua privacidade.',
      'Você pode gerenciar cookies pelo banner de consentimento ou configurações do navegador.',
    ],
  },
  'politica-privacidade': {
    title: 'Política de Privacidade',
    description: 'Como tratamos seus dados pessoais.',
    paragraphs: [
      'Coletamos dados necessários para cotação, contratação, emissão de vouchers e relacionamento com parceiros, em conformidade com a LGPD.',
      'Informações de passageiros são utilizadas exclusivamente para fins de seguro, assistência e cumprimento de obrigações legais.',
      'Você pode solicitar informações sobre seus dados entrando em contato pelo e-mail contato@sabemi.com.br.',
    ],
  },
  'termos-de-uso': {
    title: 'Termos de Uso',
    description: 'Condições de uso da plataforma Sabemi.',
    paragraphs: [
      'Ao utilizar este site, você concorda com estes termos e com as políticas de privacidade e cookies.',
      'Parceiros são responsáveis pela veracidade dos dados informados na cotação e emissão de vouchers.',
      'A Sabemi pode atualizar estes termos periodicamente. Recomendamos revisá-los regularmente.',
    ],
  },
  'recuperar-senha': {
    title: 'Recuperar Senha',
    description: 'Solicite a redefinição da sua senha de parceiro.',
    paragraphs: [
      'Informe o CPF ou CNPJ cadastrado e o e-mail de acesso. Enviaremos instruções para redefinir sua senha.',
      'Se não receber o e-mail em alguns minutos, verifique a caixa de spam ou entre em contato com o suporte.',
    ],
  },
};
