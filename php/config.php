<?php
$host = getenv("MYSQLHOST") ?: "mysql.railway.internal";  // Remplace par ton host Railway
$dbname = getenv("MYSQLDATABASE") ?: "railway"; // Mets le nom correct
$username = getenv("MYSQLUSER") ?: "root"; // Ton utilisateur
$password = getenv("MYSQLPASSWORD") ?: "hbdBKLksPtwzoEqeupeFGMEoYwvXnnLT"; // Ton mot de passe
$port = getenv("MYSQLPORT") ?: "3306"; // Vérifie le port

try {
    $pdo = new PDO("mysql:host=$host;port=$port;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Erreur de connexion à MySQL : " . $e->getMessage());
}

?>
