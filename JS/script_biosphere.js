document.addEventListener("DOMContentLoaded", function () {
    const faqBlocks = document.querySelectorAll(".faq-block");

    faqBlocks.forEach(block => {
        block.addEventListener("click", function () {
            this.classList.toggle("active");
            const answer = this.querySelector(".faq-answer");
            if (this.classList.contains("active")) {
                answer.style.maxHeight = answer.scrollHeight + "px";
            } else {
                answer.style.maxHeight = null;
            }
        });
    });
});

// Переключение темы
const themeSwitcher = document.getElementById('theme-switcher');

// Применяем сохранённую тему при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.classList.add(savedTheme);
        themeSwitcher.textContent = savedTheme === 'dark-theme' ? '🌚' : '🌞';
    }
});

themeSwitcher.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    const currentTheme = document.body.classList.contains('dark-theme') ? 'dark-theme' : 'light-theme';
    themeSwitcher.textContent = currentTheme === 'dark-theme' ? '🌚' : '🌞';
    localStorage.setItem('theme', currentTheme);
});

const blocksWrapper = document.querySelector(".blocks-wrapper");
const blocks = document.querySelectorAll(".block-item");
const dots = document.querySelectorAll('.dot');
let currentIndex = 0;
let touchStartX = 0;
let touchEndX = 0;
const threshold = 75;

// Обновляем индикаторы точек
function updateDots(index) {
    dots.forEach((dot, i) => {
        if (i === index) {
            dot.style.backgroundColor = '#000'; // Активная точка
            dot.style.transform = 'scale(1.3)';
        } else {
            dot.style.backgroundColor = '#ccc'; // Неактивные точки
            dot.style.transform = 'scale(1)';
        }
    });
}

// Функция для перехода на следующий/предыдущий блок
function goToSlide(index) {
    // Зацикливание
    if (index < 0) {
        currentIndex = blocks.length - 1;
    } else if (index >= blocks.length) {
        currentIndex = 0;
    } else {
        currentIndex = index;
    }

    blocksWrapper.scrollTo({
        left: blocks[currentIndex].offsetLeft - 10,
        behavior: "smooth"
    });

    updateDots(currentIndex); // Обновляем индикаторы
}

// Логика для свайпа
blocksWrapper.addEventListener("touchstart", function (event) {
    touchStartX = event.changedTouches[0].screenX;
});

blocksWrapper.addEventListener("touchmove", function (event) {
    touchEndX = event.changedTouches[0].screenX;
});

blocksWrapper.addEventListener("touchend", function () {
    const swipeDistance = touchEndX - touchStartX;

    if (Math.abs(swipeDistance) > threshold) {
        if (swipeDistance > 0) {
            goToSlide(currentIndex - 1);
        } else {
            goToSlide(currentIndex + 1);
        }
    }
});

// Первоначальная установка точек
updateDots(currentIndex);

// Хамбургер-меню
const hamburgerMenu = document.querySelector('.hamburger-menu');
const dropdown = document.querySelector('.dropdown');

hamburgerMenu.addEventListener('click', () => {
    dropdown.classList.toggle('active');
});

