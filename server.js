const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;

// Middleware для парсинга POST-запросов
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Статические файлы (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, '/')));

// Маршрут для обработки формы регистрации
app.post('/register', (req, res) => {
    const { username, email, password } = req.body;
    console.log(`Пользователь зарегистрирован: ${username}, ${email}`);
    
    // Добавьте логику сохранения пользователя в базу данных или файл
    
    res.send('Регистрация прошла успешно!');
});

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});
