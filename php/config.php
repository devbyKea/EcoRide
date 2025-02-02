<?php
$host = getenv("MYSQLHOST");  // Host MySQL sur Railway
$dbname = getenv("MYSQLDATABASE");  // Nom de la base de données
$username = getenv("MYSQLUSER");  // Nom d'utilisateur MySQL
$password = getenv("MYSQLPASSWORD");  // Mot de passe MySQL
$port = getenv("MYSQLPORT") ?: 3306;  // Port (par défaut 3306)

// Connexion à MySQL avec PDO
try {
    $pdo = new PDO("mysql:host=$host;port=$port;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Erreur de connexion à MySQL : " . $e->getMessage());
}
?>


