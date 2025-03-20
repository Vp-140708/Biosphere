function showNotification(message, duration = 3000) {
  
  let container = document.getElementById('notification-container');
  if (!container) {
    container = document.createElement('div');
    container.id = "notification-container";
    document.body.appendChild(container);
  }

  
  const notification = document.createElement('div');
  notification.className = "notification";
  notification.textContent = message;
  container.appendChild(notification);

  
  setTimeout(() => {
    notification.classList.add("fade-out");
    notification.addEventListener("transitionend", () => {
      notification.remove();
    });
  }, duration);
}

window.alert = showNotification; 