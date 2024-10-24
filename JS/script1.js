const themeSwitcher = document.getElementById('theme-switcher');

document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.classList.add(savedTheme);
        themeSwitcher.textContent = savedTheme === 'dark-theme' ? '🌚' : '🌞';
    }
});

themeSwitcher.addEventListener('click', () => {
    const currentTheme = document.body.classList.toggle('dark-theme') ? 'dark-theme' : '';
    themeSwitcher.textContent = currentTheme === 'dark-theme' ? '🌚' : '🌞';
    localStorage.setItem('theme', currentTheme);
});

const hamburgerMenu = document.querySelector('.hamburger-menu');
const dropdown = document.querySelector('.dropdown');

hamburgerMenu.addEventListener('click', () => {
    dropdown.classList.toggle('active');
});

