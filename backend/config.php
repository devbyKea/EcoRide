<?php
ob_start(); // ✅ Capture toute sortie parasite avant qu'elle n'affecte le JSON

$host = getenv("PMA_HOST") ?: "mysql.railway.internal";
$dbname = "railway";
$user = getenv("PMA_USER") ?: "root";
$password = getenv("PMA_PASSWORD");

// 🚀 Configuration avancée des sessions et cookies
ini_set('session.gc_maxlifetime', 86400); // 🔥 Garde la session active pendant 1 jour
session_save_path('/tmp'); // 🔥 Force PHP à bien stocker les sessions
session_name("MYSESSID"); // 🔥 Donne un nom unique au cookie de session

session_set_cookie_params([
    'lifetime' => 86400, // 🔥 Expire après 1 jour
    'path' => '/',
    'domain' => 'eco-ride-one.vercel.app', // 🔥 Tester avec et sans le "."
    'secure' => true, // 🔥 Obligatoire en HTTPS
    'httponly' => true, // 🔥 Empêche JavaScript d’accéder aux cookies
    'samesite' => 'None' // 🔥 Obligatoire pour CORS avec cookies
]);

// ✅ Démarrer la session UNIQUEMENT si elle n'existe pas déjà
if (session_status() === PHP_SESSION_NONE) {
    session_start();
    session_regenerate_id(true); // 🔥 Régénérer l'ID de session après chaque connexion
}

// ✅ Debugging avancé (regarde les logs sur Railway pour voir si la session marche bien)
error_log("🚀 CONFIG SESSION ID : " . session_id());
error_log("🚀 CONFIG CONTENU DE SESSION : " . json_encode($_SESSION));
error_log("🚀 CONFIG COOKIES ENVOYÉS : " . print_r($_COOKIE, true));

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Erreur de connexion à la base de données: " . $e->getMessage());
}
?>

