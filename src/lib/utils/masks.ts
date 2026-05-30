export type MaskType = 'telefone' | 'cpf' | 'cnpj' | 'cpf-cnpj' | 'cep';

function digits(value: string): string {
  return value.replace(/\D/g, '');
}

function maskCep(value: string): string {
  const d = digits(value).slice(0, 8);
  if (d.length <= 5) return d;
  return `${d.slice(0, 5)}-${d.slice(5)}`;
}

function maskCpf(value: string): string {
  const d = digits(value).slice(0, 11);
  if (d.length <= 3) return d;
  if (d.length <= 6) return `${d.slice(0, 3)}.${d.slice(3)}`;
  if (d.length <= 9) return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6)}`;
  return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9)}`;
}

function maskCnpj(value: string): string {
  const d = digits(value).slice(0, 14);
  if (d.length <= 2) return d;
  if (d.length <= 5) return `${d.slice(0, 2)}.${d.slice(2)}`;
  if (d.length <= 8) return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5)}`;
  if (d.length <= 12) return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8)}`;
  return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8, 12)}-${d.slice(12)}`;
}

function maskCpfCnpj(value: string): string {
  const d = digits(value);
  if (d.length <= 11) return maskCpf(value);
  return maskCnpj(value);
}

function maskTelefone(value: string): string {
  const d = digits(value).slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : '';
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  // celular: 11 dígitos → (XX) XXXXX-XXXX
  // fixo: 10 dígitos → (XX) XXXX-XXXX
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

export function applyMask(value: string, mask: MaskType): string {
  switch (mask) {
    case 'cep':
      return maskCep(value);
    case 'cpf':
      return maskCpf(value);
    case 'cnpj':
      return maskCnpj(value);
    case 'cpf-cnpj':
      return maskCpfCnpj(value);
    case 'telefone':
      return maskTelefone(value);
  }
}
