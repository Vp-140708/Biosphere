<?php
session_start();
include '../backend/db_connect.php';

// Получение списка вопросов из БД
$sql = "SELECT q.id, q.questions, q.created_at, 
               COALESCE(u.name, q.name) AS username 
        FROM questions q 
        LEFT JOIN users u ON q.user_id = u.id 
        ORDER BY q.created_at DESC";
$result = $conn->query($sql);
?>

<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Вопрос-Ответ - Ветеринарная Клиника</title>
    <link rel="stylesheet" href="../CSS/style_q.css">
    <link rel="stylesheet" href="../CSS/styles1.css">
</head>
<body>
<header class="header">
    <div class="header-container">
        <div class="left-section1">
            <a href="index.html" class="logo-link">
                <img src="../assets/images/bio-logo1.png" alt="Site Logo" class="logo">
                <span class="site-name">Биосфера</span>
            </a>
            <button type="button" class="theme-switcher" id="theme-switcher">🌞</button>
        </div>
        <nav class="nav-links">
            <a href="Register.html">Регистрация</a>
            <a href="Questions.php">Вопрос-Ответ</a>
            <a href="Price list.html">Прейскурант</a>
            <a href="Staff1.html">Специалисты</a>
            <a href="Филиалы1.html">Филиалы</a>
            <a href="Отзывы1.html">Отзывы</a>
            <a href="https://vk.com/biosre" target="_blank">
                <img src="../assets/images/media_social_vk_vkontakte_icon_124252.png" alt="ВК">
            </a>
        </nav>
    </div>
</header>

<div class="container">
    <h2>Оставьте свой вопрос</h2>
    <form action="../backend/submit_question.php" method="post" class="form-control">
        <?php if (!isset($_SESSION['user_id'])): ?>
            <input type="text" name="name" placeholder="Введите ваше имя" required>
        <?php endif; ?>
        <textarea name="question" placeholder="Введите ваш вопрос" required></textarea>
        <button type="submit">Отправить</button>
    </form>
</div>

<div class="container">
    <h2>Заданные вопросы</h2>
    <div id="questionsContainer" class="form-control">
        <?php
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                echo "<div class='question-item'>";
                echo "<p><strong>" . htmlspecialchars($row['username']) . ":</strong> " . htmlspecialchars($row['question']) . "</p>";
                echo "<p class='timestamp'>" . $row['created_at'] . "</p>";
                echo "</div>";
            }
        } else {
            echo "<p>Пока нет вопросов.</p>";
        }
        ?>
    </div>
</div>

<button id="logout-btn" style="position: fixed; right: 10px; bottom: 20px; width: 15em; z-index: 100;">Выйти из аккаунта</button>
<script src="../JS/script_q.js"></script>
<script src="../JS/script1.js"></script>
</body>
</html>

<?php $conn->close(); ?>
