// Инициализация EmailJS
emailjs.init("tm8Ic3KYTjSgLp8v1"); // Сюда вставь свой Public Key

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
async function submitOrder(event) {
    event.preventDefault();
    
    const cart = getCart();
    if (cart.length === 0) {
        alert('Корзина пуста. Добавьте товары перед оформлением заказа.');
        return;
    }
    
    // Собираем данные из формы
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const comment = document.getElementById('comment').value;
    
    // Проверяем обязательные поля
    if (!name || !phone || !address) {
        alert('Пожалуйста, заполните все обязательные поля (Имя, Телефон, Адрес)');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Формируем данные для EmailJS
    const templateParams = {
        name: name,
        email: email,
        phone: phone,
        address: address,
        comment: comment,
        items: cart.map(item => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price
        })),
        total: total + ' ₽'
    };
    
    try {
        // Отправляем письмо через EmailJS
        const response = await emailjs.send('service_a9gycjx', 'template_r00ibbh', templateParams);
        console.log('Письмо отправлено:', response);
        
        alert(`Заказ оформлен!\n\nСпасибо, ${name}!\nСумма заказа: ${total} ₽\n\nПисьмо с подтверждением отправлено на ${email}`);
        
        // Очищаем корзину
        localStorage.removeItem('cart');
        
        // Перенаправляем на главную
        window.location.href = 'index.html';
    } catch (error) {
        console.error('Ошибка при отправке:', error);
        alert('Произошла ошибка при оформлении заказа. Пожалуйста, попробуйте еще раз.');
    }
}

// Запускаем отображение состава заказа при загрузке страницы
renderOrderSummary();

// Вешаем обработчик на форму
const form = document.getElementById('order-form');
if (form) {
    form.addEventListener('submit', submitOrder);
}
