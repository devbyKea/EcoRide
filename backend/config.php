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
?>
