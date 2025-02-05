<?php
header("Content-Type: application/json");
require_once __DIR__ . '/../config/database.php';

// Récupérer le token depuis les headers
$headers = getallheaders();
$token_reçu = $headers['Authorization'] ?? '';

$stmt = $pdo->prepare("SELECT utilisateur_id FROM Utilisateur WHERE token = ?");
$stmt->execute([$token_reçu]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$user) {
    echo json_encode(["error" => "Accès refusé, token invalide"]);
    exit;
}

echo json_encode(["message" => "Bienvenue dans une route protégée !"]);
