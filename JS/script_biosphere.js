document.addEventListener("DOMContentLoaded", function () {
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

  const blocksWrapper = document.querySelector(".blocks-wrapper");
  const blocks = document.querySelectorAll(".block-item");
  const dots = document.querySelectorAll(".dot");
  let currentIndex = 0;
  let touchStartX = 0;

  function goToSlide(index) {
    currentIndex = (index + blocks.length) % blocks.length;
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
    
    let threshold = window.innerWidth < 768 ? 250 : 150;
    
    if (Math.abs(swipeDistance) > threshold) {
      goToSlide(currentIndex + (swipeDistance > 0 ? -1 : 1));
    }
  });

  const hamburgerMenu = document.querySelector(".hamburger-menu");
  const dropdown = document.querySelector(".dropdown");

  hamburgerMenu.addEventListener("click", () => {
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
  });

  const slides = document.querySelectorAll(".slide");
  const slideInterval = 8000;
  let slideIndex = 0;
  let autoSlideInterval = setInterval(() => showSlide(slideIndex + 1), slideInterval);

  function showSlide(index) {
    slideIndex = (index + slides.length) % slides.length;
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

  function stopAutoSlider() {
    if (autoSlideInterval) {
      clearInterval(autoSlideInterval);
      autoSlideInterval = null;
    }
  }

  document.querySelectorAll(".dot_sl").forEach((dot, i) => {
    dot.addEventListener("click", () => {
      showSlide(i);
      stopAutoSlider();
    });
  });

  showSlide(slideIndex);

  const slidesWrapper = document.querySelector(".slides");
  let slideTouchStartX = 0;
  const swipeThreshold = 50;

  slidesWrapper.addEventListener("touchstart", (event) => {
    slideTouchStartX = event.changedTouches[0].screenX;
    stopAutoSlider();
  });

  slidesWrapper.addEventListener("touchend", (event) => {
    const slideTouchEndX = event.changedTouches[0].screenX;
    const swipeDistance = slideTouchEndX - slideTouchStartX;
    if (Math.abs(swipeDistance) > swipeThreshold) {
      if (swipeDistance < 0) {
        showSlide(slideIndex + 1);
      } else {
        showSlide(slideIndex - 1);
      }
    }
  });

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
    callbackForm.classList.remove("hide");
    callbackForm.classList.add("show");
    formVisible = true;
  }

  function closeForm() {
    callbackForm.classList.remove("show");
    callbackForm.classList.add("hide");
    setTimeout(() => {
      callbackForm.style.display = "none";
      formVisible = false;
    }, 300);
  }
});