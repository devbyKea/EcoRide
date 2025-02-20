<?php
ob_start(); // ✅ Capture toute sortie parasite avant qu'elle n'affecte le JSON

// ✅ Vérifier si une session est déjà active avant d'appliquer des paramètres
if (session_status() === PHP_SESSION_NONE) {
    // 🚀 Paramètres de session (ils ne doivent être modifiés QUE si la session n'est pas active)
    ini_set('session.gc_maxlifetime', 86400); // 🔥 Garde la session active pendant 1 jour

    session_set_cookie_params([
        'lifetime' => 86400, // 🔥 Expire après 1 jour
        'path' => '/',
        'domain' => 'eco-ride-one.vercel.app', // 🔥 Tester avec et sans le "."
        'secure' => true, // 🔥 Obligatoire en HTTPS
        'httponly' => true, // 🔥 Empêche JavaScript d’accéder aux cookies
        'samesite' => 'None' // 🔥 Obligatoire pour CORS avec cookies
    ]);

    session_start();
    session_regenerate_id(true); // 🔥 Régénérer l'ID de session après chaque connexion
}

// ✅ Vérification et debugging avancé
error_log("🚀 CONFIG SESSION ID : " . session_id());
error_log("🚀 CONFIG CONTENU DE SESSION : " . json_encode($_SESSION));
error_log("🚀 CONFIG COOKIES ENVOYÉS : " . print_r($_COOKIE, true));

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

} catch (PDOException $e) {
    error_log("❌ Erreur de connexion BDD: " . $e->getMessage());
    die(json_encode(["error" => "Erreur de connexion à la base de données"]));
}
?>


