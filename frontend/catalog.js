// Полный список товаров (6 штук)
const products = [
    { id: 1, name: "Модель «Ромашка»", price: 2500, image: "https://placehold.co/600x600/F5F5F5/1A1A1A?text=+&font=montserrat" },
    { id: 2, name: "Модель «Лаванда»", price: 3200, image: "https://placehold.co/600x600/F5F5F5/1A1A1A?text=+&font=montserrat" },
    { id: 3, name: "Модель «Закат»", price: 2800, image: "https://placehold.co/600x600/F5F5F5/1A1A1A?text=+&font=montserrat" },
    { id: 4, name: "Модель «Ночь»", price: 3500, image: "https://placehold.co/600x600/F5F5F5/1A1A1A?text=+&font=montserrat" },
    { id: 5, name: "Модель «Мятная свежесть»", price: 3000, image: "https://placehold.co/600x600/F5F5F5/1A1A1A?text=+&font=montserrat" },
    { id: 6, name: "Модель «Радужное настроение»", price: 3900, image: "https://placehold.co/600x600/F5F5F5/1A1A1A?text=+&font=montserrat" }
];

// Показать все товары в каталоге
function showCatalog() {
    const grid = document.getElementById("catalog-grid");
    if (!grid) return;
    grid.innerHTML = products.map(p => `
        <div class="product-card">
            <img src="${p.image}" alt="${p.name}">
            <h3>${p.name}</h3>
            <p>${p.price} ₽</p>
            <button onclick="addToCart(${p.id})">В корзину</button>
        </div>
    `).join('');
}

// Функции корзины (такие же, как на главной)
function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    let cart = getCart();
    const existing = cart.find(item => item.id === productId);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    saveCart(cart);
    alert(`${product.name} добавлена в корзину`);
}

// Запуск
showCatalog();
