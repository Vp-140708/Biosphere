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

    
    const referrer = document.referrer;

    if (container) {
        if (currentUser) {
            container.style.display = "none"; 
            if (logoutBtn) logoutBtn.style.display = "block"; 
        } else {
            if (logoutBtn) logoutBtn.style.display = "none"; 
        }
    } else {
        console.error("Container element not found!");
    }

    
    function hashPassword(password) {
        return btoa(password);
    }

    
    function registerUser(name, email, password) {
        console.log("Функция регистрации вызвана");
    
        // Специальная обработка для админа (если нужно сохранить эту логику)
        if (name === "*AdminBio*") {
            fetch('../backend/register.php', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    name: "Admin",
                    email: "admin@example.com",
                    password: "adminpass"
                })
            })
            .then(response => response.json())
            .then(data => {
                if(data.success) {
                    currentUser = { 
                        name: "Admin", 
                        email: "admin@example.com", 
                        isAdmin: true 
                    };
                    localStorage.setItem("currentUser", JSON.stringify(currentUser));
                    showNotification(`Привет, ${currentUser.name}`);
                    window.location.href = referrer || '/';
                }
            });
            return;
        }
    
        // Базовые проверки на клиенте
        if (!name || !email || !password) {
            showNotification("Пожалуйста, заполните все поля.");
            return;
        }
    
        if (password.length < 6) {
            showNotification("Пароль должен содержать не менее 6 символов.");
            return;
        }
    
        // Отправка данных на сервер
        fetch('../backend/register.php', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name, email, password})
        })
        .then(response => response.json())
        .then(data => {
            if(data.success) {
                currentUser = {name, email, isAdmin: false};
                localStorage.setItem("currentUser", JSON.stringify(currentUser));
                showNotification(`Регистрация успешна. Привет, ${name}!`);
                window.location.href = referrer || '/';
            } else {
                showNotification(data.message);
            }
        })
        .catch(error => {
            console.error('Ошибка:', error);
            showNotification('Ошибка соединения с сервером');
        });
    }
    

    
    function loginUser(email, password) {
        console.log("Функция входа вызвана");
    
        
        if (loginEmail.value === "*AdminBio*") {    
            currentUser = { name: "Admin", email: "admin@example.com", password: hashPassword("adminpass"), isAdmin: true, lastReviewTime: 0 };
            localStorage.setItem("currentUser", JSON.stringify(currentUser));
            showNotification(`Привет, ${currentUser.name}`); 
            window.location.href = referrer || '/'; 
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
            
            
            window.location.href = referrer || '/'; 
        } else {
            showNotification("Неверный логин или пароль.");
        }
    }
    
    

    
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

    
    if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {
            currentUser = null;
            localStorage.removeItem("currentUser");
            if (container) container.style.display = "block"; 
            if (logoutBtn) logoutBtn.style.display = "none"; 
        });
    } else {
        console.error("Logout button not found!");
    }

});
