const saveCartItems = (items) => localStorage.setItem('savedCart', items);

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
