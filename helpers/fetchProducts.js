const fetchProducts = async (product) => {
  try {
    const url = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${product}`);
    const results = await url.json();
    return results;
  } catch (err) {
    throw new Error('You must provide an url');
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
