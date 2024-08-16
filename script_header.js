const themeSwitcher = document.getElementById('theme-switcher');
const hamburgerMenu = document.querySelector('.hamburger-menu');
const dropdown = document.querySelector('.dropdown');

themeSwitcher.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    themeSwitcher.textContent = document.body.classList.contains('dark-theme') ? '🌚' : '🌞';
});

hamburgerMenu.addEventListener('click', () => {
    dropdown.classList.toggle('active');
});