<?php
ob_start(); // ✅ Capture toute sortie parasite avant qu'elle n'affecte le JSON

// 🚀 Connexion à la base de données
$host = getenv("PMA_HOST") ?: "mysql.railway.internal";
$dbname = "railway";
$user = getenv("PMA_USER") ?: "root";
$password = getenv("PMA_PASSWORD");

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $user, $password, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false, // 🔥 Sécurise contre les injections SQL
    ]);
    error_log("✅ [CONFIG] Connexion à la base de données réussie !");
} catch (PDOException $e) {
    error_log("❌ Erreur de connexion BDD: " . $e->getMessage());
    die(json_encode(["error" => "Erreur de connexion à la base de données"]));
}
?>
