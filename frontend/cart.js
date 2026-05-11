// Получить корзину из localStorage
function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

// Сохранить корзину
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Показать содержимое корзины
function renderCart() {
    const cart = getCart();
    const container = document.getElementById('cart-items');
    const totalContainer = document.getElementById('cart-total');
    const actionsContainer = document.getElementById('cart-actions');
    
    if (!container) return;
    
    if (cart.length === 0) {
        container.innerHTML = '<p class="empty-cart">Корзина пуста</p>';
        totalContainer.innerHTML = '';
        actionsContainer.innerHTML = '<a href="catalog.html" class="btn">Перейти в каталог</a>';
        return;
    }
    
    // Отображаем каждый товар
    container.innerHTML = cart.map(item => `
        <div class="cart-item" data-id="${item.id}">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">${item.price} ₽</div>
            </div>
            <div class="cart-item-actions">
                <button class="qty-btn" onclick="changeQuantity(${item.id}, -1)">-</button>
                <span class="cart-item-qty">${item.quantity}</span>
                <button class="qty-btn" onclick="changeQuantity(${item.id}, 1)">+</button>
                <button class="remove-btn" onclick="removeItem(${item.id})">Удалить</button>
            </div>
            <div class="cart-item-total">${item.price * item.quantity} ₽</div>
        </div>
    `).join('');
    
    // Считаем итог
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    totalContainer.innerHTML = `<div class="cart-total-sum">ИТОГО: ${total} ₽</div>`;
    actionsContainer.innerHTML = `
        <a href="catalog.html" class="btn">Продолжить покупки</a>
        <a href="checkout.html" class="btn btn-primary">Оформить заказ</a>
    `;
}

// Изменить количество
function changeQuantity(id, delta) {
    const cart = getCart();
    const item = cart.find(i => i.id === id);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            // Если количество стало 0 или меньше — удаляем
            const index = cart.findIndex(i => i.id === id);
            cart.splice(index, 1);
        }
        saveCart(cart);
        renderCart();
    }
}

// Удалить товар полностью
function removeItem(id) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== id);
    saveCart(cart);
    renderCart();
}

// Запускаем отображение корзины
renderCart();
