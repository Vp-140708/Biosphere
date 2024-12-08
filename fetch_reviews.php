<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json');
require 'db.php';

// Проверка подключения к базе данных
if ($conn->connect_error) {
    echo json_encode(['error' => 'Ошибка подключения к базе данных: ' . $conn->connect_error]);
    exit();
}

$sql = "SELECT reviews.*, users.name FROM reviews JOIN users ON reviews.user_id = users.id ORDER BY created_at DESC";
$result = $conn->query($sql);

if (!$result) {
    echo json_encode(['error' => 'Ошибка при выполнении SQL-запроса: ' . $conn->error]);
    exit();
}

$reviews = [];
while ($row = $result->fetch_assoc()) {
    $reviews[] = $row;
}

echo json_encode($reviews);
$conn->close();
?>
