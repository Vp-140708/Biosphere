<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);
require 'db.php';

// Ваш код выборки данных
$result = $conn->query("SELECT reviews.rating, reviews.review_text, users.name, reviews.created_at FROM reviews JOIN users ON reviews.id = users.id ORDER BY reviews.created_at DESC");

while ($review = $result->fetch_assoc()) {
    echo "<div class='review'>";
    echo "<h3>{$review['name']} ({$review['rating']}⭐)</h3>";
    echo "<p>{$review['review_text']}</p>";
    echo "<small>{$review['created_at']}</small>";
    echo "</div>";
}
?>
