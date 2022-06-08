require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  it('verifica se fetchItem é uma função', () => {
    expect(typeof fetchItem).toBe('function');
  });

  it('verifica se fetch foi chamada ao utilizar a função fetchItem', async () => {
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });

  it('verifica se a função fetch utiliza o endpoint correspondente', async () => {
    const endpoint = 'https://api.mercadolibre.com/items/MLB1615760527';
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith(endpoint);
  });

  it('verifica se o retorno da função fetchItem tem uma estrutura de dados igual ao objeto item', async () => {
    expect(typeof await fetchItem('MLB1615760527')).toBe(typeof item);
  });

  it('retorna um erro ao chamar a função fetchItem sem argumento', async () => {
    try {
      await fetchItem();
    } catch(err) {
      expect(err).toEqual(Error('You must provide an url'));
    };
  });
});
