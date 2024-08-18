const themeSwitcher = document.getElementById('theme-switcher');

// Check and apply the stored theme on page load
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

document.getElementById('searchInput').addEventListener('input', function() {
    const searchValue = this.value.toLowerCase();
    const specialists = document.querySelectorAll('.specialist-block');

    specialists.forEach(function(specialist) {
        const name = specialist.querySelector('.specialist-name').textContent.toLowerCase();
        const description = specialist.querySelector('.specialist-description').textContent.toLowerCase();

        if (name.includes(searchValue) || description.includes(searchValue)) {
            specialist.style.display = 'block';
        } else {
            specialist.style.display = 'none';
        }
    });
});