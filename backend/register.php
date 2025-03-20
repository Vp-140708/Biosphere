<?php
header('Content-Type: application/json');

// Подключение к базе данных
$host = '127.0.0.1';
$dbname = 'biosphere_db';
$username = 'root'; // Замените на вашего пользователя БД
$password = ''; // Замените на ваш пароль БД

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Ошибка подключения к базе данных']);
    exit;
}

// Получение данных из POST-запроса
$data = json_decode(file_get_contents('php://input'), true);
$name = $data['name'] ?? '';
$email = $data['email'] ?? '';
$password = $data['password'] ?? '';

// Валидация данных
if (empty($name) || empty($email) || empty($password)) {
    echo json_encode(['success' => false, 'message' => 'Все поля обязательны для заполнения']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Некорректный формат email']);
    exit;
}

if (strlen($password) < 6) {
    echo json_encode(['success' => false, 'message' => 'Пароль должен содержать не менее 6 символов']);
    exit;
}

// Проверка существующего email
$stmt = $pdo->prepare("SELECT COUNT(*) FROM users WHERE email = ?");
$stmt->execute([$email]);
$emailExists = $stmt->fetchColumn();

if ($emailExists) {
    echo json_encode(['success' => false, 'message' => 'Пользователь с таким email уже существует']);
    exit;
}

// Хэширование пароля
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

// Вставка данных в БД
try {
    $stmt = $pdo->prepare("INSERT INTO users (name, email, password, role, created_at) VALUES (?, ?, ?, 'user', NOW())");
    $stmt->execute([$name, $email, $hashedPassword]);
    
    echo json_encode(['success' => true, 'message' => 'Регистрация успешна']);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Ошибка при сохранении данных']);
}