export interface EmissorItem {
  id: number;
  nome: string;
  email: string;
  tel: string;
  cpf: string;
  perfil: 'emissor' | 'financeiro';
  comissao: number | null;
  ativo: boolean;
  data: string; // "DD/MM/YYYY HH:mm"
}

export interface EmissoresFilterParams {
  search: string;
  perfil: string;   // '' | 'emissor' | 'financeiro'
  status: string;   // '' | 'ativo' | 'inativo'
  temComissao: string; // '' | 'sim' | 'nao'
}

export type EmissorFormData = {
  perfil: 'emissor' | 'financeiro';
  nome: string;
  email: string;
  senha: string;
  confirmarSenha: string;
  tel: string;
  cpf: string;
  comissao: string;
};
