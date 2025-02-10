<?php
// Activer CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// LOG de test pour voir si CORS est exécuté
file_put_contents("cors_log.txt", "CORS exécuté sur " . date("Y-m-d H:i:s") . "\n", FILE_APPEND);

// Gérer les requêtes OPTIONS (pré-flight request)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
