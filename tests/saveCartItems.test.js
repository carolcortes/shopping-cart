const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', () => {
  it('verifica se saveCartItems é uma função', () => {
    expect(typeof saveCartItems).toBe('function');
  });

  it('verifica se o método localStorage.setItem é chamado', () => {
    // Teste se, ao executar saveCartItems com o argumento <ol><li>Item</li></ol>, o método localStorage.setItem é chamado;
  });

  it('verifica se o método localStorage.setItem é chamado com os parâmetros corretos', () => {
    //Teste se, ao executar saveCartItems com o argumento <ol><li>Item</li></ol>, o método localStorage.setItem é chamado com dois parâmetros, sendo o primeiro 'cartItems' e o segundo sendo o valor passado como argumento para saveCartItems. 
  });

  // testar erros
});
