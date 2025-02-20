<?php
ob_start(); // ✅ Capture toute sortie parasite avant qu'elle n'affecte le JSON
header("Access-Control-Allow-Origin: https://eco-ride-one.vercel.app");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");
// 🚀 Connexion à la base de données
$host = getenv("PMA_HOST") ?: "mysql.railway.internal";
$dbname = "railway";
$user = getenv("PMA_USER") ?: "root";
$password = getenv("PMA_PASSWORD");

// Création de la connexion avec MySQLi
$conn = new mysqli($host, $user, $password, $dbname);

// Vérifier la connexion
if ($conn->connect_error) {
    error_log("❌ Erreur de connexion BDD: " . $conn->connect_error);
    
    ob_end_clean(); // 🛑 Supprime toute sortie parasite
    header('Content-Type: application/json'); // ✅ Force le type JSON
    die(json_encode(["error" => "Erreur de connexion à la base de données"], JSON_UNESCAPED_UNICODE));
    exit; // 🛑 Sécurité supplémentaire pour éviter toute exécution
}

error_log("✅ [CONFIG] Connexion à la base de données réussie !");
?>
