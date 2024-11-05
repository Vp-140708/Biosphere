document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM загружен");

  let currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;

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

  // Обработчик для отправки отзыва
  document.getElementById("send-review").addEventListener("click", async function () {
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
      text: escapeHTML(reviewText),
      rating: ratingInput.value,
      userId: currentUser._id,
    };

    try {
      const response = await fetch("http://localhost:5000/api/reviews/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewData),
      });

      if (response.ok) {
        const savedReview = await response.json();
        currentUser.lastReviewTime = Date.now(); 
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        displayReview(savedReview);
        console.log("Отзыв отправлен и сохранен:", savedReview);
      } else {
        throw new Error("Ошибка при добавлении отзыва");
      }
    } catch (error) {
      console.error(error);
      alert("Ошибка при отправке отзыва.");
    }
  });

  // Функция отображения отзыва
  function displayReview(reviewData) {
    const reviewItem = document.createElement("div");
    reviewItem.classList.add("review-card");
    reviewItem.innerHTML = `
      <div class="review-header">
        <strong>${escapeHTML(reviewData.user.name)}</strong> 
        <span>${"★".repeat(reviewData.rating)}${"☆".repeat(5 - reviewData.rating)}</span>
        ${(currentUser.isAdmin || currentUser._id === reviewData.user._id) ? '<button class="delete-review">Удалить</button>' : ""}
      </div>
      <p>${escapeHTML(reviewData.text)}</p>`;
    document.getElementById("reviewsContainer").appendChild(reviewItem);

    reviewItem.querySelector(".delete-review")?.addEventListener("click", async function () {
      try {
        const response = await fetch(`/api/reviews/${reviewData._id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          reviewItem.remove();
          console.log("Отзыв удален:", reviewData);
        } else {
          throw new Error("Ошибка при удалении отзыва");
        }
      } catch (error) {
        console.error(error);
        alert("Ошибка при удалении отзыва.");
      }
    });
  }

  // Обработчик для удаления всех отзывов
  document.getElementById("delete-all-reviews").addEventListener("click", async function () {
    if (currentUser.isAdmin && confirm("Вы уверены, что хотите удалить все отзывы?")) {
      try {
        const response = await fetch("/api/reviews/delete-all", {
          method: "DELETE",
        });

        if (response.ok) {
          document.getElementById("reviewsContainer").innerHTML = "";
          alert("Все отзывы были удалены.");
        } else {
          throw new Error("Ошибка при удалении всех отзывов");
        }
      } catch (error) {
        console.error(error);
        alert("Ошибка при удалении всех отзывов.");
      }
    } else {
      alert("У вас нет прав для удаления всех отзывов.");
    }
  });

  // Функция загрузки отзывов при загрузке страницы
  async function loadReviews() {
    try {
      const response = await fetch('fetch_reviews.php');
      const reviews = await response.json();
      const reviewsContainer = document.getElementById('reviewsContainer');
      reviewsContainer.innerHTML = '';

      reviews.forEach(review => {
        const reviewElement = document.createElement('div');
        reviewElement.classList.add('review');
        reviewElement.innerHTML = `
          <p><strong>${review.name}</strong> (Оценка: ${review.rating}/5)</p>
          <p>${review.review_text}</p>
          <p><em>${review.created_at}</em></p>`;
        reviewsContainer.appendChild(reviewElement);
      });
    } catch (error) {
      console.error('Ошибка при загрузке отзывов:', error);
    }
  }

  // Загрузка отзывов при загрузке страницы
  loadReviews();
});
