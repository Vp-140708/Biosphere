<?php
// submit_review.php
header('Content-Type: application/json');
require 'db_connect.php'; // Подключение к базе данных

session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!isset($_SESSION['user_id'])) {
        echo json_encode(['error' => 'User not authenticated']);
        exit;
    }

    $user_id = $_SESSION['user_id'];
    $rating = isset($_POST['rating']) ? (int)$_POST['rating'] : null;
    $review_text = isset($_POST['review_text']) ? trim($_POST['review_text']) : null;

    if ($rating && $review_text) {
        $stmt = $conn->prepare("INSERT INTO reviews (user_id, rating, review_text) VALUES (?, ?, ?)");
        $stmt->bind_param("iis", $user_id, $rating, $review_text);

        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Review submitted']);
        } else {
            echo json_encode(['error' => 'Failed to submit review']);
        }
    } else {
        echo json_encode(['error' => 'Invalid input']);
    }
} else {
    echo json_encode(['error' => 'Invalid request method']);
}
?>
