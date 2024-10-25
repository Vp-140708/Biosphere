document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM загружен");

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
      currentUser.lastReviewTime = 0;
      localStorage.setItem("currentUser", JSON.stringify(currentUser)); // Сохраняем обновленного пользователя
    }
  } else {
    // Перенаправление на страницу регистрации
    alert("Вы не зарегистрированы. Пожалуйста, зарегистрируйтесь.");
    window.location.href = "Register.html"; // Укажите правильный путь к странице регистрации
  }

  // Функция экранирования HTML
  function escapeHTML(html) {
    const div = document.createElement("div");
    div.appendChild(document.createTextNode(html));
    return div.innerHTML;
  }

  // Функция для проверки времени, когда пользователь может оставить отзыв
  function canPostReview() {
    const currentTime = Date.now();
    return currentTime - currentUser.lastReviewTime >= 5 * 60 * 1000; // 5 минут
  }

  // Обработчик для кнопки отправки отзыва
  document
    .getElementById("send-review")
    .addEventListener("click", async function () {
      console.log("Попытка отправить отзыв");

      if (!currentUser.isAdmin && !canPostReview()) {
        alert("Вы можете оставить новый отзыв только через 5 минут.");
        console.log("Ошибка: Попытка отправить отзыв до завершения таймера");
        return;
      }

      const reviewText = document.getElementById("review-text").value;
      const ratingInput = document.querySelector(
        'input[name="rating"]:checked'
      );

      if (!reviewText || !ratingInput) {
        alert("Пожалуйста, введите текст отзыва и выберите рейтинг.");
        console.log("Ошибка: Текст отзыва или рейтинг отсутствуют");
        return;
      }

      const reviewData = {
        text: escapeHTML(reviewText),
        rating: ratingInput.value,
        userId: currentUser._id, // Идентификатор пользователя для связи с отзывом
      };

      try {
        const response = await fetch('http://localhost:5000/api/reviews/add', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(reviewData),
      });

        if (response.ok) {
          const savedReview = await response.json();
          currentUser.lastReviewTime = Date.now(); // Обновление времени последнего отзыва
          localStorage.setItem("currentUser", JSON.stringify(currentUser)); // Сохраняем пользователя с обновленным временем
          displayReview(savedReview);
          console.log("Отзыв отправлен и сохранен в базе данных:", savedReview);
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
        <span>${"★".repeat(reviewData.rating)}${"☆".repeat(
      5 - reviewData.rating
    )}</span>
        ${
          currentUser &&
          (currentUser.isAdmin || currentUser._id === reviewData.user._id)
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
      ?.addEventListener("click", async function () {
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

  // Обработчик для кнопки "Удалить все отзывы"
  document
    .getElementById("delete-all-reviews")
    .addEventListener("click", async function () {
      if (currentUser && currentUser.isAdmin) {
        if (confirm("Вы уверены, что хотите удалить все отзывы?")) {
          try {
            const response = await fetch("/api/reviews/delete-all", {
              method: "DELETE",
            });

            if (response.ok) {
              document.getElementById("reviewsContainer").innerHTML = ""; // Очищаем контейнер для отзывов
              alert("Все отзывы были удалены.");
              console.log("Все отзывы удалены.");
            } else {
              throw new Error("Ошибка при удалении всех отзывов");
            }
          } catch (error) {
            console.error(error);
            alert("Ошибка при удалении всех отзывов.");
          }
        }
      } else {
        alert("У вас нет прав для удаления всех отзывов.");
      }
    });

  // Функция загрузки отзывов при загрузке страницы
  async function loadReviews() {
    try {
      const response = await fetch("http://localhost:5000/api/reviews");

      if (response.ok) {
        const reviews = await response.json();
        reviews.forEach(displayReview);
        console.log("Все отзывы загружены из базы данных:", reviews);
      } else {
        throw new Error("Ошибка при загрузке отзывов");
      }
    } catch (error) {
      console.error(error);
      alert("Ошибка при загрузке отзывов.!");
    }
  }

  loadReviews(); // Загружаем отзывы при загрузке страницы
});

document.addEventListener("DOMContentLoaded", function() {
  fetch("reviews_display.php")
  .then(response => {
      if (!response.ok) {
          throw new Error(`Ошибка загрузки: ${response.statusText}`);
      }
      return response.text();
  })
  .then(data => {
      document.getElementById("reviewsContainer").innerHTML = data;
  })
  .catch(error => console.error('Ошибка загрузки отзывов:', error));
});
