import { describe, it, expect } from 'vitest';
import { buildCotacaoQueryString } from './urlParams';

describe('buildCotacaoQueryString', () => {
  it('monta query a partir dos valores exibidos na store', () => {
    const query = buildCotacaoQueryString({
      destino: 'Brasil (Nacional)',
      ida: '01/08/2026',
      retorno: '15/08/2026',
      tipo: 'Mochilão',
      ages: [25, 40],
      coberturas: '',
      ordenar: 'Menor preço',
    });

    expect(query).toBe(
      'destino=BR&ida=01-08-2026&retorno=15-08-2026&tipo=mochilao&ages=25%2C40&ordenar=Menor+pre%C3%A7o',
    );
  });

  it('inclui coberturas na query quando selecionada', () => {
    const query = buildCotacaoQueryString({
      destino: 'Brasil',
      ida: '06/07/2026',
      retorno: '10/07/2026',
      tipo: 'Lazer / Turismo / Negócios',
      ages: [33],
      coberturas: 'Cobertura COVID-19',
      ordenar: 'Maior cobertura médica',
    });

    expect(query).toContain('coberturas=Cobertura+COVID-19');
    expect(query).toContain('ordenar=Maior+cobertura+m%C3%A9dica');
  });
});
