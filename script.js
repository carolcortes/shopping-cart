const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const cartItemClickListener = (event) => {
  // coloque seu código aqui;
  // remover do carrinho
};

const createCartItemElement = ({ id: sku, title: name, price: salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const getItem = async (event) => {
  const itemId = getSkuFromProductItem(event.target.parentNode);
  const cartItem = await fetchItem(itemId);
  const ol = document.querySelector('.cart__items');
  ol.appendChild(createCartItemElement(cartItem));
};

const createProductItemElement = (sku, name, image) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'))
    .addEventListener('click', getItem);

  return section;
};

const getProducts = async () => {
  const items = document.querySelector('.items');
  const products = await fetchProducts('computador');
  products.forEach(({ id, title, thumbnail }) => items
  .appendChild(createProductItemElement(id, title, thumbnail)));
};

window.onload = () => {
  getProducts();  
 };
