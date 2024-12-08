document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM загружен");

  let currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;
  let reviews = JSON.parse(localStorage.getItem("reviews")) || [];

  // Проверка текущего пользователя
  if (currentUser) {
    document.getElementById("container").style.display = "none"; // Скрываем форму входа/регистрации
    document.getElementById("write-review-section").style.display = "block"; // Показываем секцию отзывов

    if (currentUser.isAdmin) {
      document.getElementById("delete-all-reviews").style.display = "block"; // Показываем кнопку удаления
    }

    if (!currentUser.lastReviewTime) {
      currentUser.lastReviewTime = 0;
      localStorage.setItem("currentUser", JSON.stringify(currentUser)); // Сохраняем обновленного пользователя
    }
  } else {
    alert("Вы не зарегистрированы. Пожалуйста, зарегистрируйтесь.");
    window.location.href = "Register.html"; // Путь к странице регистрации
  }

  // Функция экранирования HTML
  function escapeHTML(html) {
    const div = document.createElement("div");
    div.appendChild(document.createTextNode(html));
    return div.innerHTML;
  }

  // Функция проверки времени для нового отзыва
  function canPostReview() {
    const currentTime = Date.now();
    return currentTime - currentUser.lastReviewTime >= 5 * 60 * 1000; // 5 минут
  }

  // Функция отображения отзыва
  function displayReview(reviewData) {
    const reviewItem = document.createElement("div");
    reviewItem.classList.add("review-card");
    reviewItem.innerHTML = `
      <div class="review-header">
        <strong>${escapeHTML(reviewData.userName)}</strong> 
        <span>${"★".repeat(reviewData.rating)}${"☆".repeat(5 - reviewData.rating)}</span>
        ${(currentUser.isAdmin || currentUser.userId === reviewData.userId) ? '<button class="delete-review">Удалить</button>' : ""}
      </div>
      <p>${escapeHTML(reviewData.text)}</p>`;
    document.getElementById("reviewsContainer").appendChild(reviewItem);

    reviewItem.querySelector(".delete-review")?.addEventListener("click", function () {
      reviews = reviews.filter((r) => r.reviewId !== reviewData.reviewId);
      localStorage.setItem("reviews", JSON.stringify(reviews));
      reviewItem.remove();
    });
  }

  // Функция загрузки отзывов
  function loadReviews() {
    document.getElementById("reviewsContainer").innerHTML = "";
    reviews.forEach(displayReview);
  }

  // Обработчик для отправки отзыва
  document.getElementById("send-review").addEventListener("click", function () {
    console.log("Попытка отправить отзыв");

    if (!currentUser.isAdmin && !canPostReview()) {
      alert("Вы можете оставить новый отзыв только через 5 минут.");
      return;
    }

    const reviewText = document.getElementById("review-text").value;
    const ratingInput = document.querySelector('input[name="rating"]:checked');

    if (!reviewText || !ratingInput) {
      alert("Пожалуйста, введите текст отзыва и выберите рейтинг.");
      return;
    }

    const reviewData = {
      reviewId: Date.now(),
      text: escapeHTML(reviewText),
      rating: Number(ratingInput.value),
      userId: currentUser.userId,
      userName: currentUser.name,
    };

    reviews.push(reviewData);
    localStorage.setItem("reviews", JSON.stringify(reviews));
    currentUser.lastReviewTime = Date.now();
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    displayReview(reviewData);

    document.getElementById("review-text").value = ""; // Очистка текстового поля
    document.querySelector('input[name="rating"]:checked').checked = false; // Сброс выбора рейтинга
    alert("Отзыв успешно добавлен!");
  });

  // Обработчик для удаления всех отзывов
  document.getElementById("delete-all-reviews").addEventListener("click", function () {
    if (currentUser.isAdmin && confirm("Вы уверены, что хотите удалить все отзывы?")) {
      reviews = [];
      localStorage.setItem("reviews", JSON.stringify(reviews));
      document.getElementById("reviewsContainer").innerHTML = "";
      alert("Все отзывы были удалены.");
    } else {
      alert("У вас нет прав для удаления всех отзывов.");
    }
  });

  // Загрузка отзывов при загрузке страницы
  loadReviews();
});
