<?php
// Activer CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Gérer les requêtes OPTIONS
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

header("Content-Type: application/json");
require_once __DIR__ . '/../config/database.php';

// Récupérer le token depuis les headers
$headers = getallheaders();
$token_reçu = $headers['Authorization'] ?? '';

$stmt = $pdo->prepare("UPDATE Utilisateur SET token = NULL WHERE token = ?");
$stmt->execute([$token_reçu]);

echo json_encode(["message" => "Déconnexion réussie"]);
