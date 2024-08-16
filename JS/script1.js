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
