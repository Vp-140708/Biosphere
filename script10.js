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
document.addEventListener("DOMContentLoaded", function () {
    const leftArrow = document.querySelector(".left-arrow");
    const rightArrow = document.querySelector(".right-arrow");
    const blocksWrapper = document.querySelector(".blocks-wrapper");

    leftArrow.addEventListener("click", function () {
        blocksWrapper.scrollBy({
            left: -blocksWrapper.clientWidth,
            behavior: "smooth"
        });
    });

    rightArrow.addEventListener("click", function () {
        blocksWrapper.scrollBy({
            left: blocksWrapper.clientWidth,
            behavior: "smooth"
        });
    });
});


