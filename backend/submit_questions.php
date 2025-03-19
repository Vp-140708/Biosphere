<?php
session_start();
include 'db_connect.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $question = trim($_POST['question']);
    $question = htmlspecialchars($question, ENT_QUOTES, 'UTF-8');

    if (isset($_SESSION['user_id'])) {
        // Пользователь авторизован
        $user_id = $_SESSION['user_id'];
        $stmt = $conn->prepare("INSERT INTO questions (user_id, question, created_at) VALUES (?, ?, NOW())");
        $stmt->bind_param("is", $user_id, $question);
    } else {
        // Гость, сохраняем имя
        $name = trim($_POST['name']);
        $name = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
        $stmt = $conn->prepare("INSERT INTO questions (name, question, created_at) VALUES (?, ?, NOW())");
        $stmt->bind_param("ss", $name, $question);
    }

    if ($stmt->execute()) {
        header("Location: ../public/Questions.php");
        exit();
    } else {
        echo "Ошибка: " . $stmt->error;
    }

    $stmt->close();
    $conn->close();
}
?>
