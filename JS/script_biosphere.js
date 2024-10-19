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

const themeSwitcher = document.getElementById('theme-switcher');
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
const threshold = 500;


function goToSlide(index) {
 
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

    updateDots(currentIndex);
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

updateDots(currentIndex);

const hamburgerMenu = document.querySelector('.hamburger-menu');
const dropdown = document.querySelector('.dropdown');

hamburgerMenu.addEventListener('click', () => {
    dropdown.classList.toggle('active');
});

const slides = document.querySelector('.slides');
let currentSlide = 0;
const totalSlides = document.querySelectorAll('.slide').length;
const slideInterval = 8000;

document.addEventListener("DOMContentLoaded", function () {
    // Получаем все слайды, точки и обертку слайдов
    const slides = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".dot_sl");
    const slidesWrapper = document.querySelector(".slides");
    let currentIndex = 0;
    const totalSlides = slides.length;

    // Функция для показа слайда по индексу
    function showSlide(index) {
        if (index >= totalSlides) {
            currentIndex = 0; // Переход к первому слайду
        } else if (index < 0) {
            currentIndex = totalSlides - 1; // Переход к последнему слайду
        } else {
            currentIndex = index; // Установка текущего слайда
        }

        // Смещение слайдов
        slidesWrapper.style.transform = `translateX(${-currentIndex * 100}%)`;

        // Обновление активных точек
        updateDots(currentIndex);
    }

    // Функция для обновления состояния точек
    function updateDots(index) {
        dots.forEach((dot, i) => {
            if (i === index) {
                dot.classList.add("active");
            } else {
                dot.classList.remove("active");
            }
        });
    }

    // Автоматическое переключение слайдов каждые 8 секунд
    function startSlider() {
        setInterval(function () {
            showSlide(currentIndex + 1);
        }, 8000); // Время между слайдами
    }

    // Логика для ручного переключения слайдов через точки
    dots.forEach((dot, i) => {
        dot.addEventListener("click", function () {
            showSlide(i);
        });
    });

    // Инициализация слайдера с показом первого слайда
    showSlide(0);
    startSlider(); // Запуск автоматического переключения
});
document.addEventListener('DOMContentLoaded', function () {
    const callbackButton = document.getElementById('callbackButton');
    const callbackForm = document.getElementById('callbackForm');
    const cancelButton = document.getElementById('cancelButton');

    let formVisible = false;

    // Функция плавного открытия
    function openForm() {
        callbackForm.classList.add('show');
        callbackForm.classList.remove('hide');
        formVisible = true;
    }

    // Функция плавного закрытия
    function closeForm() {
        callbackForm.classList.add('hide');
        callbackForm.classList.remove('show');
        setTimeout(() => {
            callbackForm.style.display = 'none';
            formVisible = false;
        }, 300); // Длительность анимации закрытия
    }

    // Показать/скрыть форму при клике на кнопку
    callbackButton.addEventListener('click', function () {
        if (!formVisible) {
            callbackForm.style.display = 'flex';
            openForm();
        } else {
            closeForm();
        }
    });

    // Закрытие формы при клике на "Отмена"
    cancelButton.addEventListener('click', function () {
        closeForm();
    });

    // Закрытие формы при клике вне формы
    document.addEventListener('click', function (e) {
        if (!callbackForm.contains(e.target) && !callbackButton.contains(e.target) && formVisible) {
            closeForm();
        }
    });
});
