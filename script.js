const cartItems = document.querySelector('.cart__items');
let total = document.querySelector('.total-price');
const cart = document.querySelector('.cart');
const clearBtn = document.querySelector('.empty-cart');
let sumPrices = JSON.parse(localStorage.getItem('totalCart'));

const createProductImageElement = (imageSource, elementClass) => {
  const img = document.createElement('img');
  img.className = elementClass;
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const createIconButton = (materialIcon, className) => {
  const buttonContent = document.createElement('i');
  buttonContent.className = 'material-icons';
  buttonContent.style = 'font-size: 22px; color: #b30909';
  buttonContent.innerText = materialIcon;

  const button = document.createElement('button');
  button.className = className;
  button.appendChild(buttonContent);

  return button;
};

const setTotalPrice = () => {
  total.innerText = `Valor total: $ ${sumPrices?.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
  })}`;
};

const saveCart = (item) => {
  const savedItems = JSON.parse(getSavedCartItems());
  const itemsList = savedItems || [];

  itemsList.push({
    title: item.title,
    price: item.price,
    thumbnail: item.thumbnail,
    sku: item.id,
    timestamp: item.timestamp,
  });

  localStorage.setItem('totalCart', JSON.stringify(parseFloat(sumPrices?.toFixed(2))));
  saveCartItems(JSON.stringify(itemsList));
};

const removePrice = (price) => {
  sumPrices = Math.round((sumPrices - price) * 100) / 100;
  if (sumPrices === 0) return (total.innerText = 'Seu carrinho está vazio');
  total.innerText = `Valor total: $ ${sumPrices.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
  })}`;
};

const removeCartItem = (event, item) => {
  const savedItems = JSON.parse(getSavedCartItems());
  const cart = document.querySelector('.cart__items');
  const itemId = item

  if (event.target.className !== 'cart__remove') {
    cart.removeChild(event.target.parentNode.parentNode);
  } else {
    cart.removeChild(event.target.parentNode);
  }

  const cartItem = document.querySelectorAll('.cart__item');
  if (!cartItem.length) {
    localStorage.clear();
    return total.innerText = 'Seu carrinho está vazio';
  }

  const newCart = savedItems.filter(({ timestamp }) => item.timestamp !== timestamp);

  removePrice(item.salePrice);
  localStorage.setItem('totalCart', JSON.stringify(parseFloat(sumPrices?.toFixed(2))));
  saveCartItems(JSON.stringify(newCart))
};

const createCartItemContent = (sku, title, price) => {
  const cartItemContainer = document.createElement('div');
  cartItemContainer.className = 'container-cart__item';

  const setPrice = Number.isInteger(price)
    ? `${price.toLocaleString()},00`
    : price.toLocaleString();

  cartItemContainer.appendChild(createCustomElement('span', 'cart__sku', sku));
  cartItemContainer.appendChild(createCustomElement('span', 'cart__title', title));
  cartItemContainer.appendChild(createCustomElement('span', 'cart__price', `$ ${setPrice}`));

  return cartItemContainer;
};

const createCartItemElement = (item, reload = false) => {
  const cartItem = {
    sku: item.sku || item.id,
    image: item.thumbnail,
    title: item.title,
    salePrice: item.price,
    timestamp: item.timestamp,
  };

  const li = document.createElement('li');
  li.className = 'cart__item';

  const removeButtonContent = document.createElement('i');
  removeButtonContent.className = 'material-icons';
  removeButtonContent.style = 'font-size:45px; color:white';
  removeButtonContent.innerHTML = 'shopping_cart';

  li.appendChild(createProductImageElement(item.thumbnail, 'cart__image'));
  li.appendChild(createCartItemContent(cartItem.sku, cartItem.title, cartItem.salePrice));
  li.appendChild(createIconButton('delete', 'cart__remove')).addEventListener('click', (event) =>
    removeCartItem(event, cartItem),
  );

  if (!reload) sumPrices = Math.round((cartItem.salePrice + sumPrices) * 100) / 100;

  return li;
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const oldCart = () => {
  const savedCart = JSON.parse(getSavedCartItems());

  if (savedCart) {
    savedCart.forEach((item) => {
      cartItems.appendChild(createCartItemElement(item, (reload = true)));
    });
    total.innerText = `Valor total: $ ${sumPrices?.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
    })}`;
  }
};

const getItem = async (event) => {
  const timestamp = new Date().getTime();
  const itemId = getSkuFromProductItem(event.target.parentNode);
  const cartItem = await fetchItem(itemId);
  cartItems.appendChild(createCartItemElement({ ...cartItem, timestamp }));
  setTotalPrice();
  saveCart({ ...cartItem, timestamp });
};

const createProductItemElement = (sku, name, image, price) => {
  const section = document.createElement('section');
  section.className = 'item';

  const itemContentDiv = document.createElement('div');
  itemContentDiv.className = 'container-item__content';

  const setPrice = Number.isInteger(price)
    ? `${price.toLocaleString()},00`
    : price.toLocaleString();

  section.appendChild(itemContentDiv);

  itemContentDiv.appendChild(createCustomElement('span', 'item__sku', sku));
  itemContentDiv.appendChild(createProductImageElement(image, 'item__image'));
  itemContentDiv.appendChild(createCustomElement('span', 'item__title', name));
  itemContentDiv.appendChild(createCustomElement('span', 'item__price', `$ ${setPrice}`));
  section
    .appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho'))
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
  products.forEach(({ id, title, thumbnail, price }) =>
    items.appendChild(createProductItemElement(id, title, thumbnail, price)),
  );
};

const clearCart = () => {
  cartItems.textContent = '';
  localStorage.clear();
  total.innerText = 'Seu carrinho está vazio';
  sumPrices = 0;
};
clearBtn.addEventListener('click', clearCart);

window.onload = () => {
  getProducts();
  oldCart();
};
