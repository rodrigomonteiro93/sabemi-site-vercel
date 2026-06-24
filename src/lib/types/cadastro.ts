export type TipoCadastro = 'corretora' | 'agencia';

export interface CadastroRequest {
  tipoCadastro: TipoCadastro;
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  dataNascimento: string;
  senha: string;
  cnpj: string;
  nomeFantasia: string;
  razaoSocial: string;
  registroTipo: string;
  cep: string;
  endereco: string;
  bairro: string;
  estado: string;
  cidade: string;
  numero: string;
  complemento?: string;
}

export interface CadastroResponse {
  ok: true;
}
