const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "uil-sun";

const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "uil-moon" : "uil-sun";

if (selectedTheme) {
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
  themeButton.classList[selectedIcon === "uil-moon" ? "add" : "remove"](
    iconTheme
  );
}
themeButton.addEventListener("click", () => {
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});
document.addEventListener('DOMContentLoaded', function() {
  const leftButton = document.querySelector('.carousel-control.left');
  const rightButton = document.querySelector('.carousel-control.right');
  const carouselWrapper = document.querySelector('.carousel-wrapper');
  const items = document.querySelectorAll('.carousel-item');
  const itemWidth = items[0].offsetWidth + 20; 
  let currentOffset = 0;

  leftButton.addEventListener('click', () => {
      if (currentOffset > 0) {
          currentOffset -= itemWidth;
          carouselWrapper.style.transform = `translateX(-${currentOffset}px)`;
      }
  });

  rightButton.addEventListener('click', () => {
      if (currentOffset < (items.length - 1) * itemWidth) {
          currentOffset += itemWidth;
          carouselWrapper.style.transform = `translateX(-${currentOffset}px)`;
      }
  });
});
let currentIndex = 0;

function updateCarousel() {
    const track = document.querySelector('.carousel-track');
    const itemWidth = document.querySelector('.carousel-item').offsetWidth + 10; 
    track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
}

function prevSlide() {
    if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
    }
}

function nextSlide() {
    const totalItems = document.querySelectorAll('.carousel-item').length;
    if (currentIndex < totalItems - 3) {
        currentIndex++;
        updateCarousel();
    }
}
