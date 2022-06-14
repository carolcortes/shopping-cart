let total = document.querySelector('.total-price');
const cart = document.querySelector('.cart');

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

let sumPrices = JSON.parse(localStorage.getItem('totalCart'));
const totalPrice = () => {
  // const setPrice = Number.isInteger(sumPrices)
  // ? `${sumPrices.toLocaleString()},00` : `${sumPrices.toLocaleString()}`;
  if (!total) {
    total = document.createElement('h1');
    total.className = 'total-price';
    cart.appendChild(total);
  }
  total.innerText = sumPrices;
};

const saveCart = () => {
  const cartItems = document.querySelectorAll('.cart__item');
  if (cartItems.length > 0) {
    const itemsList = [];
    for (let index = 0; index < cartItems.length; index += 1) {
      itemsList.push({
        description: cartItems[index].innerText,
      });
    }
    localStorage.setItem('totalCart', JSON.stringify(parseFloat(sumPrices.toFixed(2))));
    saveCartItems(JSON.stringify(itemsList));
  }
};

const removePrice = (event) => {
  const itemCart = event.target.innerText.split('');
  const index = itemCart.indexOf('$');
  const price = parseFloat(itemCart.slice(index + 1).join(''));
  sumPrices -= price;
  total.innerText = sumPrices;
};

const cartItemClickListener = (event) => {
  event.target.remove();
  const cartItems = document.querySelectorAll('.cart__item');
  if (!cartItems.length) {
    localStorage.clear();
    total.innerText = '';
  }
  removePrice(event);
  saveCart();
};

const createCartItemElement = ({ id: sku, title: name, price: salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  sumPrices += salePrice;
  return li;
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const oldCart = () => {
  const savedCart = JSON.parse(getSavedCartItems());
  const ol = document.querySelector('.cart__items');
  if (savedCart) {
    savedCart.forEach((item) => {
      const li = document.createElement('li');
      li.className = 'cart__item';
      li.innerText = item.description;
      li.addEventListener('click', cartItemClickListener);
      ol.appendChild(li);
      saveCart();
    });
    totalPrice();
    total.innerText = sumPrices;
  }
};

const getItem = async (event) => {
  const itemId = getSkuFromProductItem(event.target.parentNode);
  const cartItem = await fetchItem(itemId);
  const ol = document.querySelector('.cart__items');
  ol.appendChild(createCartItemElement(cartItem));
  totalPrice();
  saveCart();
};

const createProductItemElement = (sku, name, image, price) => {
  const section = document.createElement('section');
  section.className = 'item';
  const setPrice = Number.isInteger(price)
  ? `${price.toLocaleString()},00` : price.toLocaleString();

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('span', 'item__price', `R$ ${setPrice}`));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'))
    .addEventListener('click', getItem);

  return section;
};

const getProducts = async () => {
  const items = document.querySelector('.items');
  const products = await fetchProducts('computador');
  products.forEach(({ id, title, thumbnail, price }) => items
  .appendChild(createProductItemElement(id, title, thumbnail, price)));
};

window.onload = () => {
  getProducts();
  oldCart();
 };
