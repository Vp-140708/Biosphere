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

// Логика выбора звезд
const stars = document.querySelectorAll('.star');
let selectedRating = 0;

stars.forEach(star => {
  // Наведение на звезду (подсвечиваем до текущей звезды)
  star.addEventListener('mouseover', () => {
    resetStars();
    highlightStars(star.getAttribute('data-value'));
  });

  // Убираем наведение (возвращаем предыдущий выбор)
  star.addEventListener('mouseout', () => {
    if (selectedRating === 0) {
      resetStars();
    } else {
      highlightStars(selectedRating);
    }
  });

  // Клик на звезду (фиксируем выбор)
  star.addEventListener('click', () => {
    selectedRating = star.getAttribute('data-value');
    highlightStars(selectedRating);
  });
});

// Функция для подсветки звезд до текущей (слева от текущей)
function highlightStars(rating) {
  stars.forEach(star => {
    if (star.getAttribute('data-value') <= rating) {
      star.classList.add('selected');
    } else {
      star.classList.remove('selected');
    }
  });
}

// Сброс звёзд
function resetStars() {
  stars.forEach(star => {
    star.classList.remove('selected');
  });
}

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
