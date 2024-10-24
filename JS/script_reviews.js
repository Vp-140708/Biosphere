document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM загружен");
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;
  
    if (currentUser) {
      document.getElementById("container").style.display = "none"; // Скрываем форму входа/регистрации
      document.getElementById("write-review-section").style.display = "block"; // Показываем секцию отзывов
      document.getElementById("logout-btn").style.display = "block"; // Показываем кнопку выхода
    } else {
      document.getElementById("logout-btn").style.display = "none"; // Скрываем кнопку выхода
    }
  
    // Функция для регистрации пользователя
    function registerUser(name, email, password, isAdmin) {
      console.log("Функция регистрации вызвана");
      const existingUserByEmail = users.find((u) => u.email === email);
      const existingUserByName = users.find((u) => u.name === name);
  
      if (existingUserByEmail) {
        alert("Регистрация невозможна: почта уже существует.");
        return;
      }
  
      if (existingUserByName) {
        alert("Регистрация невозможна: имя уже существует.");
        return;
      }
  
      const user = { name, email, password, isAdmin, lastReviewTime: 0 };
      users.push(user);
      localStorage.setItem("users", JSON.stringify(users));
      currentUser = user;
      localStorage.setItem("currentUser", JSON.stringify(currentUser)); // Сохраняем текущего пользователя
      document.getElementById("container").style.display = "none";
      document.getElementById("logout-btn").style.display = "block";
      document.getElementById("write-review-section").style.display = "block";
      alert(`Регистрация успешна. Привет, ${name}!`);
    }
  
    // Функция для входа пользователя
    function loginUser(email, password) {
      console.log("Функция входа вызвана");
      users = JSON.parse(localStorage.getItem("users")) || [];
      const user = users.find(
        (u) => u.email === email && u.password === password
      );
      if (user) {
        currentUser = user;
        localStorage.setItem("currentUser", JSON.stringify(currentUser)); // Сохраняем текущего пользователя
        document.getElementById("container").style.display = "none";
        document.getElementById("logout-btn").style.display = "block";
        document.getElementById("write-review-section").style.display = "block";
        alert(`Привет, ${user.name}`);
      } else {
        alert("Неверный логин или пароль.");
      }
    }
  
    // Обработчики событий для кнопок
    document
      .getElementById("register-btn")
      .addEventListener("click", function (event) {
        event.preventDefault();
        const name = document.getElementById("register-name").value;
        const email = document.getElementById("register-email").value;
        const password = document.getElementById("register-password").value;
        const isAdmin = document.getElementById("register-admin").checked;
        registerUser(name, email, password, isAdmin);
      });
  
    document
      .getElementById("login-btn")
      .addEventListener("click", function (event) {
        event.preventDefault();
        const email = document.getElementById("login-email").value;
        const password = document.getElementById("login-password").value;
        loginUser(email, password);
      });
  
    // Обработчик для кнопки выхода
    document.getElementById("logout-btn").addEventListener("click", function () {
      currentUser = null;
      localStorage.removeItem("currentUser"); // Очищаем текущего пользователя
      document.getElementById("container").style.display = "block"; // Показываем форму входа/регистрации
      document.getElementById("write-review-section").style.display = "none"; // Скрываем секцию отзывов
      document.getElementById("logout-btn").style.display = "none";
    });
  
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
        text: reviewText,
        rating: rating,
        user: currentUser.name,
        userEmail: currentUser.email, // Добавляем email для идентификации
      };
      if (!currentUser.isAdmin) {
        currentUser.lastReviewTime = Date.now(); // Обновление времени последнего отзыва
      }
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
                  <strong>${reviewData.user}</strong> 
                  <span>${"★".repeat(reviewData.rating)}${"☆".repeat(
        5 - reviewData.rating
      )}</span>
                  ${currentUser.isAdmin ? '<button class="delete-review">Удалить</button>' : (currentUser.email === reviewData.userEmail ? '<button class="delete-review">Удалить</button>' : "")}
              </div>
              <p>${reviewData.text}</p>`;
      document.getElementById("reviewsContainer").appendChild(reviewItem);
      
      console.log("Отзыв отображен на странице:", reviewData);
  
      // Добавляем возможность удаления отзыва
      reviewItem.querySelector(".delete-review")?.addEventListener("click", function () {
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
          review.text !== reviewData.text || review.rating !== reviewData.rating || review.userEmail !== reviewData.userEmail
      );
      localStorage.setItem("reviews", JSON.stringify(reviews));
      console.log("Отзыв удален из localStorage:", reviewData);
    }
  
    // Функция загрузки отзывов при загрузке страницы
    function loadReviews() {
      const reviews = JSON.parse(localStorage.getItem("reviews")) || [];
      reviews.forEach(displayReview);
      console.log("Загруженные отзывы из localStorage:", reviews);
    }
  
    loadReviews(); // Загрузка отзывов при загрузке страницы
  });
  