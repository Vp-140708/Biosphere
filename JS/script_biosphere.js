document.addEventListener("DOMContentLoaded", function () {
  // FAQ blocks
  const faqBlocks = document.querySelectorAll(".faq-block");
  faqBlocks.forEach((block) => {
    block.addEventListener("click", function () {
      this.classList.toggle("active");
      const answer = this.querySelector(".faq-answer");
      answer.style.maxHeight = this.classList.contains("active")
        ? answer.scrollHeight + "px"
        : null;
    });
  });

  // Slider functionality
  const blocksWrapper = document.querySelector(".blocks-wrapper");
  const blocks = document.querySelectorAll(".block-item");
  const dots = document.querySelectorAll(".dot");
  let currentIndex = 0;
  let touchStartX = 0;

  function goToSlide(index) {
    currentIndex = (index + blocks.length) % blocks.length; // Wrap around
    blocksWrapper.scrollTo({
      left: blocks[currentIndex].offsetLeft - 10,
      behavior: "smooth",
    });
    updateDots(currentIndex);
  }

  blocksWrapper.addEventListener("touchstart", function (event) {
    touchStartX = event.changedTouches[0].screenX;
  });

  blocksWrapper.addEventListener("touchend", function (event) {
    const touchEndX = event.changedTouches[0].screenX;
    const swipeDistance = touchEndX - touchStartX;
    if (Math.abs(swipeDistance) > 150) {
      goToSlide(currentIndex + (swipeDistance > 0 ? -1 : 1));
    }
  });

  // Hamburger menu
  const hamburgerMenu = document.querySelector(".hamburger-menu");
  const dropdown = document.querySelector(".dropdown");

  hamburgerMenu.addEventListener("click", () => {
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
  });

  // Automatic slider
  const slides = document.querySelectorAll(".slide");
  const slideInterval = 8000;
  let slideIndex = 0;

  function showSlide(index) {
    slideIndex = (index + slides.length) % slides.length; // Wrap around
    const slidesWrapper = document.querySelector(".slides");
    slidesWrapper.style.transform = `translateX(${-slideIndex * 100}%)`;
    updateDots(slideIndex);
  }

  function updateDots(index) {
    const dots = document.querySelectorAll(".dot_sl");
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
  }

  function startSlider() {
    setInterval(() => showSlide(slideIndex + 1), slideInterval);
  }

  document.querySelectorAll(".dot_sl").forEach((dot, i) => {
    dot.addEventListener("click", () => showSlide(i));
  });

  showSlide(slideIndex);
  startSlider();

  // Callback form
  // Callback form
  const callbackButton = document.getElementById("callbackButton");
  const callbackForm = document.getElementById("callbackForm");
  const cancelButton = document.getElementById("cancelButton");

  let formVisible = false;

  callbackButton.addEventListener("click", () => {
    formVisible ? closeForm() : openForm();
  });

  cancelButton.addEventListener("click", closeForm);

  document.addEventListener("click", (e) => {
    if (
      !callbackForm.contains(e.target) &&
      !callbackButton.contains(e.target) &&
      formVisible
    ) {
      closeForm();
    }
  });

  function openForm() {
    callbackForm.style.display = "flex";
    callbackForm.classList.remove("hide"); // Убираем класс 'hide'
    callbackForm.classList.add("show");
    formVisible = true;
  }

  function closeForm() {
    callbackForm.classList.remove("show"); // Убираем класс 'show', если он есть
    callbackForm.classList.add("hide");
    setTimeout(() => {
      callbackForm.style.display = "none";
      formVisible = false;
    }, 300);
  }
  
});
