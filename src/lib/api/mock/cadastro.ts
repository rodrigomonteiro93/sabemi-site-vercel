import type { CadastroRepository } from '@/lib/api/repositories';
import type { CadastroRequest, CadastroResponse } from '@/lib/types/cadastro';

const REQUIRED_FIELDS: (keyof CadastroRequest)[] = [
  'tipoCadastro',
  'nome',
  'email',
  'telefone',
  'cpf',
  'dataNascimento',
  'senha',
  'cnpj',
  'nomeFantasia',
  'razaoSocial',
  'registroTipo',
  'cep',
  'endereco',
  'bairro',
  'estado',
  'cidade',
  'numero',
];

function hasEmptyRequiredField(data: CadastroRequest) {
  return REQUIRED_FIELDS.some((field) => {
    const value = data[field];
    return typeof value !== 'string' || !value.trim();
  });
}

export const mockCadastroRepository: CadastroRepository = {
  async register(data: CadastroRequest): Promise<CadastroResponse> {
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (hasEmptyRequiredField(data)) {
      throw new Error('Preencha todos os campos obrigatórios');
    }

    return { ok: true };
  },
};
