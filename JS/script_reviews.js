    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault();
        alert('...');
    });
    document.querySelector('.register-button').addEventListener('click', () => {
        document.querySelector('.register-section').classList.add('transition-out');
        document.querySelector('.login-section').classList.add('transition-in');
    });

    const loadMoreBtn = document.querySelector('.load-more-btn');
    const reviews = document.querySelectorAll('.review-card');
    let reviewsToShow = 6;
    
    function hideExtraReviews() {
        if (reviews.length > reviewsToShow) {
            loadMoreBtn.style.display = 'block';
            reviews.forEach((review, index) => {
                if (index >= reviewsToShow) {
                    review.style.display = 'none';
                }
            });
        } else {
            loadMoreBtn.style.display = 'none'; 
        }
    }
    
    loadMoreBtn.addEventListener('click', () => {
        reviews.forEach(review => {
            review.style.display = 'block';
        });
        loadMoreBtn.style.display = 'none';
    });

    hideExtraReviews();
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');
    
    signUpButton.addEventListener('click', () => {
        container.classList.add("right-panel-active");
    });
    
    signInButton.addEventListener('click', () => {
        container.classList.remove("right-panel-active");
    });

// После успешной регистрации или входа скрыть формы и показать блок отзыва
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    // Эмуляция успешного входа
    document.getElementById('register').style.display = 'none';
    document.getElementById('log').style.display = 'none';
    document.getElementById('write-review').style.display = 'block';
});
// Отправка отзыва
document.getElementById('review-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const reviewText = document.getElementById('review-text').value;

    // Проверка рейтинга
    if (selectedRating === 0) {
      alert('Пожалуйста, выберите рейтинг.');
      return;
    }

    // Обработка отправки отзыва
    alert(`Ваша оценка: ${selectedRating} звёзд. Спасибо за отзыв!`);

    // Очистка формы
    document.getElementById('review-text').value = '';
    selectedRating = 0;
    resetStars(); // Сброс рейтинга
});
