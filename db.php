<?php
$servername = "localhost";
$username = "root";      // Имя пользователя базы данных
$password = "";          // Пароль базы данных
$dbname = "biosfera_db"; // Имя базы данных

// Создаем подключение
$conn = new mysqli($servername, $username, $password, $dbname);

// Проверка подключения
if ($conn->connect_error) {
    die("Ошибка подключения: " . $conn->connect_error);
}
?>
