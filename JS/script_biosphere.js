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

// Check and apply the stored theme on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.classList.add(savedTheme);
        themeSwitcher.textContent = savedTheme === 'dark-theme' ? '🌚' : '🌞';
    }
});

document.addEventListener("DOMContentLoaded", function () {
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
        // Обрабатываем зацикливание
        if (index < 0) {
            currentIndex = blocks.length - 1; // Переход к последнему блоку
        } else if (index >= blocks.length) {
            currentIndex = 0; // Переход к первому блоку
        } else {
            currentIndex = index;
        }

        blocksWrapper.scrollTo({
            left: blocks[currentIndex].offsetLeft - 10, // Прокручиваем к текущему блоку
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
                // Свайп вправо (движение влево)
                goToSlide(currentIndex - 1);
            } else {
                // Свайп влево (движение вправо)
                goToSlide(currentIndex + 1);
            }
        }
    });

    // Первоначальная установка точек
    updateDots(currentIndex);
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
// Get the content element
const contentElement = document.querySelector('.content');

// Create an IntersectionObserver instance
const observer = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    contentElement.classList.add('in-view');
  } else {
    contentElement.classList.remove('in-view');
  }
}, {
  threshold: 1.0,
});

