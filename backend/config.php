<?php
ob_start(); // ✅ Capture toute sortie parasite avant qu'elle n'affecte le JSON
header("Access-Control-Allow-Origin: https://eco-ride-one.vercel.app");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

// ✅ Charger manuellement l'extension PDO (Solution alternative)
if (!extension_loaded('pdo')) {
    dl('pdo.so'); // Charger l'extension PDO si elle n'est pas activée
}
if (!extension_loaded('pdo_mysql')) {
    dl('pdo_mysql.so'); // Charger l'extension PDO MySQL
}

// 🚀 Connexion à la base de données
$host = getenv("PMA_HOST") ?: "mysql.railway.internal";
$dbname = "railway";
$user = getenv("PMA_USER") ?: "root";
$password = getenv("PMA_PASSWORD");

try {
    // ✅ Connexion avec PDO
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    
    error_log("✅ [CONFIG] Connexion à la base de données réussie !");
} catch (PDOException $e) {
    error_log("❌ Erreur de connexion BDD: " . $e->getMessage());
    
    ob_end_clean(); // Supprime toute sortie parasite
    header('Content-Type: application/json');
    die(json_encode(["error" => "Erreur de connexion à la base de données"], JSON_UNESCAPED_UNICODE));
}
?>
