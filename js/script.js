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
          <div class="card" data-id=${product.id} style="width: 18rem;">
          <img src="img/${product.image}">
              <h5 class="card-title">${product.title}</h5>
              <p class="description-card">${product.description}</p>
              <p class="card-text"> ${product.price}</p>
              <a href="#" class="btn btn-primary cart-btn"  data-product='${productData}'>В кошик</a>
          </div>
          </div>
           `;
  }



  getProducts().then(function (products) {
    let productsList = document.querySelector(".products-list");
    if (productsList) {
      products.forEach(function (product) {
        // Відображаємо товари на сторінці
        productsList.innerHTML += getCardHTML(product);
      });
    }
  });


document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(".card");

  cards.forEach(function (card) {
    card.addEventListener("click", function () {
      const cardId = card.getAttribute("product.id") ;
      window.location.href = `details.html?id=${cardId}`;
    })
  });
});

