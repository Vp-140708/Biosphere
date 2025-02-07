function showNotification(message, duration = 3000) {
  // Если контейнер уведомлений ещё не существует – создаём его
  let container = document.getElementById('notification-container');
  if (!container) {
    container = document.createElement('div');
    container.id = "notification-container";
    document.body.appendChild(container);
  }

  // Создаём уведомление и задаём ему текст
  const notification = document.createElement('div');
  notification.className = "notification";
  notification.textContent = message;
  container.appendChild(notification);

  // Скрываем уведомление с анимацией через duration мс
  setTimeout(() => {
    notification.classList.add("fade-out");
    notification.addEventListener("transitionend", () => {
      notification.remove();
    });
  }, duration);
}

// ПЕРЕОПРЕДЕЛЯЕМ глобальную функцию alert, чтобы даже если в коде 
// используются alert, они отображались в виде кастомных уведомлений.
// Если вам важна блокировка (modal-like), можно вместо этого заменить вызовы alert вручную.
window.alert = showNotification; 