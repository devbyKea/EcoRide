<?php
require_once '../config.php';

try {
    $stmt = $pdo->query("SELECT * FROM avis LIMIT 5"); // Exemple sur une table "avis"
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($data);
} catch (PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
?>
