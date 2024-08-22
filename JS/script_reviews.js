    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault();
        alert('Login form submitted! (Database connection will be added later)');
    });
    document.querySelector('.register-button').addEventListener('click', () => {
        document.querySelector('.register-section').classList.add('transition-out');
        document.querySelector('.login-section').classList.add('transition-in');
    });

