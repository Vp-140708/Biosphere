<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");

// Проверка метода запроса
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0); // Если это предзапрос, просто завершаем
}

// Здесь будет ваша логика для обработки запросов
if ($_SERVER['REQUEST_METHOD'] === 'POST' && $_SERVER['REQUEST_URI'] === '/api/reviews/add') {
    // Код для добавления отзыва
    $data = json_decode(file_get_contents('php://input'), true);
    // Сохраните отзыв в базе данных (или в файл, если вы не используете базу данных)
    // Пример: file_put_contents('reviews.json', json_encode($data), FILE_APPEND);

    // Возвращаем ответ
    echo json_encode(['status' => 'success', 'review' => [
        'user' => ['name' => 'User Name', '_id' => $userId],
        'text' => $data['text'],
        'rating' => $data['rating']
    ]]);
    
    exit;
}

// Обработка других методов и маршрутов
if ($_SERVER['REQUEST_METHOD'] === 'GET' && $_SERVER['REQUEST_URI'] === '/api/reviews') {
    // Код для получения отзывов
    // Пример: echo file_get_contents('reviews.json');

    // В server.php
    echo json_encode(['status' => 'success', 'review' => [
        'user' => ['name' => 'User Name', '_id' => $userId],
        'text' => $data['text'],
        'rating' => $data['rating']
    ]]);
    

    exit;
}

// Другие маршруты и методы могут быть добавлены аналогично
