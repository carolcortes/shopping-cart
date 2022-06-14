const cartItems = document.querySelector('.cart__items');
let total = document.querySelector('.total-price');
const cart = document.querySelector('.cart');
const clearBtn = document.querySelector('.empty-cart');
let sumPrices = JSON.parse(localStorage.getItem('totalCart'));

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

const totalPrice = () => {
  if (!total) {
    total = document.createElement('h1');
    total.className = 'total-price';
    cart.appendChild(total);
  }
  total.innerText = sumPrices;
};

const saveCart = () => {
  const cartItem = document.querySelectorAll('.cart__item');
  if (cartItem.length > 0) {
    const itemsList = [];
    for (let index = 0; index < cartItem.length; index += 1) {
      itemsList.push({
        description: cartItem[index].innerText,
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
  sumPrices = Math.round((sumPrices - price) * 100) / 100;
  total.innerText = sumPrices;
};

const cartItemClickListener = (event) => {
  event.target.remove();
  const cartItem = document.querySelectorAll('.cart__item');
  if (!cartItem.length) {
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
  sumPrices = Math.round((salePrice + sumPrices) * 100) / 100;
  return li;
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const oldCart = () => {
  const savedCart = JSON.parse(getSavedCartItems());
  if (savedCart) {
    savedCart.forEach((item) => {
      const li = document.createElement('li');
      li.className = 'cart__item';
      li.innerText = item.description;
      li.addEventListener('click', cartItemClickListener);
      cartItems.appendChild(li);
      saveCart();
    });
    totalPrice();
    total.innerText = sumPrices;
  }
};

const getItem = async (event) => {
  const itemId = getSkuFromProductItem(event.target.parentNode);
  const cartItem = await fetchItem(itemId);
  cartItems.appendChild(createCartItemElement(cartItem));
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
  section.appendChild(createCustomElement('span', 'item__price', `$ ${setPrice}`));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'))
    .addEventListener('click', getItem);

  return section;
};

const getProducts = async () => {
  const loading = document.createElement('span');
  loading.className = 'loading';
  loading.innerText = 'carregando...';
  const items = document.querySelector('.items');
  items.appendChild(loading);
  const products = await fetchProducts('computador');
  items.removeChild(loading);
  products.forEach(({ id, title, thumbnail, price }) => items
  .appendChild(createProductItemElement(id, title, thumbnail, price)));
};

const clearCart = () => {
  cartItems.textContent = '';
  localStorage.clear();
  total.innerText = '';
  sumPrices = 0;
};
clearBtn.addEventListener('click', clearCart);

window.onload = () => {
  getProducts();
  oldCart();
 };
