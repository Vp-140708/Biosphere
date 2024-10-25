<?php
require 'db.php';
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_SESSION['user_id'])) {
    $rating = $_POST['rating'];
    $review_text = $_POST['review_text'];
    $user_id = $_SESSION['user_id'];

    $stmt = $conn->prepare("INSERT INTO reviews (user_id, rating, review_text) VALUES (?, ?, ?)");
    $stmt->bind_param("iis", $user_id, $rating, $review_text);
    $stmt->execute();
}
