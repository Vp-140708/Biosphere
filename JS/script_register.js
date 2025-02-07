document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM загружен");
    const container = document.getElementById("container");
    const logoutBtn = document.getElementById("logout-btn");
    const registerBtn = document.getElementById("register-btn");
    const loginBtn = document.getElementById("login-btn");
    const registerName = document.getElementById("register-name");
    const registerEmail = document.getElementById("register-email");
    const registerPassword = document.getElementById("register-password");
    const loginEmail = document.getElementById("login-email");
    const loginPassword = document.getElementById("login-password");

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;

    // Capture the referrer URL
    const referrer = document.referrer;

    if (container) {
        if (currentUser) {
            container.style.display = "none"; // Скрываем форму входа/регистрации
            if (logoutBtn) logoutBtn.style.display = "block"; // Показываем кнопку выхода
        } else {
            if (logoutBtn) logoutBtn.style.display = "none"; // Скрываем кнопку выхода
        }
    } else {
        console.error("Container element not found!");
    }

    // Функция хеширования пароля
    function hashPassword(password) {
        return btoa(password);
    }

    // Функция регистрации пользователя
    function registerUser(name, email, password) {
        console.log("Функция регистрации вызвана");
    
        // Проверка на специальное имя администратора
        if (name === "*AdminBio*") {
            currentUser = { name: "Admin", email: "admin@example.com", password: hashPassword("adminpass"), isAdmin: true, lastReviewTime: 0 };
            localStorage.setItem("currentUser", JSON.stringify(currentUser));
            showNotification(`Привет, ${currentUser.name}`); // Исправлено с user.name на currentUser.name
            window.location.href = referrer || '/'; // Default to homepage if referrer is empty
            return;
        }
    
        if (!name || !email || !password) {
            showNotification("Пожалуйста, заполните все поля.");
            return;
        }
    
        const existingUserByEmail = users.find((u) => u.email === email);
        const existingUserByName = users.find((u) => u.name === name);
    
        if (existingUserByEmail) {
            showNotification("Регистрация невозможна: почта уже существует.");
            return;
        }
    
        if (existingUserByName) {
            showNotification("Регистрация невозможна: имя уже существует.");
            return;
        }
    
        if (password.length < 6) {
            showNotification("Пароль должен содержать не менее 6 символов.");
            return;
        }
    
        // Проверка на специальную строку
        const isAdmin = name === "*AdminBio*"; // Этот флаг не нужен, если имя запрещено
    
        const newUser = { name, email, password: hashPassword(password), isAdmin };
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        currentUser = newUser;
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        showNotification(`Регистрация успешна. Привет, ${name}!`);
        // Redirect to the referrer URL
        window.location.href = referrer || '/'; // Default to homepage if referrer is empty
    }
    

    // Функция для входа пользователя
    function loginUser(email, password) {
        console.log("Функция входа вызвана");
    
        // Проверка на имя администратора перед остальными проверками
        if (loginEmail.value === "*AdminBio*") {    
            currentUser = { name: "Admin", email: "admin@example.com", password: hashPassword("adminpass"), isAdmin: true, lastReviewTime: 0 };
            localStorage.setItem("currentUser", JSON.stringify(currentUser));
            showNotification(`Привет, ${currentUser.name}`); // Исправлено с user.name на currentUser.name
            window.location.href = referrer || '/'; // Default to homepage if referrer is empty
            return;
        }
    
        if (!email || !password) {
            showNotification("Пожалуйста, заполните все поля.");
            return;
        }
    
        users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users.find((u) => u.email === email && u.password === hashPassword(password));
    
        if (user) {
            currentUser = user;
            localStorage.setItem("currentUser", JSON.stringify(currentUser));
            showNotification(`Привет, ${user.name}`);
            
            // Redirect to the referrer URL
            window.location.href = referrer || '/'; // Default to homepage if referrer is empty
        } else {
            showNotification("Неверный логин или пароль.");
        }
    }
    
    

    // Обработчики событий для кнопок
    if (registerBtn) {
        registerBtn.addEventListener("click", function (event) {
            event.preventDefault();
            registerUser(registerName.value, registerEmail.value, registerPassword.value);
        });
    } else {
        console.error("Register button not found!");
    }

    if (loginBtn) {
        loginBtn.addEventListener("click", function (event) {
            event.preventDefault();
            loginUser(loginEmail.value, loginPassword.value);
        });
    } else {
        console.error("Login button not found!");
    }

    // Обработчик для кнопки выхода
    if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {
            currentUser = null;
            localStorage.removeItem("currentUser");
            if (container) container.style.display = "block"; // Show login/register form
            if (logoutBtn) logoutBtn.style.display = "none"; // Hide logout button
        });
    } else {
        console.error("Logout button not found!");
    }

});
