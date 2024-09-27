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

    let touchStartX = 0;
    let touchEndX = 0;
    const threshold = 50; // Минимальная дистанция для распознавания свайпа

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
                // Свайп вправо (движение блока влево)
                blocksWrapper.scrollBy({
                    left: -blocksWrapper.clientWidth,
                    behavior: "smooth"
                });
            } else {
                // Свайп влево (движение блока вправо)
                blocksWrapper.scrollBy({
                    left: blocksWrapper.clientWidth,
                    behavior: "smooth"
                });
            }
        }
    });
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

