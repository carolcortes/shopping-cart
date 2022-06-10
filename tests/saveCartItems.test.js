const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', () => {
  it('verifica se saveCartItems é uma função', () => {
    expect(typeof saveCartItems).toBe('function');
  });

  it('verifica se o método localStorage.setItem é chamado', () => {
    saveCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  it('verifica se o método localStorage.setItem é chamado com os parâmetros corretos', () => {
    saveCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.setItem).toHaveBeenCalledWith('savedCart', '<ol><li>Item</li></ol>'); 
  });
});
