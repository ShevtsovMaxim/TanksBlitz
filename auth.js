console.log("Система авторизации Леста Игры загружена!");

document.addEventListener('DOMContentLoaded', function() {
    console.log("Страница авторизации готова!");
    
    const loginBtn = document.getElementById('loginBtn');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    // Автозаполнение для тестирования
    usernameInput.value = 'LestaPlayer';
    passwordInput.value = '123456';

    loginBtn.addEventListener('click', function() {
        const username = usernameInput.value.trim();
        const password = passwordInput.value;

        console.log("Попытка авторизации:", { username, password: '***' });

        // Валидация
        if (!username || !password) {
            alert('⚠️ Заполните все поля!');
            return;
        }

        if (username.length < 3) {
            alert('⚠️ Никнейм должен быть не менее 3 символов!');
            return;
        }

        // Сохраняем данные пользователя в sessionStorage
        const userData = {
            username: username,
            loginTime: new Date().toISOString(),
            isAuthenticated: true
        };
        
        sessionStorage.setItem('lestaUser', JSON.stringify(userData));
        
        // Показываем загрузку
        loginBtn.innerHTML = '⏳ Вход...';
        loginBtn.disabled = true;

        // Имитация запроса к API
        setTimeout(() => {
            // Переходим на страницу профиля
            window.location.href = 'profile.html';
        }, 1500);
    });

    // Enter для авторизации
    passwordInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            loginBtn.click();
        }
    });
});
