document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM загружен");

  let currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;
  let reviews = JSON.parse(localStorage.getItem("reviews")) || [];

  // Если у текущего пользователя нет userId, назначаем email как идентификатор (или можно использовать Date.now())
  if (currentUser && !currentUser.userId) {
    currentUser.userId = currentUser.email;
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
  }

  if (currentUser) {
    document.getElementById("container").style.display = "none";
    document.getElementById("write-review-section").style.display = "block";

    if (currentUser.isAdmin) {
      document.getElementById("delete-all-reviews").style.display = "block";
    }

    if (!currentUser.lastReviewTime) {
      currentUser.lastReviewTime = 0;
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    }
  } else {
    alert("Вы не зарегистрированы. Пожалуйста, зарегистрируйтесь.");
    window.location.href = "Register.html";
    return;
  }

  function escapeHTML(html) {
    const div = document.createElement("div");
    div.appendChild(document.createTextNode(html));
    return div.innerHTML;
  }

  function canPostReview() {
    const currentTime = Date.now();
    return currentTime - currentUser.lastReviewTime >= 5 * 60 * 1000;
  }

  // Функция проверки: имеет ли текущий пользователь права на удаление/редактирование данного отзыва
  function canEditDelete(reviewData) {
    if (currentUser.isAdmin) return true;
    // Если у отзыва указан userId, сравниваем их; иначе – сравниваем имена
    if (reviewData.userId) {
      return currentUser.userId === reviewData.userId;
    } else {
      return currentUser.name === reviewData.userName;
    }
  }

  function displayReview(reviewData) {
    const reviewItem = document.createElement("div");
    reviewItem.classList.add("review-card");

    let buttonsHTML = "";
    if (canEditDelete(reviewData)) {
      buttonsHTML = `<button class="delete-review">Удалить</button>
                     <button class="edit-review">Редактировать</button>`;
    }

    reviewItem.innerHTML = `
      <div class="review-header">
        <strong>${escapeHTML(reviewData.userName)}</strong>
        <span>${"★".repeat(reviewData.rating)}${"☆".repeat(5 - reviewData.rating)}</span>
        ${buttonsHTML}
      </div>
      <p class="review-text">${escapeHTML(reviewData.text)}</p>`;
    document.getElementById("reviewsContainer").appendChild(reviewItem);

    if (canEditDelete(reviewData)) {
      const deleteBtn = reviewItem.querySelector(".delete-review");
      if (deleteBtn) {
        deleteBtn.addEventListener("click", function () {
          reviews = reviews.filter((r) => r.reviewId !== reviewData.reviewId);
          localStorage.setItem("reviews", JSON.stringify(reviews));
          reviewItem.remove();
        });
      }

      const editBtn = reviewItem.querySelector(".edit-review");
      if (editBtn) {
        editBtn.addEventListener("click", function () {
          const newText = prompt("Введите новый текст отзыва:", reviewData.text);
          if (newText) {
            reviewData.text = escapeHTML(newText);
            localStorage.setItem("reviews", JSON.stringify(reviews));
            reviewItem.querySelector(".review-text").textContent = reviewData.text;
            alert("Отзыв успешно обновлен!");
          }
        });
      }
    }
  }

  function loadReviews() {
    document.getElementById("reviewsContainer").innerHTML = "";
    reviews.forEach(displayReview);
  }

  document.getElementById("send-review").addEventListener("click", function () {
    console.log("Попытка отправить отзыв");

    if (!currentUser.isAdmin && !canPostReview()) {
      alert("Вы можете оставить новый отзыв только через 5 минут.");
      return;
    }

    const reviewTextElem = document.getElementById("review-text");
    const ratingInput = document.querySelector('input[name="rating"]:checked');

    if (!reviewTextElem.value || !ratingInput) {
      alert("Пожалуйста, введите текст отзыва и выберите рейтинг.");
      return;
    }

    // Создаем отзыв – обязательно сохраняем userId
    const reviewData = {
      reviewId: Date.now(),
      text: escapeHTML(reviewTextElem.value),
      rating: Number(ratingInput.value),
      userId: currentUser.userId,
      userName: currentUser.name,
    };

    reviews.push(reviewData);
    localStorage.setItem("reviews", JSON.stringify(reviews));
    currentUser.lastReviewTime = Date.now();
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    displayReview(reviewData);

    reviewTextElem.value = "";
    const checkedRating = document.querySelector('input[name="rating"]:checked');
    if (checkedRating) {
      checkedRating.checked = false;
    }
    alert("Отзыв успешно добавлен!");
  });

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

  // Фильтрация по рейтингу
  document.getElementById("filter-rating").addEventListener("change", function () {
    const ratingFilter = Number(this.value);
    document.getElementById("reviewsContainer").innerHTML = "";
    reviews
      .filter((review) => review.rating === ratingFilter || ratingFilter === 0)
      .forEach(displayReview);
  });

  // Поиск по тексту
  document.getElementById("search-reviews").addEventListener("input", function () {
    const searchText = this.value.toLowerCase();
    document.getElementById("reviewsContainer").innerHTML = "";
    reviews
      .filter((review) => review.text.toLowerCase().includes(searchText))
      .forEach(displayReview);
  });

  loadReviews();
});
