<?php
$host = getenv("MYSQLHOST");  // Récupère l'adresse du serveur MySQL
$dbname = getenv("MYSQLDATABASE");  // Nom de la base de données
$username = getenv("MYSQLUSER");  // Nom d'utilisateur MySQL
$password = getenv("MYSQLPASSWORD");  // Mot de passe MySQL
$port = getenv("MYSQLPORT") ?: "3306";  // ⚠️ GARDE 3306, c'est le bon port en interne

try {
    $dsn = "mysql:host=$host;port=$port;dbname=$dbname;charset=utf8mb4";
    $pdo = new PDO($dsn, $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "✅ Connexion réussie à MySQL !";
} catch (PDOException $e) {
    die("❌ Erreur de connexion à MySQL : " . $e->getMessage());
}
?>

