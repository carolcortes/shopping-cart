const getSavedCartItems = () => localStorage.getItem('savedCart');

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
