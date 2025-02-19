<?php
header("Access-Control-Allow-Origin: https://eco-ride-one.vercel.app");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

// ✅ Vérifier si la session est déjà active
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// ✅ Nettoyer le buffer de sortie pour éviter les warnings parasites
ob_end_clean();

// ✅ Vérifier la requête OPTIONS (CORS)
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(204);
    exit;
}

// ✅ Vérifier si l'utilisateur est connecté
if (!isset($_SESSION["user_id"])) {
    echo json_encode(["error" => "Aucun utilisateur connecté"]);
    http_response_code(401);
    exit;
}

// ✅ Supprimer la session
$_SESSION = [];
session_destroy();

// ✅ Supprimer le cookie de session si utilisé
if (ini_get("session.use_cookies")) {
    setcookie(session_name(), "", time() - 42000, "/");
}

// ✅ Réponse propre en JSON
http_response_code(200);
echo json_encode(["success" => "Déconnexion réussie"]);
exit;

