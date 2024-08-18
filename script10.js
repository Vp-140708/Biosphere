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

