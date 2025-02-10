<?php
require_once __DIR__ . '/../config/cors.php';

header("Content-Type: application/json");
require_once __DIR__ . '/../config/database.php';

// Récupérer le token depuis les headers
$headers = getallheaders();
$token_reçu = $headers['Authorization'] ?? '';

$stmt = $pdo->prepare("UPDATE Utilisateur SET token = NULL WHERE token = ?");
$stmt->execute([$token_reçu]);

echo json_encode(["message" => "Déconnexion réussie"]);
