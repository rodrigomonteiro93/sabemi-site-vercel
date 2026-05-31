export interface DestinoOption {
  value: string;
  label: string;
}

export interface DestinoGroup {
  label: string;
  options: DestinoOption[];
}

export const DEST_GROUPS: DestinoGroup[] = [
  { label: 'Brasil', options: [{ value: 'BR', label: 'Brasil (Nacional)' }] },
  { label: 'América do Sul', options: [
    { value: 'AR', label: 'Argentina' },
    { value: 'CL', label: 'Chile' },
    { value: 'CO', label: 'Colômbia' },
    { value: 'PE', label: 'Peru' },
    { value: 'UY', label: 'Uruguai' },
  ]},
  { label: 'América do Norte e Central', options: [
    { value: 'US', label: 'Estados Unidos' },
    { value: 'CA', label: 'Canadá' },
    { value: 'MX', label: 'México' },
  ]},
  { label: 'Europa', options: [
    { value: 'EU', label: 'Europa (Schengen)' },
    { value: 'PT', label: 'Portugal' },
    { value: 'ES', label: 'Espanha' },
    { value: 'FR', label: 'França' },
    { value: 'IT', label: 'Itália' },
    { value: 'UK', label: 'Reino Unido' },
  ]},
  { label: 'Outros', options: [
    { value: 'AS', label: 'Ásia' },
    { value: 'AF', label: 'África' },
    { value: 'OC', label: 'Oceania' },
    { value: 'MULTI', label: 'Múltiplos destinos' },
  ]},
];

export const TIPO_OPTIONS: Array<{ value: string; label: string }> = [
  { value: 'lazer',     label: 'Lazer / Turismo / Negócios' },
  { value: 'lazer-puro',label: 'Lazer / Turismo' },
  { value: 'negocios',  label: 'Negócios' },
  { value: 'estudo',    label: 'Estudo / Intercâmbio' },
  { value: 'trabalho',  label: 'Trabalho temporário' },
  { value: 'mochilao',  label: 'Mochilão' },
  { value: 'esportes',  label: 'Esportes / Aventura' },
  { value: 'cruzeiro',  label: 'Cruzeiro' },
];

/** 'BR' → 'Brasil (Nacional)' */
export function getDestinoLabel(value: string): string {
  for (const group of DEST_GROUPS) {
    const found = group.options.find(o => o.value === value);
    if (found) return found.label;
  }
  return value;
}

/** 'lazer' → 'Lazer / Turismo / Negócios' */
export function getTipoLabel(value: string): string {
  return TIPO_OPTIONS.find(o => o.value === value)?.label ?? value;
}

/** 'Brasil (Nacional)' | 'Brasil' | 'BR' → 'BR' */
export function getDestinoValue(labelOrValue: string): string {
  for (const group of DEST_GROUPS) {
    for (const option of group.options) {
      if (option.value === labelOrValue || option.label === labelOrValue) {
        return option.value;
      }
    }
  }
  if (labelOrValue === 'Brasil') return 'BR';
  return labelOrValue;
}

/** 'Lazer / Turismo / Negócios' | 'lazer' → 'lazer' */
export function getTipoValue(labelOrValue: string): string {
  const byValue = TIPO_OPTIONS.find(o => o.value === labelOrValue);
  if (byValue) return byValue.value;
  const byLabel = TIPO_OPTIONS.find(o => o.label === labelOrValue);
  if (byLabel) return byLabel.value;
  return labelOrValue;
}
