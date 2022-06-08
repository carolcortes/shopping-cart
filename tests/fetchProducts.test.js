require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  it('verifica se fetchProducts é uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  });

  it('verifica se fetch foi chamada ao executar a função fetchProducts', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });

  it('verifica se a função fetch utiliza o endpoint correspondente', async () => {
    const endpoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(endpoint);
  });

  it('verifica se o retorno da função fetchProducts tem uma estrutura de dados igual ao objeto computadorSearch', async () => {
    expect(typeof await fetchProducts('computador')).toBe(typeof computadorSearch);
  });

  it('retorna um erro ao chamar a função fetchProducts sem argumento', async () => {
    try {
      await fetchProducts();
    } catch(err) {
      expect(err).toEqual(Error('You must provide an url'));
    };
  });
});
