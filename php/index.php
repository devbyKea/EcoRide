<?php
// Vérifier si le module mod_headers est activé
if (!in_array('mod_headers', apache_get_modules())) {
    die("🚨 Erreur: Le module mod_headers n'est pas activé sur Apache !");
}
// Définir le bon chemin pour accéder aux fichiers de configuration
require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/config/mongodb.php';



header("Access-Control-Allow-Origin: https://eco-ride-one.vercel.app");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// Gérer les requêtes OPTIONS pour éviter les blocages CORS
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Page d'accueil simple
if ($_SERVER['REQUEST_URI'] == "/") {
    echo json_encode(["message" => "Bienvenue sur EcoRide - Backend opérationnel avec MySQL et MongoDB !"]);
    exit;
}

// Récupérer l'URI demandée
$request_uri = strtok($_SERVER["REQUEST_URI"], '?'); // Supprime les paramètres GET

// Définir les chemins pour les fichiers API
$api_routes = [
    "/users.php" => __DIR__ . "/api/users.php",
    "/rides.php" => __DIR__ . "/api/rides.php",
    "/notifications.php" => __DIR__ . "/api/notifications.php",
    "/forgot_password.php" => __DIR__ . "/api/forgot_password.php",
    "/reset_password.php" => __DIR__ . "/api/reset_password.php",
    "/login.php" => __DIR__ . "/api/login.php",
    "/logout.php" => __DIR__ . "/api/logout.php",
    "/protected.php" => __DIR__ . "/api/protected.php",
    "/update_user.php" => __DIR__ . "/api/update_user.php"
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
