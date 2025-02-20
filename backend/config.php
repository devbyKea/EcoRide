<?php
ob_start(); // ✅ Capture toute sortie parasite avant qu'elle n'affecte le JSON

// 🚀 Variables d'environnement pour la BDD
$host = getenv("PMA_HOST") ?: "mysql.railway.internal";
$dbname = "railway";
$user = getenv("PMA_USER") ?: "root";
$password = getenv("PMA_PASSWORD");

// 🚀 Configuration avancée des sessions et cookies
ini_set('session.gc_maxlifetime', 86400); // 🔥 Garde la session active pendant 1 jour
session_save_path('/tmp'); // 🔥 Stocke les sessions dans le bon dossier

// ✅ Vérifier si une session existe déjà avant de la démarrer
if (session_status() === PHP_SESSION_NONE) {
    session_set_cookie_params([
        'lifetime' => 86400, // 🔥 Expire après 1 jour
        'path' => '/',
        'domain' => 'eco-ride-one.vercel.app', // 🔥 Tester avec et sans le "."
        'secure' => true, // 🔥 Obligatoire en HTTPS
        'httponly' => true, // 🔥 Empêche JavaScript d’accéder aux cookies
        'samesite' => 'None' // 🔥 Obligatoire pour CORS avec cookies
    ]);

    session_name("MYSESSID"); // 🔥 Nom unique pour éviter les conflits
    session_start();
    session_regenerate_id(true); // 🔥 Régénérer l'ID pour éviter le vol de session
}

// ✅ Debugging avancé (vérifie les logs sur Railway)
error_log("🚀 CONFIG SESSION ID : " . session_id());
error_log("🚀 CONFIG CONTENU DE SESSION : " . json_encode($_SESSION));
error_log("🚀 CONFIG COOKIES ENVOYÉS : " . print_r($_COOKIE, true));

try {
    // ✅ Connexion sécurisée à la base de données
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


