document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM загружен'); // Проверка, что DOM загружен

    let users = JSON.parse(localStorage.getItem('users')) || [];
    let currentUser = null;

    // Функция для регистрации пользователя
    function registerUser(name, email, password, isAdmin) {
        console.log('Функция регистрации вызвана');
        const user = { name, email, password, isAdmin, lastReviewTime: 0 };
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
        currentUser = user;
        console.log('Пользователь зарегистрирован:', user);

        // Скрыть контейнер регистрации после успешной регистрации
        document.getElementById('container').style.display = 'none';
        alert(`Регистрация успешна. Привет, ${name}!`);
    }

    // Функция для входа пользователя
    function loginUser(email, password) {
        console.log('Функция входа вызвана');
        users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
            currentUser = user;
            document.getElementById('container').style.display = 'none';
            console.log('Пользователь вошел:', user);
            alert(`Привет, ${user.name}`);
        } else {
            console.log('Ошибка: Неверный логин или пароль');
            alert('Неверный логин или пароль.');
        }
    }

    // Проверка, может ли пользователь отправить новый отзыв (каждые 5 минут)
    function canPostReview() {
        console.log('Проверка возможности отправки отзыва');
        const now = Date.now();
        return currentUser && (now - currentUser.lastReviewTime >= 5 * 60 * 1000); // 5 минут
    }

    // Обработчик для кнопки регистрации
    document.getElementById('register-btn').addEventListener('click', function() {
        console.log('Кнопка регистрации нажата');
        const name = document.getElementById('register-name').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        const isAdmin = document.getElementById('register-admin').checked;
        registerUser(name, email, password, isAdmin);
    });

    // Обработчик для кнопки входа
    document.getElementById('login-btn').addEventListener('click', function() {
        console.log('Кнопка входа нажата');
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        loginUser(email, password);
    });

    // Обработчик для кнопки отправки отзыва
    document.getElementById('send-review').addEventListener('click', function() {
        console.log('Попытка отправить отзыв');
        if (!canPostReview()) {
            alert('Вы можете оставить новый отзыв только через 5 минут.');
            console.log('Ошибка: Попытка отправить отзыв до завершения таймера');
            return;
        }
        const reviewText = document.getElementById('review-text').value;
        const ratingInput = document.querySelector('input[name="rating"]:checked');

        if (!reviewText || !ratingInput) {
            alert('Пожалуйста, введите текст отзыва и выберите рейтинг.');
            console.log('Ошибка: Текст отзыва или рейтинг отсутствуют');
            return;
        }

        const rating = ratingInput.value;
        const reviewData = {
            text: reviewText,
            rating: rating,
            user: currentUser.name
        };
        currentUser.lastReviewTime = Date.now(); // Обновление времени последнего отзыва
        displayReview(reviewData);
        saveReview(reviewData);
        console.log('Отзыв отправлен:', reviewData);
    });

    // Функция отображения отзыва
    function displayReview(reviewData) {
        const reviewItem = document.createElement('div');
        reviewItem.classList.add('review-card');
        reviewItem.innerHTML = `
            <div class="review-header">
                <strong>${reviewData.user}</strong> 
                <span>${'★'.repeat(reviewData.rating)}${'☆'.repeat(5 - reviewData.rating)}</span>
                ${currentUser.isAdmin ? '<button class="delete-review">Удалить</button>' : ''}
            </div>
            <p>${reviewData.text}</p>`;
        document.getElementById('reviewsContainer').appendChild(reviewItem);

        console.log('Отзыв отображен на странице:', reviewData);

        // Добавляем возможность удаления отзыва для администратора
        if (currentUser.isAdmin) {
            reviewItem.querySelector('.delete-review').addEventListener('click', function() {
                deleteReview(reviewData);
                reviewItem.remove();
                console.log('Отзыв удален администратором:', reviewData);
            });
        }
    }

    // Функция сохранения отзыва в localStorage
    function saveReview(reviewData) {
        let reviews = JSON.parse(localStorage.getItem('reviews')) || [];
        reviews.push(reviewData);
        localStorage.setItem('reviews', JSON.stringify(reviews));
        console.log('Отзыв сохранен в localStorage:', reviews);
    }

    // Функция удаления конкретного отзыва
    function deleteReview(reviewData) {
        let reviews = JSON.parse(localStorage.getItem('reviews')) || [];
        reviews = reviews.filter(review => review.text !== reviewData.text || review.rating !== reviewData.rating);
        localStorage.setItem('reviews', JSON.stringify(reviews));
        console.log('Отзыв удален из localStorage:', reviewData);
    }

    // Функция загрузки отзывов при загрузке страницы
    function loadReviews() {
        const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
        reviews.forEach(displayReview);
        console.log('Загруженные отзывы из localStorage:', reviews);
    }

    loadReviews(); // Загрузка отзывов при загрузке страницы
});
