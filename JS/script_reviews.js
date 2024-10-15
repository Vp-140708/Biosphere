    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault();
        alert('...');
    });
    document.querySelector('.register-button').addEventListener('click', () => {
        document.querySelector('.register-section').classList.add('transition-out');
        document.querySelector('.login-section').classList.add('transition-in');
    });

    const loadMoreBtn = document.querySelector('.load-more-btn');
    const reviews = document.querySelectorAll('.review-card');
    let reviewsToShow = 6;
    
    function hideExtraReviews() {
        if (reviews.length > reviewsToShow) {
            loadMoreBtn.style.display = 'block';
            reviews.forEach((review, index) => {
                if (index >= reviewsToShow) {
                    review.style.display = 'none';
                }
            });
        } else {
            loadMoreBtn.style.display = 'none'; 
        }
    }
    
    loadMoreBtn.addEventListener('click', () => {
        reviews.forEach(review => {
            review.style.display = 'block';
        });
        loadMoreBtn.style.display = 'none';
    });

    hideExtraReviews();
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');
    
    signUpButton.addEventListener('click', () => {
        container.classList.add("right-panel-active");
    });
    
    signInButton.addEventListener('click', () => {
        container.classList.remove("right-panel-active");
    });

// После успешной регистрации или входа скрыть формы и показать блок отзыва
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    // Эмуляция успешного входа
    document.getElementById('register').style.display = 'none';
    document.getElementById('log').style.display = 'none';
    document.getElementById('write-review').style.display = 'block';
});
const sendReviewButton = document.getElementById('send-review');
const ratingGroup = document.querySelector('.rating-group');
const ratingInputs = ratingGroup.querySelectorAll('input[type="radio"]');

sendReviewButton.addEventListener('click', () => {
  const rating = Array.from(ratingInputs).find(input => input.checked).value;
  const reviewText = document.getElementById('review-text').value;

  // Отправить запрос на сервер
  fetch('/send-review', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      rating: rating,
      reviewText: reviewText
    })
  })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
});