<?php
require_once "config.php";

try {
    $stmt = $pdo->query("SELECT 1");
    echo json_encode(["success" => "Connexion MySQL OK"]);
} catch (Exception $e) {
    echo json_encode(["error" => "Erreur PDO : " . $e->getMessage()]);
}
?>
