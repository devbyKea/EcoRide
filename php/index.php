<?php
// Définir le bon chemin pour accéder aux fichiers de configuration
require_once __DIR__ . '/php/config/database.php';
require_once __DIR__ . '/php/config/mongodb.php';



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
    "/forgot_password.php" => __DIR__ . "/php/api/forgot_password.php",
    "/login.php" => __DIR__ . "/php/api/login.php",
    "/logout.php" => __DIR__ . "/php/api/logout.php",
    "/notifications.php" => __DIR__ . "/php/api/notifications.php",
    "/protected.php" => __DIR__ . "/php/api/protected.php",
    "/reset_password.php" => __DIR__ . "/php/api/reset_password.php",
    "/rides.php" => __DIR__ . "/php/api/rides.php",
    "/users.php" => __DIR__ . "/php/api/users.php"
];

// Vérifier si la route demandée existe
if (array_key_exists($request_uri, $api_routes)) {
    require $api_routes[$request_uri];
    exit;
}

// Gérer les erreurs 404
http_response_code(404);
echo json_encode(["error" => "Route non trouvée"]);
?>
