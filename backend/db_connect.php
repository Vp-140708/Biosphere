<?php
$servername = "localhost";
$username = "root";  // По умолчанию в XAMPP
$password = "";      // Пустой пароль в XAMPP
$dbname = "biosphere"; // Убедись, что это правильное имя БД

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Ошибка подключения: " . $conn->connect_error);
}
?>
