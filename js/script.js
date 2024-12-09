async function getProducts() {
  // Виконуємо запит до файлу "store_db.json" та очікуємо на відповідь
  let response = await fetch("store_db.json");
  // Очікуємо на отримання та розпакування JSON-даних з відповіді
  let products = await response.json();

  // Повертаємо отримані продукти
  return products;
}

// Генеруємо HTML-код для карточки товару
function getCardHTML(product) {
  // Створюємо JSON-строку з даними про товар і зберігаємо її в data-атрибуті
  let productData = JSON.stringify(product);
  return `
    <div class="card" id="product-${product.id}" data-id="${product.id}" style="width: 18rem;">
      <img src="img/${product.image}" alt="${product.title}">
      <p class="card-weight">${product.weight}</p>
      <h5 class="card-title">${product.title}</h5>
      <p class="description-card">${product.description}</p>
      <p class="card-text">${product.price}</p>
      <a href="#" class="btn btn-primary cart-btn" data-product='${productData}'>В кошик</a>
    </div>
  `;
}

// This function will be called after products are fetched
function renderProducts(products) {
  const productsList = document.querySelector(".products-list");
  if (productsList) {
    products.forEach((product) => {
      // Відображаємо товари на сторінці
      productsList.innerHTML += getCardHTML(product);
    });
  } 
}

    // Делегування подій
function attachProductClickListener() {
  const productsList = document.querySelector(".products-list");
  if (productsList) {
    productsList.addEventListener("click", function (event) {
      const card = event.target.closest(".card");
      if (card) {
        const cardId = card.getAttribute("data-id");
        console.log(`Card clicked with unique ID: ${cardId}`);
        window.location.href = `details.html?id=${cardId}`;
      }
    });
  }
}

// Завантажуємо продукти та підключаємо слухача
getProducts().then((products) => {
  renderProducts(products);
  attachProductClickListener();
});