<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("mode: 'no-cors'");
// Если это preflight запрос, просто верните 200
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$host = 'localhost';
$db = 'your_database_name'; // Укажите имя вашей базы данных
$user = 'your_username'; // Укажите ваше имя пользователя
$pass = 'your_password'; // Укажите ваш пароль

$connection = new mysqli($host, $user, $pass, $db);
if ($connection->connect_error) {
    die("Connection failed: " . $connection->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $sql = "SELECT * FROM reviews";
    $result = $connection->query($sql);
    $reviews = [];
    while ($row = $result->fetch_assoc()) {
        $reviews[] = $row;
    }
    echo json_encode($reviews);
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    $name = $data['name'];
    $email = $data['email'];
    $review = $data['review'];
    $rating = $data['rating'];
    
    $stmt = $connection->prepare("INSERT INTO reviews (name, email, review, rating) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("sssi", $name, $email, $review, $rating);
    $stmt->execute();
    
    if ($stmt->affected_rows > 0) {
        echo json_encode(['status' => 'success']);
    } else {
        echo json_encode(['status' => 'error']);
    }
    $stmt->close();
}

$connection->close();
?>
