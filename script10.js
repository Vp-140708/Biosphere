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
    const themeToggle = document.getElementById("theme-toggle");
    const currentTheme = localStorage.getItem("theme") || "light";
    if (currentTheme === "dark") {
        document.body.classList.add("dark-theme");
    }

    themeToggle.addEventListener("click", function () {
        document.body.classList.toggle("dark-theme");
        const theme = document.body.classList.contains("dark-theme") ? "dark" : "light";
        localStorage.setItem("theme", theme);
    });
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

