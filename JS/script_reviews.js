document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM загружен");
  let users = JSON.parse(localStorage.getItem("users")) || [];
  let currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;

  // Проверяем, есть ли текущий пользователь
  if (currentUser) {
    document.getElementById("container").style.display = "none"; // Скрываем форму входа/регистрации
    document.getElementById("write-review-section").style.display = "block"; // Показываем секцию отзывов

    // Проверка на администратора для отображения кнопки удаления
    if (currentUser.isAdmin) {
      document.getElementById("delete-all-reviews").style.display = "block"; // Показываем кнопку удаления
    } else {
      document.getElementById("delete-all-reviews").style.display = "none"; // Скрываем кнопку удаления
    }

    // Инициализация lastReviewTime, если его нет
    if (!currentUser.lastReviewTime) {
      currentUser.lastReviewTime = 0; // или Date.now(); если хотите, чтобы пользователь мог писать сразу
      localStorage.setItem("currentUser", JSON.stringify(currentUser)); // Сохраняем обновленного пользователя
    }
  } else {
    // Перенаправление на страницу регистрации
    alert("Вы не зарегистрированы. Пожалуйста, зарегистрируйтесь.");
    window.location.href = "Register.html"; // Укажите правильный путь к странице регистрации
  }

  // Функция экранирования HTML
  function escapeHTML(html) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(html));
    return div.innerHTML;
  }

  // Функция для проверки времени, когда пользователь может оставить отзыв
  function canPostReview() {
    const currentTime = Date.now();
    return currentTime - currentUser.lastReviewTime >= 5 * 60 * 1000; // 5 минут
  }

  // Обработчик для кнопки отправки отзыва
  document.getElementById("send-review").addEventListener("click", function () {
    console.log("Попытка отправить отзыв");
      
    if (!currentUser.isAdmin && !canPostReview()) {
      alert("Вы можете оставить новый отзыв только через 5 минут.");
      console.log("Ошибка: Попытка отправить отзыв до завершения таймера");
      return;
    }

    const reviewText = document.getElementById("review-text").value;
    const ratingInput = document.querySelector('input[name="rating"]:checked');

    if (!reviewText || !ratingInput) {
      alert("Пожалуйста, введите текст отзыва и выберите рейтинг.");
      console.log("Ошибка: Текст отзыва или рейтинг отсутствуют");
      return;
    }

    const rating = ratingInput.value;
    const reviewData = {
      text: escapeHTML(reviewText),
      rating: rating,
      user: currentUser.name,
      userEmail: currentUser.email,
    };

    currentUser.lastReviewTime = Date.now(); // Обновление времени последнего отзыва
    localStorage.setItem("currentUser", JSON.stringify(currentUser)); // Сохраняем пользователя с обновленным временем
    displayReview(reviewData);
    saveReview(reviewData);
    console.log("Отзыв отправлен:", reviewData);
  });

  // Функция отображения отзыва
  function displayReview(reviewData) {
    const reviewItem = document.createElement("div");
    reviewItem.classList.add("review-card");
    reviewItem.innerHTML = `
      <div class="review-header">
        <strong>${escapeHTML(reviewData.user)}</strong> 
        <span>${"★".repeat(reviewData.rating)}${"☆".repeat(5 - reviewData.rating)}</span>
        ${
          currentUser && currentUser.isAdmin
            ? '<button class="delete-review">Удалить</button>'
            : currentUser && currentUser.email === reviewData.userEmail
            ? '<button class="delete-review">Удалить</button>'
            : ""
        }
      </div>
      <p>${escapeHTML(reviewData.text)}</p>`;
    document.getElementById("reviewsContainer").appendChild(reviewItem);

    console.log("Отзыв отображен на странице:", reviewData);

    // Добавляем возможность удаления отзыва
    reviewItem
      .querySelector(".delete-review")
      ?.addEventListener("click", function () {
        deleteReview(reviewData);
        reviewItem.remove();
        console.log("Отзыв удален:", reviewData);
      });
  }

  // Функция сохранения отзыва в localStorage
  function saveReview(reviewData) {
    let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
    reviews.push(reviewData);
    localStorage.setItem("reviews", JSON.stringify(reviews));
    console.log("Отзыв сохранен в localStorage:", reviews);
  }

  // Функция удаления конкретного отзыва
  function deleteReview(reviewData) {
    let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
    reviews = reviews.filter(
      (review) =>
        review.text !== reviewData.text ||
        review.rating !== reviewData.rating ||
        review.userEmail !== reviewData.userEmail
    );
    localStorage.setItem("reviews", JSON.stringify(reviews));
    console.log("Отзыв удален из localStorage:", reviewData);
  }

  // Обработчик для кнопки "Удалить все отзывы"
  document
    .getElementById("delete-all-reviews")
    .addEventListener("click", function () {
      if (currentUser && currentUser.isAdmin) {
        if (confirm("Вы уверены, что хотите удалить все отзывы?")) {
          localStorage.removeItem("reviews"); // Удаляем все отзывы из localStorage
          document.getElementById("reviewsContainer").innerHTML = ""; // Очищаем контейнер для отзывов
          alert("Все отзывы были удалены.");
          console.log("Все отзывы удалены.");
        }
      } else {
        alert("У вас нет прав для удаления всех отзывов.");
      }
    });

  // Функция загрузки отзывов при загрузке страницы
  function loadReviews() {
    const reviews = JSON.parse(localStorage.getItem("reviews")) || [];
    reviews.forEach(displayReview);
    console.log("Все отзывы загружены:", reviews);
  }

  loadReviews(); // Загружаем отзывы при загрузке страницы
});
