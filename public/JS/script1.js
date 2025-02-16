const themeToggleButton = document.getElementById("theme-switcher");

document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    document.body.classList.add(savedTheme);
    themeToggleButton.textContent = savedTheme === "dark-theme" ? "🌚" : "🌞";
  }
});

themeToggleButton.addEventListener("click", () => {
  const currentTheme = document.body.classList.toggle("dark-theme")
    ? "dark-theme"
    : "";
  themeToggleButton.textContent = currentTheme === "dark-theme" ? "🌚" : "🌞";
  localStorage.setItem("theme", currentTheme);
});

const menuButton = document.querySelector(".hamburger-menu");
const dropdown = document.querySelector(".dropdown");

menuButton.addEventListener("click", () => {
  dropdown.classList.toggle("active");
});

const logoutBtn = document.getElementById("logout-btnн");
if (logoutBtn) {
  logoutBtn.style.display = localStorage.getItem("currentUser") === null ? "none" : "block";

  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("currentUser");
    logoutBtn.style.display = "none";
  });
}
