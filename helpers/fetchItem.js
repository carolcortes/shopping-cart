const fetchItem = async (item) => {
  try {
    const url = await fetch(`https://api.mercadolibre.com/items/${item}`);
    const response = await url.json();
    return response;
  } catch (err) {
    throw new Error('You must provide an url');
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
