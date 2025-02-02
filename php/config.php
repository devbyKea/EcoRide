<?php
$host = getenv("PMA_HOST") ?: "mysql.railway.internal";  // Remplace par ton host Railway
$dbname = getenv("MYSQLDATABASE") ?: "railway"; // Mets le nom correct
$username = getenv("PMA_USER") ?: "root"; // Ton utilisateur
$password = getenv("PMA_PASSWORD") ?: "hbdBKLksPtwzoEqeupeFGMEoYwvXnnLT"; // Ton mot de passe
$port = getenv("PMA_PORT") ?: "3306"; // Vérifie le port

try {
    $pdo = new PDO("mysql:host=$host;port=$port;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Connexion réussie à MySQL !";
} catch (PDOException $e) {
    die("Erreur de connexion à MySQL : " . $e->getMessage());
}

?>
