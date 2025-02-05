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

  // Slider functionality for the blocks slider (if any)
  const blocksWrapper = document.querySelector(".blocks-wrapper");
  const blocks = document.querySelectorAll(".block-item");
  const dots = document.querySelectorAll(".dot");
  let currentIndex = 0;
  let touchStartXBlocks = 0;

  function goToSlide(index) {
    currentIndex = (index + blocks.length) % blocks.length; // Wrap around
    blocksWrapper.scrollTo({
      left: blocks[currentIndex].offsetLeft - 10,
      behavior: "smooth",
    });
    updateDotsBlocks(currentIndex);
  }

  blocksWrapper && blocksWrapper.addEventListener("touchstart", function (event) {
    touchStartXBlocks = event.changedTouches[0].screenX;
  });

  blocksWrapper && blocksWrapper.addEventListener("touchend", function (event) {
    const touchEndX = event.changedTouches[0].screenX;
    const swipeDistance = touchEndX - touchStartXBlocks;
    if (Math.abs(swipeDistance) > 150) {
      goToSlide(currentIndex + (swipeDistance > 0 ? -1 : 1));
    }
  });

  // Automatic slider for the main slides
  const slides = document.querySelectorAll(".slide");
  const slideContainer = document.querySelector(".slides"); // container for the slides
  const slideInterval = 8000;
  let slideIndex = 0;

  function showSlide(index) {
    slideIndex = (index + slides.length) % slides.length; // Wrap around
    slideContainer.style.transform = `translateX(${-slideIndex * 100}%)`;
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

  // --- Added: Touch (swipe) support for the main slider ---

  let touchStartX = null;
  let touchEndX = null;
  const swipeThreshold = 50; // Minimum distance (in pixels) for a swipe to be registered

  slideContainer.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
  });

  slideContainer.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].clientX;
    handleSwipe();
  });

  function handleSwipe() {
    if (touchStartX === null || touchEndX === null) return;
    const diff = touchEndX - touchStartX;
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swipe right: previous slide
        showSlide(slideIndex - 1);
      } else {
        // Swipe left: next slide
        showSlide(slideIndex + 1);
      }
    }
    // Reset values for next swipe
    touchStartX = null;
    touchEndX = null;
  }

  // Hamburger menu functionality
  const hamburgerMenu = document.querySelector(".hamburger-menu");
  const dropdown = document.querySelector(".dropdown");

  hamburgerMenu.addEventListener("click", () => {
    dropdown.classList.toggle("active");
  });

  // Callback form functionality
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
