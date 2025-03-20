<?php
require_once '../config/database.php';

header('Content-Type: application/json');

$conn = getConnection();

switch($_SERVER['REQUEST_METHOD']) {
    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        
        if (isset($data['action'])) {
            switch($data['action']) {
                case 'register':
                    // Регистрация
                    $stmt = $conn->prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
                    $hashedPassword = password_hash($data['password'], PASSWORD_DEFAULT);
                    $stmt->execute([$data['name'], $data['email'], $hashedPassword]);
                    echo json_encode(['success' => true, 'message' => 'User registered']);
                    break;

                case 'login':
                    // Авторизация
                    $stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
                    $stmt->execute([$data['email']]);
                    $user = $stmt->fetch(PDO::FETCH_ASSOC);
                    
                    if ($user && password_verify($data['password'], $user['password'])) {
                        echo json_encode([
                            'success' => true,
                            'user' => [
                                'id' => $user['id'],
                                'name' => $user['name'],
                                'email' => $user['email'],
                                'isAdmin' => (bool)$user['is_admin']
                            ]
                        ]);
                    } else {
                        echo json_encode(['success' => false, 'message' => 'Invalid credentials']);
                    }
                    break;
            }
        }
        break;
}