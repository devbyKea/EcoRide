<?php
// Charger la configuration et la connexion à la base de données
require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/config/mongodb.php';

header("Content-Type: application/json");

// Page d'accueil simple
if ($_SERVER['REQUEST_URI'] == "/") {
    echo json_encode(["message" => "Bienvenue sur EcoRide - Backend opérationnel avec MySQL et MongoDB !"]);
    exit;
}

// Récupérer l'URI demandée
$request_uri = strtok($_SERVER["REQUEST_URI"], '?'); // Supprime les paramètres GET

// Définir les chemins pour les fichiers API
$api_routes = [
    "/users.php" => "api/users.php",
    "/rides.php" => "api/rides.php",
    "/notifications.php" => "api/notifications.php",
    "/forgot_password.php" => "api/forgot_password.php",
    "/reset_password.php" => "api/reset_password.php",
    "/login.php" => "api/login.php",
    "/logout.php" => "api/logout.php",
    "/protected.php" => "api/protected.php"
];

// Vérifier si la route demandée existe
if (array_key_exists($request_uri, $api_routes)) {
    require __DIR__ . '/' . $api_routes[$request_uri];
    exit;
}

// Gérer les erreurs 404
http_response_code(404);
echo json_encode(["error" => "Route non trouvée"]);
