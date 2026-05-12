// Получить корзину из localStorage
function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

// Показать состав заказа и итог
function renderOrderSummary() {
    const cart = getCart();
    const container = document.getElementById('order-summary');
    
    if (!container) return;
    
    if (cart.length === 0) {
        container.innerHTML = '<p class="empty-cart">Корзина пуста. <a href="catalog.html">Перейти в каталог</a></p>';
        return;
    }
    
    const itemsHtml = cart.map(item => `
        <div class="order-item">
            <span>${item.name} x ${item.quantity}</span>
            <span>${item.price * item.quantity} ₽</span>
        </div>
    `).join('');
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    container.innerHTML = `
        <h3>Ваш заказ</h3>
        <div class="order-items">${itemsHtml}</div>
        <div class="order-total">Итого: ${total} ₽</div>
    `;
}

// Отправить заказ
function submitOrder(event) {
    event.preventDefault();
    
    const cart = getCart();
    if (cart.length === 0) {
        alert('Корзина пуста. Добавьте товары перед оформлением заказа.');
        return;
    }
    
    // Собираем данные из формы
    const orderData = {
        customer: {
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,
            address: document.getElementById('address').value,
            comment: document.getElementById('comment').value
        },
        items: cart,
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        date: new Date().toLocaleString('ru-RU')
    };
    
    // Проверяем обязательные поля
    if (!orderData.customer.name || !orderData.customer.phone || !orderData.customer.address) {
        alert('Пожалуйста, заполните все обязательные поля (Имя, Телефон, Адрес)');
        return;
    }
    
    // Показываем заказ в консоли (для отладки)
    console.log('НОВЫЙ ЗАКАЗ:', orderData);
    
    // Здесь позже добавим отправку в Telegram / ВК / MAX
    
    // Показываем сообщение об успехе
    alert(`Заказ оформлен!\n\nСпасибо, ${orderData.customer.name}!\nСумма заказа: ${orderData.total} ₽\n\nМы свяжемся с вами в ближайшее время.`);
    
    // Очищаем корзину
    localStorage.removeItem('cart');
    
    // Перенаправляем на главную
    window.location.href = 'index.html';
}

// Запускаем отображение состава заказа при загрузке страницы
renderOrderSummary();

// Вешаем обработчик на форму
const form = document.getElementById('order-form');
if (form) {
    form.addEventListener('submit', submitOrder);
}
