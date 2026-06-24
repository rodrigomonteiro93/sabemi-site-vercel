import { z } from 'zod';

export const emissorSchema = z.object({
  perfil: z.enum(['emissor', 'financeiro'], {
    required_error: 'Selecione um perfil',
  }),
  nome: z.string().min(1, 'Nome obrigatório'),
  email: z.string().email('E-mail inválido'),
  senha: z.string().min(8, 'Mínimo de 8 caracteres com letras e números'),
  confirmarSenha: z.string().min(1, 'Confirme a senha'),
  telefone: z.string().min(1, 'Telefone obrigatório'),
  cpf: z.string().min(1, 'CPF obrigatório'),
}).refine(data => data.senha === data.confirmarSenha, {
  message: 'As senhas não conferem',
  path: ['confirmarSenha'],
});

export const emissorEditSchema = z.object({
  perfil: z.enum(['emissor', 'financeiro'], {
    required_error: 'Selecione um perfil',
  }),
  nome: z.string().min(1, 'Nome obrigatório'),
  email: z.string().email('E-mail inválido'),
  senha: z.string().optional(),
  confirmarSenha: z.string().optional(),
  telefone: z.string().min(1, 'Telefone obrigatório'),
  cpf: z.string().min(1, 'CPF obrigatório'),
}).refine((data) => {
  if (!data.senha && !data.confirmarSenha) return true;
  return (data.senha?.length ?? 0) >= 8 && data.senha === data.confirmarSenha;
}, {
  message: 'As senhas não conferem',
  path: ['confirmarSenha'],
});

export type EmissorFormData = z.infer<typeof emissorSchema>;
export type EmissorEditFormData = z.infer<typeof emissorEditSchema>;
