document.addEventListener('DOMContentLoaded', function() {
    const sendReviewButton = document.getElementById('send-review');
    const reviewsContainer = document.getElementById('reviewsContainer');

    if (sendReviewButton) {
        sendReviewButton.addEventListener('click', function() {
            const reviewText = document.getElementById('review-text').value;
            const ratingInput = document.querySelector('input[name="rating"]:checked');

            // Проверка на наличие текста отзыва и рейтинга
            if (!reviewText || !ratingInput) {
                alert('Пожалуйста, введите текст отзыва и выберите рейтинг.');
                console.error('Ошибка: Текст отзыва или рейтинг отсутствуют.');
                return;
            }

            const rating = ratingInput.value;
            const reviewData = {
                text: reviewText,
                rating: rating
            };

            // Сохранение отзыва в localStorage для проверки
            saveReview(reviewData);

            // Вывод отзыва на странице
            displayReview(reviewData);

            // Очистка формы
            clearForm();

            console.log('Отзыв успешно отправлен:', reviewData);
        });
    } else {
        console.error('Ошибка: Кнопка отправки отзыва не найдена.');
    }

    // Функция для сохранения отзыва в localStorage
    function saveReview(reviewData) {
        let reviews = JSON.parse(localStorage.getItem('reviews')) || [];
        reviews.push(reviewData);
        localStorage.setItem('reviews', JSON.stringify(reviews));
        console.log('Отзыв сохранен в localStorage:', reviews);
    }

    // Функция для отображения отзыва на странице
    function displayReview(reviewData) {
        const reviewItem = document.createElement('div');
        reviewItem.classList.add('review-card');
        reviewItem.innerHTML = `
            <div class="review-header">
                <strong>Аноним</strong> <span>${'★'.repeat(reviewData.rating)}${'☆'.repeat(5 - reviewData.rating)}</span>
            </div>
            <p>${reviewData.text}</p>`;
        reviewsContainer.appendChild(reviewItem);
        console.log('Отзыв отображен на странице:', reviewData);
    }

    // Функция для очистки формы после отправки
    function clearForm() {
        document.getElementById('review-text').value = '';
        const checkedRating = document.querySelector('input[name="rating"]:checked');
        if (checkedRating) {
            checkedRating.checked = false;
        }
        console.log('Форма очищена.');
    }

    // Загрузка отзывов при загрузке страницы
    loadReviews();

    // Функция для загрузки отзывов из localStorage
    function loadReviews() {
        const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
        reviewsContainer.innerHTML = '';
        reviews.forEach(displayReview);
        console.log('Загруженные отзывы из localStorage:', reviews);
    }
});
