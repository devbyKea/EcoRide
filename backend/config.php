<?php
$host = getenv("PMA_HOST") ?: "mysql.railway.internal"; // Utilise PMA_HOST pour MySQL
$dbname = "railway"; // Railway utilise généralement "railway" comme nom de base
$user = getenv("PMA_USER") ?: "root"; // Utilise PMA_USER
$password = getenv("PMA_PASSWORD"); // Utilise PMA_PASSWORD

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Erreur de connexion à la base de données: " . $e->getMessage());
}

session_set_cookie_params([
    'lifetime' => 86400, // 🔥 Expire après 1 jour
    'path' => '/',
    'domain' => 'eco-ride-one.vercel.app', // 🔥 Assure-toi que ton frontend et backend sont sur le même domaine
    'secure' => true, // 🔥 Obligatoire en HTTPS
    'httponly' => true, // 🔥 Empêche JavaScript d'accéder aux cookies
    'samesite' => 'None' // 🔥 Obligatoire pour CORS avec cookies
]);

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

?>
