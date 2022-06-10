const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
  it('verifica se getSavedCartItems é uma função', () => {
    expect(typeof getSavedCartItems).toBe('function');
  });

  it('verifica se o método localStorage.setItem é chamado', () => {
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalled();
  });

  it('verifica se o método localStorage.setItem é chamado com os parâmetros corretos', () => {
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalledWith('savedCart'); 
  });
});
