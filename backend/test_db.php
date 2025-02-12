<?php
require_once 'config.php';

try {
    $stmt = $pdo->query("SELECT 'Connexion réussie !' AS message");
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    echo json_encode(["status" => "success", "message" => $row['message']]);
} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?>
