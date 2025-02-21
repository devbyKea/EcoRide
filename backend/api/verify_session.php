<?php
require_once "../config.php";

header("Access-Control-Allow-Origin: https://eco-ride-one.vercel.app");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

// Gérer la requête OPTIONS pour CORS
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(204);
    exit;
}

$session_id = $_GET["session_id"] ?? null;

if (!$session_id) {
    echo json_encode(["error" => "Session non fournie"]);
    exit;
}

// 🔍 Vérifier la session en base
$stmt = $pdo->prepare("
    SELECT utilisateur_id FROM sessions 
    WHERE session_id = ? AND expires_at > NOW()
");
$stmt->execute([$session_id]);
$session = $stmt->fetch();

if (!$session) {
    echo json_encode(["error" => "Session invalide ou expirée"]);
    exit;
}

// Récupérer les infos utilisateur
$stmt = $pdo->prepare("SELECT pseudo, email FROM utilisateur WHERE utilisateur_id = ?");
$stmt->execute([$session["utilisateur_id"]]);
$user = $stmt->fetch();

echo json_encode(["user" => $user]);
exit;
?>
