document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM загружен");

  let currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;
  let reviews = JSON.parse(localStorage.getItem("reviews")) || [];

  // Проверка текущего пользователя
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

  function displayReview(reviewData) {
    const reviewItem = document.createElement("div");
    reviewItem.classList.add("review-card");
    reviewItem.innerHTML = `
      <div class="review-header">
        <strong>${escapeHTML(reviewData.userName)}</strong> 
        <span>${"★".repeat(reviewData.rating)}${"☆".repeat(5 - reviewData.rating)}</span>
        ${(currentUser.isAdmin || currentUser.userId === reviewData.userId) ? `
          <button class="delete-review">Удалить</button>
          <button class="edit-review">Редактировать</button>` : ""}
      </div>
      <p class="review-text">${escapeHTML(reviewData.text)}</p>`;
    document.getElementById("reviewsContainer").appendChild(reviewItem);

    reviewItem.querySelector(".delete-review")?.addEventListener("click", function () {
      reviews = reviews.filter((r) => r.reviewId !== reviewData.reviewId);
      localStorage.setItem("reviews", JSON.stringify(reviews));
      reviewItem.remove();
    });

    reviewItem.querySelector(".edit-review")?.addEventListener("click", function () {
      const newText = prompt("Введите новый текст отзыва:", reviewData.text);
      if (newText) {
        reviewData.text = escapeHTML(newText);
        localStorage.setItem("reviews", JSON.stringify(reviews));
        reviewItem.querySelector(".review-text").textContent = reviewData.text;
        alert("Отзыв успешно обновлен!");
      }
    });
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

    document.getElementById("review-text").value = "";
    document.querySelector('input[name="rating"]:checked').checked = false;
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
