// Элементы DOM
const modal = document.getElementById('userModal');
const openBtn = document.getElementById('openModal');
const closeBtn = document.querySelector('.close');
const userDataContainer = document.getElementById('userData');

// Открыть модальное окно и загрузить данные
openBtn.addEventListener('click', async function() {
    modal.style.display = 'block';
    userDataContainer.innerHTML = '<div class="loading">⏳ Загрузка данных...</div>';
    
    try {
        // Используем JSONPlaceholder API для демонстрации
        const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
        
        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status}`);
        }
        
        const user = await response.json();
        displayUserData(user);
        
    } catch (error) {
        console.error('Ошибка:', error);
        userDataContainer.innerHTML = `
            <div style="color: #ff4757; text-align: center; padding: 20px;">
                <h3>❌ Ошибка загрузки</h3>
                <p>${error.message}</p>
                <button onclick="retryLoad()" class="btn-primary">Повторить</button>
            </div>
        `;
    }
});

// Функция для отображения данных пользователя
function displayUserData(user) {
    userDataContainer.innerHTML = `
        <div class="user-info"><strong>👤 Имя:</strong> ${user.name}</div>
        <div class="user-info"><strong>📧 Email:</strong> ${user.email}</div>
        <div class="user-info"><strong>📞 Телефон:</strong> ${user.phone}</div>
        <div class="user-info"><strong>🌐 Вебсайт:</strong> ${user.website}</div>
        <div class="user-info"><strong>🏢 Компания:</strong> ${user.company.name}</div>
        <div class="user-info"><strong>📍 Адрес:</strong> ${user.address.city}, ${user.address.street}</div>
        <div class="user-info" style="text-align: center; margin-top: 15px;">
            <small>Данные загружены из JSONPlaceholder API</small>
        </div>
    `;
}

// Функция повторной загрузки
function retryLoad() {
    openBtn.click();
}

// Закрыть модальное окно
closeBtn.addEventListener('click', function() {
    modal.style.display = 'none';
});

// Закрыть при клике вне модального окна
window.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Закрыть по ESC
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && modal.style.display === 'block') {
        modal.style.display = 'none';
    }
});