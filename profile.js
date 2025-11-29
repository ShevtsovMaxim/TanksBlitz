console.log("Страница личного кабинета загружена!");

class LestaProfileAPI {
    constructor() {
        this.userData = null;
    }

    // Получение данных профиля
    async getProfileData() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    id: 12345,
                    username: 'LestaPlayer',
                    email: 'player@lesta.ru',
                    registrationDate: '2023-01-15',
                    status: 'premium',
                    clan: 'Lesta Warriors',
                    lastLogin: new Date().toLocaleString()
                });
            }, 800);
        });
    }

    // Получение баланса
    async getBalance() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    gold: 2250,
                    silver: 15000,
                    premiumCurrency: 75,
                    battlePassPoints: 3400,
                    premiumDays: 45
                });
            }, 600);
        });
    }

    // Получение статистики
    async getStatistics() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    totalBattles: 456,
                    wins: 245,
                    losses: 211,
                    winRate: '53.7%',
                    averageDamage: 1850,
                    favoriteVehicle: 'Т-34',
                    rating: 1850,
                    clanBattles: 89
                });
            }, 700);
        });
    }

    // Получение достижений
    async getAchievements() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([
                    'Первая победа',
                    'Серия из 5 побед', 
                    'Мастер техники',
                    'Клановый воин',
                    'Коллекционер',
                    'Ветеран',
                    'Тактик'
                ]);
            }, 500);
        });
    }
}

// Инициализация страницы профиля
document.addEventListener('DOMContentLoaded', async function() {
    console.log("Личный кабинет инициализирован!");
    
    // Проверяем авторизацию
    const userData = JSON.parse(sessionStorage.getItem('lestaUser'));
    
    if (!userData || !userData.isAuthenticated) {
        // Если не авторизован, возвращаем на главную
        alert('❌ Требуется авторизация!');
        window.location.href = 'index.html';
        return;
    }

    // Устанавливаем приветствие
    document.getElementById('userGreeting').textContent = 
        `Добро пожаловать, ${userData.username}!`;

    // Загружаем данные
    await loadProfileData();

    // Обработчик выхода
    document.getElementById('logoutBtn').addEventListener('click', function() {
        sessionStorage.removeItem('lestaUser');
        window.location.href = 'index.html';
    });
});

// Загрузка всех данных профиля
async function loadProfileData() {
    const api = new LestaProfileAPI();
    
    try {
        const [profile, balance, statistics, achievements] = await Promise.all([
            api.getProfileData(),
            api.getBalance(),
            api.getStatistics(),
            api.getAchievements()
        ]);

        // Отображаем данные
        displayProfileData(profile);
        displayBalanceData(balance);
        displayStatisticsData(statistics);
        displayAchievementsData(achievements);

    } catch (error) {
        console.error('Ошибка загрузки данных:', error);
        alert('❌ Ошибка загрузки данных профиля');
    }
}

// Функции отображения данных
function displayProfileData(profile) {
    document.getElementById('profileData').innerHTML = `
        <div class="user-info"><strong>ID:</strong> ${profile.id}</div>
        <div class="user-info"><strong>Никнейм:</strong> ${profile.username}</div>
        <div class="user-info"><strong>Клан:</strong> ${profile.clan}</div>
        <div class="user-info"><strong>Статус:</strong> <span class="premium-badge">${profile.status}</span></div>
        <div class="user-info"><strong>Дата регистрации:</strong> ${profile.registrationDate}</div>
        <div class="user-info"><strong>Последний вход:</strong> ${profile.lastLogin}</div>
    `;
}

function displayBalanceData(balance) {
    document.getElementById('balanceData').innerHTML = `
        <div class="user-info"><strong>Золото:</strong> ${balance.gold} 🪙</div>
        <div class="user-info"><strong>Серебро:</strong> ${balance.silver} ⚪</div>
        <div class="user-info"><strong>Премиум валюта:</strong> ${balance.premiumCurrency} 💎</div>
        <div class="user-info"><strong>Очки боевого пропуска:</strong> ${balance.battlePassPoints}</div>
        <div class="user-info"><strong>Премиум:</strong> ${balance.premiumDays} дней</div>
    `;
}

function displayStatisticsData(stats) {
    document.getElementById('statsData').innerHTML = `
        <div class="user-info"><strong>Всего боёв:</strong> ${stats.totalBattles}</div>
        <div class="user-info"><strong>Побед/Поражений:</strong> ${stats.wins}/${stats.losses}</div>
        <div class="user-info"><strong>Процент побед:</strong> ${stats.winRate}</div>
        <div class="user-info"><strong>Средний урон:</strong> ${stats.averageDamage}</div>
        <div class="user-info"><strong>Рейтинг:</strong> ${stats.rating}</div>
        <div class="user-info"><strong>Любимая техника:</strong> ${stats.favoriteVehicle}</div>
    `;
}

function displayAchievementsData(achievements) {
    document.getElementById('achievementsData').innerHTML = `
        <div class="achievements-grid">
            ${achievements.map(ach => `
                <div class="achievement-item">
                    <span class="achievement-icon">🏆</span>
                    <span class="achievement-text">${ach}</span>
                </div>
            `).join('')}
        </div>
    `;
}
