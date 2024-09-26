// Переключение темной темы
const toggleButton = document.getElementById('theme-toggle');
toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    toggleButton.textContent = document.body.classList.contains('dark') ? 'Светлая тема' : 'Темная тема';
    
});

// Слайдер
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
setInterval(() => {
    slides[currentSlide].style.display = 'none';
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].style.display = 'block';
}, 5000);

// FAQ
function toggleFaq(item) {
    const answer = item.nextElementSibling;
    const arrow = item.querySelector('.arrow');
    answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
    arrow.textContent = arrow.textContent === '↑' ? '↓' : '↑';
}
