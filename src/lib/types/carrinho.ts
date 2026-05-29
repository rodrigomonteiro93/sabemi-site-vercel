import { z } from 'zod';

export const paxSchema = z.object({
  tipoDoc: z.string().min(1),
  documento: z.string().min(1, 'Documento obrigatório'),
  plano: z.string(),
  nome: z.string().min(3, 'Nome completo obrigatório'),
  email: z.string().email('E-mail inválido'),
  telefone: z.string().min(10, 'Telefone obrigatório'),
  nascimento: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/, 'Data inválida'),
  enderecoSource: z.string(),
  cep: z.string().min(8, 'CEP obrigatório'),
  endereco: z.string().min(1, 'Endereço obrigatório'),
  bairro: z.string().min(1, 'Bairro obrigatório'),
  estado: z.string().min(1, 'Estado obrigatório'),
  cidade: z.string().min(1, 'Cidade obrigatória'),
  numero: z.string().min(1, 'Número obrigatório'),
  complemento: z.string().optional(),
  emergenciaSource: z.string(),
  emergenciaNome: z.string().min(1, 'Nome do contato obrigatório'),
  emergenciaTel: z.string().min(10, 'Telefone obrigatório'),
  emergenciaEmail: z.string().email().optional().or(z.literal('')),
});

export type PaxFormData = z.infer<typeof paxSchema>;

export interface PlanInfo {
  planName: string;
  ageRange: string;
  priceVista: string;
  priceTotal: string;
  motivo: string;
  destino: string;
  periodo: string;
}
