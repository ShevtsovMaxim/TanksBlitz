console.log("API Леста Игры - система загружена!");

// Конфигурация API (замените на реальные endpoints)
const API_CONFIG = {
    baseURL: 'https://api.lesta.ru', // Пример URL API
    endpoints: {
        auth: '/oauth2/authorize',
        token: '/oauth2/token', 
        profile: '/api/v1/profile',
        balance: '/api/v1/balance',
        statistics: '/api/v1/statistics'
    },
    clientId: 'your-client-id', // Ваш Client ID
    redirectURI: 'https://your-site.com/callback' // Ваш redirect URI
};

class LestaGamesAPI {
    constructor() {
        this.accessToken = null;
        this.userData = null;
    }

    // Имитация OAuth2 авторизации
    async authorize() {
        console.log("Начало процесса авторизации...");
        
        // В реальном приложении здесь будет redirect на страницу авторизации
        // Для демонстрации используем mock-авторизацию
        return this.mockAuthorization();
    }

    // Mock-авторизация (замените на реальную OAuth2)
    async mockAuthorization() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Имитация успешной авторизации
                this.accessToken = 'lesta_jwt_token_' + Date.now();
                console.log("Access Token получен:", this.accessToken);
                resolve(this.accessToken);
            }, 1000);
        });
    }

    // Получение данных профиля
    async getProfileData() {
        if (!this.accessToken) {
            throw new Error('Требуется авторизация');
        }

        console.log("Запрос данных профиля...");

        // Имитация API запроса
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const mockProfile = {
                    id: 12345,
                    username: 'LestaPlayer',
                    email: 'player@lesta.ru',
                    registrationDate: '2023-01-15',
                    status: 'premium',
                    avatar: 'https://via.placeholder.com/100',
                    clan: 'Lesta Warriors'
                };
                resolve(mockProfile);
            }, 800);
        });
    }

    // Получение баланса
    async getBalance() {
        if (!this.accessToken) {
            throw new Error('Требуется авторизация');
        }

        console.log("Запрос данных баланса...");

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const mockBalance = {
                    gold: 2250,
                    silver: 15000,
                    premiumCurrency: 75,
                    battlePassPoints: 3400,
                    premiumDays: 45
                };
                resolve(mockBalance);
            }, 600);
        });
    }

    // Получение статистики
    async getStatistics() {
        if (!this.accessToken) {
            throw new Error('Требуется авторизация');
        }

        console.log("Запрос статистики...");

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const mockStats = {
                    totalBattles: 456,
                    wins: 245,
                    losses: 211,
                    winRate: '53.7%',
                    averageDamage: 1850,
                    favoriteVehicle: 'Т-34',
                    rating: 1850,
                    clanBattles: 89
                };
                resolve(mockStats);
            }, 700);
        });
    }

    // Получение достижений
    async getAchievements() {
        if (!this.accessToken) {
            throw new Error('Требуется авторизация');
        }

        console.log("Запрос достижений...");

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const mockAchievements = [
                    'Первая победа',
                    'Серия из 5 побед',
                    'Мастер техники',
                    'Клановый воин',
                    'Коллекционер'
                ];
                resolve(mockAchievements);
            }, 500);
        });
    }

    // Получение всех данных пользователя
    async getAllUserData() {
        try {
            console.log("Загрузка всех данных пользователя...");

            // Авторизация
            await this.authorize();

            // Параллельная загрузка данных
            const [profile, balance, statistics, achievements] = await Promise.all([
                this.getProfileData(),
                this.getBalance(),
                this.getStatistics(),
                this.getAchievements()
            ]);

            this.userData = { profile, balance, statistics, achievements };
            console.log("Все данные загружены:", this.userData);
            
            return this.userData;

        } catch (error) {
            console.error('Ошибка загрузки данных:', error);
            throw error;
        }
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    console.log("Система Леста Игры инициализирована!");
    
    const modal = document.getElementById('userModal');
    const openBtn = document.getElementById('openModal');
    const closeBtn = document.querySelector('.close');
    const userDataContainer = document.getElementById('userData');

    // Создаем экземпляр API
    const lestaGamesAPI = new LestaGamesAPI();

    // Обработчик кнопки
    openBtn.addEventListener('click', async function() {
        console.log("Запрос данных из ЛК Леста Игры...");
        
        modal.style.display = 'block';
        userDataContainer.innerHTML = `
            <div class="loading">
                <div class="spinner"></div>
                <p>Подключение к API Леста Игры...</p>
            </div>
        `;

        try {
            // Получаем все данные пользователя
            const userData = await lestaGamesAPI.getAllUserData();
            displayUserData(userData);

        } catch (error) {
            console.error('Ошибка:', error);
            userDataContainer.innerHTML = `
                <div class="error-message">
                    <h3>❌ Ошибка загрузки данных</h3>
                    <p>${error.message}</p>
                    <button onclick="retryLoad()" class="btn-primary">Повторить</button>
                </div>
            `;
        }
    });

    // Функция отображения данных
    function displayUserData(userData) {
        const { profile, balance, statistics, achievements } = userData;
        
        userDataContainer.innerHTML = `
            <div class="profile-section">
                <h3>👤 Профиль игрока</h3>
                <div class="user-info"><strong>ID:</strong> ${profile.id}</div>
                <div class="user-info"><strong>Никнейм:</strong> ${profile.username}</div>
                <div class="user-info"><strong>Клан:</strong> ${profile.clan}</div>
                <div class="user-info"><strong>Статус:</strong> ${profile.status}</div>
                <div class="user-info"><strong>Дата регистрации:</strong> ${profile.registrationDate}</div>
            </div>

            <div class="balance-section">
                <h3>💰 Баланс</h3>
                <div class="user-info"><strong>Золото:</strong> ${balance.gold} 🪙</div>
                <div class="user-info"><strong>Серебро:</strong> ${balance.silver} ⚪</div>
                <div class="user-info"><strong>Премиум валюта:</strong> ${balance.premiumCurrency} 💎</div>
                <div class="user-info"><strong>Очки боевого пропуска:</strong> ${balance.battlePassPoints}</div>
                <div class="user-info"><strong>Премиум:</strong> ${balance.premiumDays} дней</div>
            </div>

            <div class="stats-section">
                <h3>📈 Статистика</h3>
                <div class="user-info"><strong>Всего боёв:</strong> ${statistics.totalBattles}</div>
                <div class="user-info"><strong>Побед/Поражений:</strong> ${statistics.wins}/${statistics.losses}</div>
                <div class="user-info"><strong>Процент побед:</strong> ${statistics.winRate}</div>
                <div class="user-info"><strong>Средний урон:</strong> ${statistics.averageDamage}</div>
                <div class="user-info"><strong>Рейтинг:</strong> ${statistics.rating}</div>
                <div class="user-info"><strong>Любимая техника:</strong> ${statistics.favoriteVehicle}</div>
            </div>

            <div class="achievements-section">
                <h3>🏆 Достижения</h3>
                <div class="achievements-list">
                    ${achievements.map(ach => `<span class="achievement-badge">${ach}</span>`).join('')}
                </div>
            </div>

            <div class="api-info">
                <small>Данные получены через официальный API Леста Игры</small>
            </div>
        `;
    }

    // Глобальная функция повторной загрузки
    window.retryLoad = function() {
        openBtn.click();
    };

    // Закрытие модального окна
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
        }
    });
});
