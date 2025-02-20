<?php
ob_start(); // ✅ Capture toute sortie non désirée pour éviter les erreurs de headers

$host = getenv("PMA_HOST") ?: "mysql.railway.internal"; // Utilise PMA_HOST pour MySQL
$dbname = "railway"; // Railway utilise généralement "railway" comme nom de base
$user = getenv("PMA_USER") ?: "root"; // Utilise PMA_USER
$password = getenv("PMA_PASSWORD"); // Utilise PMA_PASSWORD

// 🔥 Configuration des sessions pour persistance correcte
session_set_cookie_params([
    'lifetime' => 86400, // 1 jour
    'path' => '/',
    'domain' => 'eco-ride-one.vercel.app', // 🔥 Tester avec et sans le "." selon le comportement
    'secure' => true, // 🔥 Obligatoire en HTTPS
    'httponly' => true, // 🔥 Empêche JavaScript d'accéder aux cookies
    'samesite' => 'None' // 🔥 Obligatoire pour CORS avec cookies
]);

// ✅ Démarrer la session uniquement si elle n'est pas active
if (session_status() === PHP_SESSION_NONE) {
    session_start();
    session_regenerate_id(true); // 🔥 Régénérer l’ID de session pour éviter fixation de session
}

// ✅ Debugging avancé pour voir si la session persiste
error_log("🚀 SESSION ID ACTUEL : " . session_id());
error_log("🚀 CONTENU DE SESSION : " . json_encode($_SESSION));
error_log("🚀 COOKIES ENVOYÉS PAR PHP : " . print_r($_COOKIE, true));

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Erreur de connexion à la base de données: " . $e->getMessage());
}
?>

